import React, { createContext, useContext, useState } from "react";
import { useAccount, usePublicClient, useWriteContract } from "wagmi";
import { toast } from 'react-toastify';

// 👉 Replace with your contract config
import {
    airdropABI,
    airdropContractAddress,
} from "../lib/ContractConfig.jsx";
import { markReferralClaimed, markWalletClaimed } from "../src/services/Airdrops/airdropsapi.js";

/* --------------------------------------------------
   Context Setup
-------------------------------------------------- */
const Web3Context = createContext(null);
export const useWeb3 = () => useContext(Web3Context);

/* --------------------------------------------------
   Provider
-------------------------------------------------- */
export function Web3Provider({ children }) {
    const { address, isConnected } = useAccount();
    const publicClient = usePublicClient();
    const { writeContractAsync } = useWriteContract();

    /* ---------------- Notifications ---------------- */
    const [notifications, setNotifications] = useState([]);

    const notify = (msg) => {
        setNotifications((prev) => [
            ...prev,
            { id: Date.now(), msg },
        ]);
    };

    /* --------------------------------------------------
       CONTRACT FUNCTIONS
    -------------------------------------------------- */

    // 1️⃣ Withdraw referral rewards
    const withdrawReferReward = async ({ address, token }) => {
        try {
            if (!isConnected) {
                toast.error("⚠ Please connect wallet");
                return { success: false };
            }

            toast.success("⏳ Withdrawing referral reward...");

            const hash = await writeContractAsync({
                address: airdropContractAddress,
                abi: airdropABI,
                functionName: "withdrawReferReward",
                args: [],
            });

            await publicClient.waitForTransactionReceipt({ hash });

            toast.success("✅ Referral reward withdrawn successfully");
            await markReferralClaimed({ token });

            return { success: true, hash };

        } catch (err) {
            const msg = err.shortMessage || err.message || "Transaction failed";
            toast.error(`❌ ${msg}`);
            return { success: false };
        }
    };

    // 2️⃣ Withdraw wallet rewards
    const withdrawWalletReward = async ({ address, token }) => {
        try {
            if (!isConnected) {
                toast.error("⚠ Please connect wallet");
                return { success: false };
            }

            toast.success("⏳ Withdrawing wallet reward...");
            const hash = await writeContractAsync({
                address: airdropContractAddress,
                abi: airdropABI,
                functionName: "withdrawWalletReward",
                args: [],
            });

            await publicClient.waitForTransactionReceipt({ hash });
            toast.success("✅ Wallet reward withdrawn successfully");
            await markWalletClaimed({ address, token });
            return { success: true, hash };

        } catch (err) {
            const msg = err.shortMessage || err.message || "Transaction failed";
            toast.error(`❌ ${msg}`);
            return { success: false };
        }
    };

    /* --------------------------------------------------
       Provider Value
    -------------------------------------------------- */
    return (
        <>
            <Web3Context.Provider
                value={{
                    address,
                    isConnected,
                    withdrawReferReward,
                    withdrawWalletReward,
                    notify,
                }}
            >
                {children}
            </Web3Context.Provider>

            {/* Toasts */}
            {notifications.map((t) => (
                <Toast
                    key={t.id}
                    message={t.msg}
                    onClose={() =>
                        setNotifications((prev) =>
                            prev.filter((x) => x.id !== t.id)
                        )
                    }
                />
            ))}
        </>
    );
}
