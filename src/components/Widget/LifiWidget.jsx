import { useMemo } from "react";
import { LiFiWidget } from "@lifi/widget";
import { AlertTriangle, Info } from "lucide-react";

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
                                 <AlertTriangle className="text-yellow-400 mt-0.5" size={18} />
                                <p className="text-sm md:text-base text-yellow-200 leading-relaxed">
                                If you don’t see the confirmation request, reopen your wallet app.
                                </p>
                            </div>

                            {/* Divider */}
                            <div className="h-px bg-yellow-500/20 my-2"></div>

                            {/* Row 2 */}
                            <div className="flex items-start gap-3">
                                 <Info className="text-yellow-300 mt-0.5" size={18} />
                                <p className="text-sm md:text-base text-yellow-300 leading-relaxed">
                                For the best Solana experience, open this page inside 
                                <span className="font-semibold text-yellow-200"> Phantom</span> or any Solana-Wallet browser.
                                </p>
                            </div>

                            </div>
            )}

            <LiFiWidget config={widgetConfig} />
        </div>
    );
}