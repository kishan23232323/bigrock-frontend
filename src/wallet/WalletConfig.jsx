import '@rainbow-me/rainbowkit/styles.css'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { WagmiProvider } from 'wagmi'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { getDefaultConfig } from '@rainbow-me/rainbowkit'

import { useAvailableChains } from '@lifi/widget'
import { useSyncWagmiConfig } from '@lifi/wallet-management'

import {
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    sepolia,
    bsc,
} from 'wagmi/chains'

const config = getDefaultConfig({
    appName: 'BigRock Exchange',
    projectId: "9f028ef985d9cf1bacdfea0f961c9a85", // WalletConnect Project ID
    chains: [mainnet, polygon, optimism, arbitrum, base, sepolia, bsc],
    ssr: false,
})
const queryClient = new QueryClient()

const WalletInner = ({ children }) => {
    const { chains } = useAvailableChains()
    useSyncWagmiConfig(config, [], chains)

    return (
        <WagmiProvider config={config}>
            <RainbowKitProvider modalSize="compact">
                {children}
            </RainbowKitProvider>
        </WagmiProvider>
    )
}

export default function WalletConfig({ children }) {
    return (
        <QueryClientProvider client={queryClient}>
            <WalletInner>{children}</WalletInner>
        </QueryClientProvider>
    )
}