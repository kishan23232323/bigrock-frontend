import '@rainbow-me/rainbowkit/styles.css'
import { RainbowKitProvider, getDefaultConfig } from '@rainbow-me/rainbowkit'
import { WagmiProvider } from 'wagmi'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

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
  projectId: '9f028ef985d9cf1bacdfea0f961c9a85',
  chains: [mainnet, polygon, optimism, arbitrum, base, sepolia, bsc],
  ssr: false,
})

const queryClient = new QueryClient()

export default function WalletConfig({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={config}>
        <RainbowKitProvider modalSize="compact">
          {children}
        </RainbowKitProvider>
      </WagmiProvider>
    </QueryClientProvider>
  )
}
