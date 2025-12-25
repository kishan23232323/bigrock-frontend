import '@rainbow-me/rainbowkit/styles.css';
import {
    getDefaultConfig,
    RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    sepolia,
} from 'wagmi/chains';
import {
    QueryClientProvider,
    QueryClient,
} from '@tanstack/react-query';

import { useAvailableChains } from '@lifi/widget';
import { useSyncWagmiConfig } from '@lifi/wallet-management';

const config = getDefaultConfig({
    appName: 'BigRock Exchange',
    projectId: '6dd15a3684137adf8eb5ed126f061236',
    chains: [mainnet, polygon, optimism, arbitrum, base, sepolia],
    ssr: false, // ⚠️ MUST be false for LI.FI
});

const queryClient = new QueryClient();

const WalletInner = ({ children }) => {
    const { chains } = useAvailableChains();

    // 🔑 THIS is the ONLY addition for LI.FI
    useSyncWagmiConfig(config, [], chains);

    return (
        <WagmiProvider config={config}>
            <RainbowKitProvider>
                {children}
            </RainbowKitProvider>
        </WagmiProvider>
    );
};

export default function WalletConfig({ children }) {
    return (
        <QueryClientProvider client={queryClient}>
            <WalletInner>{children}</WalletInner>
        </QueryClientProvider>
    );
}
