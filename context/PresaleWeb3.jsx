import React, { createContext, useContext } from "react";
import { useAccount, usePublicClient, useWriteContract } from "wagmi";
import { toast } from "react-toastify";

import {
  presaleABI,
  presaleContractAddress,
  usdtABI,
  usdtContractAddress,
} from "../lib/ContractConfig.jsx";
import { formatUnits } from "viem";

/* --------------------------------------------------
   Context Setup
-------------------------------------------------- */
const PresaleWeb3Context = createContext(null);
export const usePresaleWeb3 = () => useContext(PresaleWeb3Context);

/* --------------------------------------------------
   Provider
-------------------------------------------------- */
export function PresaleWeb3Provider({ children }) {
  const { address, isConnected } = useAccount();
  const publicClient = usePublicClient();
  const { writeContractAsync } = useWriteContract();

  /* ================= READ FUNCTIONS ================= */

  const getPresaleStats = async () => {
  try {
    const [
      lotPrice,
      totalSold,
      paused,
      tokenPrice,
      tokensPerLot,
      launchTimestamp,
      claimEnableTime,
    ] 
    = await publicClient.readContract({
      address: presaleContractAddress,
      abi: presaleABI,
      functionName: "getPresaleStats",
    });

    return {
      lotPrice,
      totalSold,
      paused,
      tokenPrice,
      tokensPerLot,
      launchTimestamp,
      claimEnableTime,
    };
  } catch (err) {
    console.error("getPresaleStats failed", err);
    return null;
    }
};


  const getUserPresaleInfo = async (user) => {
  try {
    if (!user) return null;

    const [
      lotsBought,
      totalTokens,
      claimedTokens,
      claimable,
    ] = await publicClient.readContract({
      address: presaleContractAddress,
      abi: presaleABI,
      functionName: "getUserPresaleInfo",
      args: [user],
    });

    return {
      lotsBought,
      totalTokens,
      claimedTokens,
      claimable,
    };
  } catch (err) {
    console.error("getUserPresaleInfo failed", err);
    return null;
  }
};


  /* ================= WRITE FUNCTIONS ================= */

  const buyLots = async ({ lots }) => {
    try {
      if (!isConnected) {
        toast.error("⚠ Please connect wallet");
        return { success: false };
      }

      const stats = await getPresaleStats();
      if (!stats || stats.paused) {
        toast.error("⚠ Presale is paused or stats unavailable");
        return { success: false };
      }

      if (lots <= 0) {
        toast.error("⚠ Please enter a valid number of lots");
        return { success: false };
      }

      // 1. Calculate Total USDT in Base Units (Wei)
      // stats.lotPrice is already a BigInt from the contract (e.g., 111400000000000000000)
      const totalUsdtNeeded = BigInt(lots) * BigInt(stats.lotPrice);

      // 2. Check Allowance (Owner, Spender)
      const allowance = await publicClient.readContract({
        address: usdtContractAddress,
        abi: usdtABI,
        functionName: "allowance",
        args: [address, presaleContractAddress], 
      });

      // 3. Handle Approval if necessary
      if (allowance < totalUsdtNeeded) {
        toast.info("⏳ Please approve USDT usage in your wallet...");
        
        const approveHash = await writeContractAsync({
          address: usdtContractAddress,
          abi: usdtABI,
          functionName: "approve",
          args: [presaleContractAddress, totalUsdtNeeded],
        });

        toast.info("⏳ Waiting for approval confirmation...");
        await publicClient.waitForTransactionReceipt({ hash: approveHash });
        toast.success("✅ USDT Approved!");
      }

      // 4. Execute Purchase
      toast.info("⏳ Confirming purchase transaction...");

      const hash = await writeContractAsync({
        address: presaleContractAddress,
        abi: presaleABI,
        functionName: "buyLots",
        args: [BigInt(lots)],
      });

      await publicClient.waitForTransactionReceipt({ hash });

      toast.success("✅ Lots purchased successfully!");
      return { success: true, hash };

    } catch (err) {
      console.error("Purchase error:", err);
      const msg = err.shortMessage || err.message || "Transaction failed";
      toast.error(`❌ ${msg}`);
      return { success: false };
    }
  };

const claimTokens = async () => {
    try {
      if (!isConnected) {
        toast.error("⚠ Please connect wallet");
        return { success: false };
      }

      // 1. Pre-validation Check
      // We fetch current user info to see if they actually have claimable tokens
      const user = await getUserPresaleInfo(address);
      const stats = await getPresaleStats();
      
      const currentTime = Math.floor(Date.now() / 1000);

      // Check if claiming is enabled in the contract
      if (stats && Number(stats.claimEnableTime) === 0 || currentTime < Number(stats.claimEnableTime)) {
        toast.error("⏳ Claiming is not yet enabled");
        return { success: false };
      }

      // Check if user has anything to claim
      if (!user || BigInt(user.claimable) === BigInt(0)) {
        toast.error("❌ You have no tokens available to claim");
        return { success: false };
      }

      toast.info("⏳ Confirming claim transaction...");

      const hash = await writeContractAsync({
        address: presaleContractAddress,
        abi: presaleABI,
        functionName: "claimTokens",
        args: [],
      });

      toast.info("⏳ Waiting for transaction confirmation...");
      await publicClient.waitForTransactionReceipt({ hash });

      toast.success("✅ Tokens claimed successfully!");
      return { success: true, hash };
    } catch (err) {
      console.error("Claim error:", err);
      const msg = err.shortMessage || err.message || "Transaction failed";
      toast.error(`❌ ${msg}`);
      return { success: false };
    }
  };

  /* --------------------------------------------------
     Provider Value
  -------------------------------------------------- */
  return (
    <PresaleWeb3Context.Provider
      value={{
        address,
        isConnected,
        getPresaleStats,
        getUserPresaleInfo,
        buyLots,
        claimTokens,
      }}
    >
      {children}
    </PresaleWeb3Context.Provider>
  );
}
