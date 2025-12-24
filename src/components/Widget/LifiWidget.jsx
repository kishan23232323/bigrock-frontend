import { useMemo } from "react";
import { LiFiWidget } from "@lifi/widget";

const basicFeeConfig = {
    name: "Bigrock-Exchange",
    logoURI: "https://yourdapp.com/logo.png",
    fee: 0.005, // 0.5% fee
    showFeePercentage: true,
    showFeeTooltip: true
};

export default function LiFiWidgetComponent() {

    const widgetConfig = useMemo(() => ({
        variant: "compact",
        appearance: "dark",

        theme: { container: { border: "1px solid #EAEAEA", borderRadius: "16px", padding: "10px", }, },

        fromChain: 56,
        toChain: 56,

        fromToken: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
        toToken: "0x55d398326f99059fF775485246999027B3197955",

        feeConfig: basicFeeConfig,

    }), []);

    return (
        <>
            <LiFiWidget
                integrator="Bigrock-Exchange"
                config={widgetConfig}
            />
        </>
    );
}
