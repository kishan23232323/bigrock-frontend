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
  projectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID,
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
