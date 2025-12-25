import { useEffect } from "react";
import { useWidgetEvents, WidgetEvent } from "@lifi/widget";

export function LiFiWidgetEventsListener() {
    const widgetEvents = useWidgetEvents();

    useEffect(() => {
        const onRouteCompleted = async (route) => {
            try {
                const step = route.steps?.[0];
                if (!step) return;

                const payload = {
                    routeId: route.id,
                    userAddress: route.fromAddress,

                    fromChain: step.action.fromChainId,
                    toChain: step.action.toChainId,

                    fromToken: step.action.fromToken.address,
                    toToken: step.action.toToken.address,

                    fromAmount: step.action.fromAmount,
                    toAmount: step.estimate?.toAmount,

                    fromAmountUSD: step.estimate?.fromAmountUSD,
                    toAmountUSD: step.estimate?.toAmountUSD,

                    txHash: step.execution?.process?.find(p => p.txHash)?.txHash || null,
                };

                // await fetch("/api/lifi/swap-complete", {
                //     method: "POST",
                //     headers: { "Content-Type": "application/json" },
                //     body: JSON.stringify(payload),
                // });
                console.log("LI.FI swap completed", payload);

            } catch (err) {
                console.error("LI.FI swap store failed", err);
            }
        };

        widgetEvents.on(
            WidgetEvent.RouteExecutionCompleted,
            onRouteCompleted
        );

        return () => widgetEvents.all.clear();
    }, [widgetEvents]);

    return null;
}