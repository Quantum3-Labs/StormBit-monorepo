"use client";

import { useEffect } from "react";
import { Space_Grotesk } from "@next/font/google";
import { NextUIProvider } from "@nextui-org/react";
import { RainbowKitProvider} from "@rainbow-me/rainbowkit";
import { Toaster } from "react-hot-toast";
import { WagmiConfig } from "wagmi";
import { Footer } from "~~/components/Footer";
import { Header } from "~~/components/Header";
import { BlockieAvatar } from "~~/components/scaffold-eth";
import { ProgressBar } from "~~/components/scaffold-eth/ProgressBar";
import { useNativeCurrencyPrice } from "~~/hooks/scaffold-eth";
import { useGlobalState } from "~~/services/store/store";
import { wagmiConfig } from "~~/services/web3/wagmiConfig";
import { appChains } from "~~/services/web3/wagmiConnectors";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
});

const ScaffoldEthApp = ({ children }: { children: React.ReactNode }) => {
  const price = useNativeCurrencyPrice();
  const setNativeCurrencyPrice = useGlobalState(state => state.setNativeCurrencyPrice);

  useEffect(() => {
    if (price > 0) {
      setNativeCurrencyPrice(price);
    }
  }, [setNativeCurrencyPrice, price]);

  return (
    <>
      <div className="flex flex-col bg-landing">
        <Header />
        <main className={`flex flex-col items-center h-screen flex-1 ${spaceGrotesk.className}`}>{children}</main>
        <Footer />
      </div>
      <Toaster />
    </>
  );
};

export const ScaffoldEthAppWithProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <NextUIProvider>
      <WagmiConfig config={wagmiConfig}>
        <ProgressBar />
        <RainbowKitProvider chains={appChains.chains} avatar={BlockieAvatar}>
          <ScaffoldEthApp>{children}</ScaffoldEthApp>
        </RainbowKitProvider>
      </WagmiConfig>
    </NextUIProvider>
  );
};
