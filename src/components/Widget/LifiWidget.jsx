import { useMemo } from "react";
import { LiFiWidget } from "@lifi/widget";

const basicFeeConfig = {
  name: "Bigrock-Exchange",
  logoURI: "https://yourdapp.com/logo.png",
  fee: 0.005,
  showFeePercentage: true,
  showFeeTooltip: true,
};

export default function LiFiWidgetComponent() {
  const widgetConfig = useMemo(() => ({
    variant: "compact",
    appearance: "dark",

    fromChain: 56,
    toChain: 56,

    feeConfig: basicFeeConfig,

    walletConfig: {
      forceWalletConnect: true,
    },
  }), []);

  return (
    <LiFiWidget
      integrator="Bigrock-Exchange"
      config={widgetConfig}
    />
  );
}
