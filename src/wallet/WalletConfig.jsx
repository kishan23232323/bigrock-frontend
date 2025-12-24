import '@rainbow-me/rainbowkit/styles.css';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    sepolia,
    bsc
} from 'wagmi/chains';
import {
    QueryClientProvider,
    QueryClient,
} from "@tanstack/react-query";
import { getDefaultConfig } from '@rainbow-me/rainbowkit';

import { useAvailableChains } from '@lifi/widget';
import { useSyncWagmiConfig } from '@lifi/wallet-management';

const config = getDefaultConfig({
    appName: 'BigRock Exchange',
    projectId: '9f028ef985d9cf1bacdfea0f961c9a85',
    chains: [mainnet, polygon, optimism, arbitrum, base, sepolia, bsc],
    ssr: false,
});

const queryClient = new QueryClient();

/* 🔑 Inner component where hooks are SAFE */
const WalletInner = ({ children }) => {
    const { chains } = useAvailableChains();
    useSyncWagmiConfig(config, [], chains);

    return (
        <WagmiProvider config={config}>
            <RainbowKitProvider>
                {children}
            </RainbowKitProvider>
        </WagmiProvider>
    );
};

const WalletConfig = ({ children }) => {
    return (
        <QueryClientProvider client={queryClient}>
            <WalletInner>
                {children}
            </WalletInner>
        </QueryClientProvider>
    );
};

export default WalletConfig;
