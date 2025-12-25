import { useMemo, useEffect } from "react";
import { LiFiWidget } from "@lifi/widget";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

const basicFeeConfig = {
    name: "Bigrock-Exchange",
    logoURI: "https://yourdapp.com/logo.png",
    fee: 0.005,
    showFeePercentage: true,
    showFeeTooltip: true
};

export default function LiFiWidgetComponent() {
    const { openConnectModal } = useConnectModal();
    const { isConnected } = useAccount();

    // Debug logging
    useEffect(() => {
        console.log("Modal available:", !!openConnectModal);
        console.log("Is connected:", isConnected);
    }, [openConnectModal, isConnected]);

    const widgetConfig = useMemo(() => ({
        variant: "compact",
        appearance: "dark",

        theme: {
            container: {
                border: "1px solid #EAEAEA",
                borderRadius: "16px",
                padding: "10px",
            },
        },

        fromChain: 56,
        toChain: 56,

        fromToken: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
        toToken: "0x55d398326f99059fF775485246999027B3197955",

        feeConfig: basicFeeConfig,

        walletConfig: {
            onConnect: () => {
                console.log("LiFi onConnect called");
                if (openConnectModal) {
                    setTimeout(() => {
                        openConnectModal();
                    }, 0);
                }
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