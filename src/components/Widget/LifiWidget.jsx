import { useMemo } from "react";
import { LiFiWidget } from "@lifi/widget";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

const basicFeeConfig = {
    name: "Bigrock-Exchange",
    logoURI: "https://yourdapp.com/logo.png",
    fee: 0.005, // 0.5% fee
    showFeePercentage: true,
    showFeeTooltip: true
};

export default function LiFiWidgetComponent() {

    const { openConnectModal } = useConnectModal();
    const { isConnected } = useAccount();
     const isMobile = /Android|iPhone/i.test(navigator.userAgent);

    const widgetConfig = useMemo(() => ({
        variant: "compact",
        appearance: "dark",

        theme: { container: { border: "1px solid #EAEAEA", borderRadius: "16px", padding: "10px", }, },

        fromChain: 56,
        toChain: 56,

        fromToken: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
        toToken: "0x55d398326f99059fF775485246999027B3197955",

        feeConfig: basicFeeConfig,
        walletConfig: {
            async onConnect() {
                // Add error handling and async support
                try {
                    if (openConnectModal && !isConnected) {
                        // Small delay can help with mobile rendering
                        await new Promise(resolve => setTimeout(resolve, 100));
                        openConnectModal();
                    }
                } catch (error) {
                    console.error("Failed to open connect modal:", error);
                }
            },
            forceWalletConnect: true,
            usePartialWalletManagement: true,
            walletConnect:{
                projectId: '9f028ef985d9cf1bacdfea0f961c9a85',
            }
        },
         sdkConfig: {
            executionOptions: {
            disableMessageSigning: true,
            },
            bridgeAndSwap: {
                autoApproveDelay: 800,
            },
        },

    }), [openConnectModal]);

    return (
        <>
         {isMobile && (
        <div className="mb-3 rounded-md bg-yellow-900/30 p-3 text-sm text-yellow-200">
          If you don’t see the confirmation request, please reopen your wallet app.
        </div>
      )}
            <LiFiWidget
                integrator="Bigrock-Exchange"
                config={widgetConfig}
            />
        </>
    );
}