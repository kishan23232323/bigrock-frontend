import '@rainbow-me/rainbowkit/styles.css'
import { RainbowKitProvider, connectorsForWallets } from '@rainbow-me/rainbowkit'
import { WagmiProvider, createConfig, http } from 'wagmi'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

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

import {
    metaMaskWallet,
    trustWallet,
    walletConnectWallet,
    rainbowWallet,
} from '@rainbow-me/rainbowkit/wallets'

// Configure connectors with mobile support
const connectors = connectorsForWallets(
    [
        {
            groupName: 'Popular',
            wallets: [
                metaMaskWallet,
                trustWallet,
                walletConnectWallet,
                rainbowWallet,
            ],
        },
    ],
    {
        appName: 'BigRock Exchange',
        projectId: '9f028ef985d9cf1bacdfea0f961c9a85',
    }
)

// Create config with explicit transports
const config = createConfig({
    connectors,
    chains: [mainnet, polygon, optimism, arbitrum, base, sepolia, bsc],
    transports: {
        [mainnet.id]: http(),
        [polygon.id]: http(),
        [optimism.id]: http(),
        [arbitrum.id]: http(),
        [base.id]: http(),
        [sepolia.id]: http(),
        [bsc.id]: http(),
    },
    ssr: false,
})

const queryClient = new QueryClient()

const WalletInner = ({ children }) => {
    const { chains } = useAvailableChains()
    useSyncWagmiConfig(config, [], chains)

    return (
        <WagmiProvider config={config}>
            <RainbowKitProvider
                modalSize="compact"
                showRecentTransactions={true}
            >
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