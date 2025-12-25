import { useMemo } from "react";
import { LiFiWidget } from "@lifi/widget";
import { useConnectModal } from "@rainbow-me/rainbowkit";

const basicFeeConfig = {
    name: "Bigrock-Exchange",
    logoURI: "https://yourdapp.com/logo.png",
    fee: 0.005,
    showFeePercentage: true,
    showFeeTooltip: true,
};

export default function LiFiWidgetComponent() {
    const { openConnectModal } = useConnectModal();

    const widgetConfig = useMemo(() => ({
        variant: "compact",
        appearance: "dark",

        fromChain: 56,
        toChain: 56,

        feeConfig: basicFeeConfig,

        // 🔑 EXACTLY like LI.FI GitHub
        walletConfig: {
            onConnect() {
                openConnectModal?.();
            },
        },
    }), [openConnectModal]);

    return (
        <LiFiWidget
            integrator="Bigrock-Exchange"
            config={widgetConfig}
        />
    );
}
