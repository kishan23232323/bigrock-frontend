import '@rainbow-me/rainbowkit/styles.css';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import { useAvailableChains } from '@lifi/widget';
import { useSyncWagmiConfig } from '@lifi/wallet-management';
import { wagmiConfig } from './WagmiConfig';

const queryClient = new QueryClient();

const WalletInner = ({ children }) => {
    const { chains } = useAvailableChains();
    useSyncWagmiConfig(wagmiConfig, [], chains);

    return (
        <WagmiProvider config={wagmiConfig}>
            <RainbowKitProvider>
                {children}
            </RainbowKitProvider>
        </WagmiProvider>
    );
};

const WalletConfig = ({ children }) => (
    <QueryClientProvider client={queryClient}>
        <WalletInner>{children}</WalletInner>
    </QueryClientProvider>
);

export default WalletConfig;
