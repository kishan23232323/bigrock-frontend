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

        // // Optional default (BNB)
        // fromChain: 56,
        // toChain: 56,

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
                                            <div className="
                            mb-4 p-4 rounded-xl
                            bg-gradient-to-r from-yellow-900/40 to-yellow-800/20
                            border border-yellow-500/30
                            backdrop-blur-md
                            shadow-[0_0_20px_rgba(234,179,8,0.15)]
                            ">

                            {/* Row 1 */}
                            <div className="flex items-start gap-3 mb-2">
                                <span className="text-xl">⚠️</span>
                                <p className="text-sm md:text-base text-yellow-200 leading-relaxed">
                                If you don’t see the confirmation request, reopen your wallet app.
                                </p>
                            </div>

                            {/* Divider */}
                            <div className="h-px bg-yellow-500/20 my-2"></div>

                            {/* Row 2 */}
                            <div className="flex items-start gap-3">
                                <span className="text-xl">💡</span>
                                <p className="text-sm md:text-base text-yellow-300 leading-relaxed">
                                For the best experience, open this page inside 
                                <span className="font-semibold text-yellow-200"> Phantom</span> or any Solana-supported browser.
                                </p>
                            </div>

                            </div>
            )}

            <LiFiWidget config={widgetConfig} />
        </div>
    );
}