import { useEffect } from "react";
import { useWidgetEvents, WidgetEvent } from "@lifi/widget";
import { storeSwapTransaction } from "../../services/Swap/swapapi";

export function LiFiWidgetEventsListener() {
    const widgetEvents = useWidgetEvents();

    useEffect(() => {
        const handler = async (route) => {
            try {
                if (!route?.steps?.length) return;

                for (const step of route.steps) {
                    const processes = step.execution?.process ?? [];

                    for (const process of processes) {
                        if (
                            process.status === "DONE" &&
                            process.txHash
                        ) {
                            await storeSwapTransaction({
                                userAddress: route.fromAddress,
                                txHash: process.txHash,
                            });

                            console.log("✅ Swap stored:", process.txHash);
                        }
                    }
                }
            } catch (err) {
                console.error("❌ LI.FI swap store failed", err);
            }
        };

        widgetEvents.on(
            WidgetEvent.RouteExecutionUpdated,
            handler
        );

        return () => widgetEvents.all.clear();
    }, [widgetEvents]);

    return null;
}