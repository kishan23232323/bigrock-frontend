import { useWidgetEvents, WidgetEvent } from '@lifi/widget';
import { useEffect, useRef } from 'react';
import { kolApiTransaction, storeSwapTransaction } from '../../services/Swap/swapapi';

export const LifiWidgetEventListener = () => {
    const widgetEvents = useWidgetEvents();
    const processedTxs = useRef(new Set());

    useEffect(() => {

        const getExplorerLink = (txHash, chainId) => {
            const explorers = {
                1: "https://etherscan.io/tx/",
                10: "https://optimistic.etherscan.io/tx/",
                56: "https://bscscan.com/tx/",
                137: "https://polygonscan.com/tx/",
                42161: "https://arbiscan.io/tx/",
                43114: "https://snowtrace.io/tx/",
                8453: "https://basescan.org/tx/",
                501: "https://solscan.io/tx/",
            };

            return explorers[chainId]
                ? explorers[chainId] + txHash
                : null;
        };

        const getTxnDetails = (route) => {
            const steps = route?.steps || [];

            let txHash = null;
            let txLink = null;

            for (const step of steps) {
                const exec = step?.execution;

                if (exec?.txLink) txLink = exec.txLink;
                if (exec?.internalTxLink) txLink = exec.internalTxLink;
                if (exec?.txHash) txHash = exec.txHash;

                const processWithHash = exec?.process?.find(
                    (p) => p.txHash || p.txLink
                );

                if (processWithHash) {
                    txHash = processWithHash.txHash || txHash;
                    txLink = processWithHash.txLink || txLink;
                }

                if (txHash) break;
            }

            const amountUSD =
                route?.toAmountUSD ??
                route?.fromAmountUSD ??
                steps?.[0]?.estimate?.fromAmountUSD ??
                0;

            const fromToken =
                route?.fromToken?.symbol ||
                steps?.[0]?.action?.fromToken?.symbol ||
                "UNKNOWN";

            const toToken =
                route?.toToken?.symbol ||
                steps?.[0]?.action?.toToken?.symbol ||
                "UNKNOWN";

            return { txHash, txLink, amountUSD, fromToken, toToken };
        };

        const handleRoute = async (route) => {
            try {
                const { txHash, txLink, amountUSD, fromToken, toToken } =
                    getTxnDetails(route);

                if (!txHash) return;

                if (processedTxs.current.has(txHash)) return;
                processedTxs.current.add(txHash);

                const userAddress = route?.fromAddress;
                const chainId = route?.fromChainId;

                if (!userAddress) return;

                const finalTxLink =
                    txLink || getExplorerLink(txHash, chainId);

                await storeSwapTransaction({
                    userAddress,
                    txHash,
                    chainId,
                    txLink: finalTxLink,
                });

                await kolApiTransaction({
                    txHash,
                    amountUSD,
                    fromToken,
                    toToken,
                    userAddress,
                    chainId,
                    txLink: finalTxLink,
                });

            } catch (err) {
                console.error("Swap store failed:", err);
            }
        };

        const onCompleted = (route) => handleRoute(route);

        const onUpdated = (update) => {
            if (update?.status === "DONE" || update?.execution?.status === "DONE") {
                handleRoute(update);
            }
        };

        widgetEvents.on(WidgetEvent.RouteExecutionCompleted, onCompleted);
        widgetEvents.on(WidgetEvent.RouteExecutionUpdated, onUpdated);

        return () => {
            widgetEvents.off(WidgetEvent.RouteExecutionCompleted, onCompleted);
            widgetEvents.off(WidgetEvent.RouteExecutionUpdated, onUpdated);
        };

    }, [widgetEvents]);

    return null;
};