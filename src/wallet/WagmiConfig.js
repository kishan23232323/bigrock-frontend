// wallet/wagmiConfig.js
import { createConfig } from "wagmi";
import { walletConnect, injected } from "wagmi/connectors";
import {
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    sepolia,
    bsc,
} from "wagmi/chains";

export const wagmiConfig = createConfig({
    autoConnect: false,
    connectors: [
        walletConnect({
            projectId: "9f028ef985d9cf1bacdfea0f961c9a85", // your projectId
            showQrModal: true, // important for desktop; mobile deep-linking handled automatically
        }),
        injected({
            shimDisconnect: true,
        }),
    ],
    chains: [mainnet, polygon, optimism, arbitrum, base, sepolia, bsc],
});
