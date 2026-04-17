import { useMemo } from "react";
import { LiFiWidget } from "@lifi/widget";

const basicFeeConfig = {
    name: "Bigrock-Exchange",
    logoURI: "https://bigrock.exchange/logo.png",
    fee: 0.005,
    showFeePercentage: true,
};

export default function LiFiWidgetComponent() {

    const isMobile =
        typeof window !== "undefined" &&
        /Android|iPhone/i.test(navigator.userAgent);

    const widgetConfig = useMemo(() => ({
        integrator: "Bigrock-Exchange",
        variant: "compact",
        appearance: "dark",

        theme: {
            container: {
                border: "1px solid #EAEAEA",
                borderRadius: "16px",
            },
        },

        // Optional default (BNB)
        fromChain: 56,
        toChain: 56,

        feeConfig: basicFeeConfig,

        // 🔥 FINAL FIX
        walletConfig: {
            forceInternalWalletManagement: true, // ✅ IMPORTANT

            walletConnect: {
                projectId: "9f028ef985d9cf1bacdfea0f961c9a85",
            },

            // Optional (nice UX)
            coinbase: {
                appName: "Bigrock-Exchange",
            },
        },

        sdkConfig: {
            executionOptions: {
                disableMessageSigning: true,
            },
            solana: { core: {} },
        },

    }), []);

    return (
        <div className="mx-auto max-w-md p-4">
            {isMobile && (
                <div className="mb-3 rounded-md bg-yellow-900/30 p-3 text-center text-sm text-yellow-200">
                    If you don’t see the confirmation request, reopen your wallet app.
                </div>
            )}

            <LiFiWidget config={widgetConfig} />
        </div>
    );
}