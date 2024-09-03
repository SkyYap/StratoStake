import { http, cookieStorage, createConfig, createStorage } from 'wagmi'
import { mainnet, sepolia, rootstockTestnet, hederaTestnet, morphSepolia } from 'wagmi/chains'
import { coinbaseWallet, injected } from 'wagmi/connectors'
import Web3AuthConnectorInstance from "./Web3AuthConnectorInstance";

export function getConfig() {
  return createConfig({
    chains: [mainnet, sepolia, rootstockTestnet, hederaTestnet, morphSepolia],
    connectors: [
      injected(),
      coinbaseWallet(),
      // Web3AuthConnectorInstance([mainnet, sepolia, rootstockTestnet, hederaTestnet, morphSepolia]),
    ],
    storage: createStorage({
      storage: cookieStorage,
    }),
    ssr: true,
    transports: {
      [mainnet.id]: http(),
      [sepolia.id]: http(),
      [rootstockTestnet.id]: http(),
      [hederaTestnet.id]: http(),
      [morphSepolia.id]: http(),
    },
  })
}

declare module 'wagmi' {
  interface Register {
    config: ReturnType<typeof getConfig>
  }
}
