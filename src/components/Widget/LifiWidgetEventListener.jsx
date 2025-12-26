import { useWidgetEvents, WidgetEvent } from '@lifi/widget';
import { useEffect } from 'react';
import { storeSwapTransaction } from '../../services/Swap/swapapi';
import { useAccount } from 'wagmi';

export const LifiWidgetEventListener = () => {
    const widgetEvents = useWidgetEvents();

    const { address } = useAccount();

    useEffect(() => {

        const onRouteExecutionCompleted = async (route) => {
            try {
                const internalTxnHash = route.steps?.[0]?.execution?.internalTxLink

                console.log('onRouteExecution_Completed fired.', route);
                console.log('internalTxnHash:', internalTxnHash);
                await storeSwapTransaction({
                    userAddress: address,
                    internalTxnHash,
                });
            }
            catch (err) {
                console.error('Failed to store swap:', err);
            }
        };


        widgetEvents.on(WidgetEvent.RouteExecutionCompleted, onRouteExecutionCompleted);


        return () => {
            widgetEvents.all.clear();
        };
    }, [widgetEvents]);

    return null;
};
