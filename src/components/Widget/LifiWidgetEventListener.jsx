import { useWidgetEvents, WidgetEvent } from '@lifi/widget';
import { useEffect } from 'react';
import { kolApiTransaction, storeSwapTransaction } from '../../services/Swap/swapapi';
import { useAccount } from 'wagmi';
import { getStoredReferral } from './referal';

export const LifiWidgetEventListener = () => {
    const widgetEvents = useWidgetEvents();

    const { address } = useAccount();

    useEffect(() => {

        const onRouteExecutionCompleted = async (route) => {
            try {
                const step = route?.steps?.[0];

                const internalTxnHash = step?.execution?.internalTxLink;
                const amountUSD =
                route?.fromAmountUSD ??
                step?.estimate?.fromAmountUSD ??
                route?.toAmountUSD ??
                0;

                const fromToken =
                route?.fromToken?.symbol ||
                step?.action?.fromToken?.symbol ||
                "UNKNOWN";

                const toToken =
                route?.toToken?.symbol ||
                step?.action?.toToken?.symbol ||
                "UNKNOWN";

                    // const referral = getStoredReferral();

                    // console.log('KOL Referral:', referral);

                console.log('onRouteExecution_Completed fired.', route);
                console.log('internalTxnHash:', internalTxnHash);
                console.log('amountUSD:', amountUSD);
                console.log('fromToken:', fromToken);
                console.log('toToken:', toToken);
                await storeSwapTransaction({
                    userAddress: address,
                    internalTxnHash,
                });
                
                await kolApiTransaction({
                    txHash: internalTxnHash,
                    amountUSD,
                    fromToken,
                    toToken,
                    userAddress: address
                })
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
