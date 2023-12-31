import { polygonMumbai } from "@wagmi/core/chains";
import { FC, ReactNode } from "react";
import { createPublicClient, http } from "viem";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { alchemyProvider } from "wagmi/providers/alchemy";

import { publicProvider } from "wagmi/providers/public";
const { chains, webSocketPublicClient } = configureChains(
  [polygonMumbai],
  [
    alchemyProvider({ apiKey: import.meta.env.VITE_ALCHEMY_API_KEY }),
    publicProvider(),
  ],
);

const config = createConfig({
  autoConnect: false,
  publicClient: createPublicClient({
    chain: polygonMumbai,
    transport: http(),
  }),
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: "wagmi",
      },
    }),

    new WalletConnectConnector({
      chains,
      options: {
        projectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID,
      },
    }),

    new InjectedConnector({
      chains,
      options: {
        name: "Injected",
        shimDisconnect: true,
      },
    }),
  ],

  webSocketPublicClient,
});

interface WagmiProviderProps {
  children: ReactNode;
}

export const WagmiProvider: FC<WagmiProviderProps> = ({ children }) => {
  return <WagmiConfig config={config}>{children}</WagmiConfig>;
};
