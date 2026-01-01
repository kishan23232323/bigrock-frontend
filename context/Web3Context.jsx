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

    // Admin functions 
    const setWalletRewardAmount = async ({ amount }) => {
        try {
            if (!isConnected) {
                toast.error("⚠ Please connect wallet");
                return { success: false };
            }

            toast.success("⏳ Setting wallet reward amount...");

            const hash = await writeContractAsync({
                address: airdropContractAddress,
                abi: airdropABI,
                functionName: "setWalletRewardAmount",
                args: [amount], // uint256 amount
            });

            await publicClient.waitForTransactionReceipt({ hash });

            toast.success("✅ Wallet reward amount set successfully");
            return { success: true, hash };

        } catch (err) {
            const msg = err.shortMessage || err.message || "Transaction failed";
            toast.error(`❌ ${msg}`);
            return { success: false };
        }
    };


    const pauseContract = async () => {
        try {
            toast.success("⏳ Pausing contract...");

            const hash = await writeContractAsync({
                address: airdropContractAddress,
                abi: airdropABI,
                functionName: "pause",
                args: [],
            });

            await publicClient.waitForTransactionReceipt({ hash });
            toast.success("⛔ Contract paused");
            return { success: true, hash };
        } catch (err) {
            const msg = err.shortMessage || err.message || "Transaction failed";
            toast.error(`❌ ${msg}`);
            return { success: false };
        }
    };

    const unpauseContract = async () => {
        try {
            toast.success("⏳ Unpausing contract...");

            const hash = await writeContractAsync({
                address: airdropContractAddress,
                abi: airdropABI,
                functionName: "unpause",
                args: [],
            });

            await publicClient.waitForTransactionReceipt({ hash });
            toast.success("✅ Contract unpaused");
            return { success: true, hash };
        } catch (err) {
            const msg = err.shortMessage || err.message || "Transaction failed";
            toast.error(`❌ ${msg}`);
            return { success: false };
        }
    };


    const setSubscriptionParams = async ({ fee, duration }) => {
        try {
            if (!fee || !duration) {
                toast.error("⚠ Fee and duration required");
                return { success: false };
            }

            toast.success("⏳ Setting subscription parameters...");

            const hash = await writeContractAsync({
                address: airdropContractAddress,
                abi: airdropABI,
                functionName: "setSubscriptionParams",
                args: [fee, duration],
            });

            await publicClient.waitForTransactionReceipt({ hash });
            toast.success("✅ Subscription parameters updated");
            return { success: true, hash };

        } catch (err) {
            const msg = err.shortMessage || err.message || "Transaction failed";
            toast.error(`❌ ${msg}`);
            return { success: false };
        }
    };


    const setSingleReferAllocation = async ({ user, amount }) => {
        try {
            toast.success("⏳ Allocating refer reward...");

            const hash = await writeContractAsync({
                address: airdropContractAddress,
                abi: airdropABI,
                functionName: "setReferRewardAllocation",
                args: [user, amount],
            });

            await publicClient.waitForTransactionReceipt({ hash });
            toast.success("✅ Refer reward allocated");
            return { success: true, hash };

        } catch (err) {
            const msg = err.shortMessage || err.message || "Transaction failed";
            toast.error(`❌ ${msg}`);
            return { success: false };
        }
    };

    const setSingleSwapAllocation = async ({ user, amount }) => {
        try {
            toast.success("⏳ Allocating swap reward...");

            const hash = await writeContractAsync({
                address: airdropContractAddress,
                abi: airdropABI,
                functionName: "setSwapRewardAllocation",
                args: [user, amount],
            });

            await publicClient.waitForTransactionReceipt({ hash });
            toast.success("✅ Swap reward allocated");
            return { success: true, hash };

        } catch (err) {
            const msg = err.shortMessage || err.message || "Transaction failed";
            toast.error(`❌ ${msg}`);
            return { success: false };
        }
    };

    const setBatchReferAllocation = async ({ users, amounts }) => {
        try {
            toast.success("⏳ Executing refer batch allocation...");

            const hash = await writeContractAsync({
                address: airdropContractAddress,
                abi: airdropABI,
                functionName: "setReferRewardAllocationBatch",
                args: [users, amounts],
            });

            await publicClient.waitForTransactionReceipt({ hash });
            toast.success("✅ Refer batch allocation completed");
            return { success: true, hash };

        } catch (err) {
            const msg = err.shortMessage || err.message || "Transaction failed";
            toast.error(`❌ ${msg}`);
            return { success: false };
        }
    };

    const setBatchSwapAllocation = async ({ users, amounts }) => {
        try {
            toast.success("⏳ Executing swap batch allocation...");

            const hash = await writeContractAsync({
                address: airdropContractAddress,
                abi: airdropABI,
                functionName: "setSwapRewardAllocationBatch",
                args: [users, amounts],
            });

            await publicClient.waitForTransactionReceipt({ hash });
            toast.success("✅ Swap batch allocation completed");
            return { success: true, hash };

        } catch (err) {
            const msg = err.shortMessage || err.message || "Transaction failed";
            toast.error(`❌ ${msg}`);
            return { success: false };
        }
    };

    const setWalletEligibleSingle = async ({ user, status }) => {
        try {
            toast.success("⏳ Updating wallet eligibility...");

            const hash = await writeContractAsync({
                address: airdropContractAddress,
                abi: airdropABI,
                functionName: "setWalletEligible",
                args: [user, status],
            });

            await publicClient.waitForTransactionReceipt({ hash });
            toast.success("✅ Wallet eligibility updated");
            return { success: true, hash };

        } catch (err) {
            const msg = err.shortMessage || err.message || "Transaction failed";
            toast.error(`❌ ${msg}`);
            return { success: false };
        }
    };

    const setWalletEligibleBatch = async ({ users, statuses }) => {
        try {
            toast.success("⏳ Updating wallet eligibility (batch)...");

            const hash = await writeContractAsync({
                address: airdropContractAddress,
                abi: airdropABI,
                functionName: "setWalletEligibleBatch",
                args: [users, statuses],
            });

            await publicClient.waitForTransactionReceipt({ hash });
            toast.success("✅ Wallet eligibility batch updated");
            return { success: true, hash };

        } catch (err) {
            const msg = err.shortMessage || err.message || "Transaction failed";
            toast.error(`❌ ${msg}`);
            return { success: false };
        }
    };


    const emergencyWithdraw = async ({ to }) => {
        try {
            if (!to) {
                toast.error("⚠ Destination address required");
                return { success: false };
            }

            toast.success("⏳ Executing emergency withdraw...");

            const hash = await writeContractAsync({
                address: airdropContractAddress,
                abi: airdropABI,
                functionName: "emergencyWithdraw",
                args: [to],
            });

            await publicClient.waitForTransactionReceipt({ hash });
            toast.success("🚨 Emergency withdraw completed");
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
                    setWalletRewardAmount,
                    pauseContract,
                    unpauseContract,
                    setSubscriptionParams,
                    setSingleReferAllocation,
                    setSingleSwapAllocation,
                    setBatchReferAllocation,
                    setBatchSwapAllocation,
                    setWalletEligibleSingle,
                    setWalletEligibleBatch,
                    emergencyWithdraw,
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
