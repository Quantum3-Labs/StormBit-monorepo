"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { formatEther, parseEther } from "viem";
import { PublicClient, useAccount } from "wagmi";
import { GetAccountResult } from "wagmi/dist/actions";
import { FaucetButton, RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

type HeaderMenuLink = {
  label: string;
  href: string;
};

export const menuLinks: HeaderMenuLink[] = [
  {
    label: "Pools",
    href: "/pools",
  },
  {
    label: "Portfolio",
    href: "/portfolio",
  },
];

export const HeaderMenuLinks = () => {
  const pathname = usePathname();

  return (
    <>
      {menuLinks.map(({ label, href }) => {
        const isActive = pathname === href;
        return (
          <li key={href}>
            <Link href={href} passHref className={`${isActive ? "bg-letter" : "text-[#ffffff]"} `}>
              <span>{label}</span>
            </Link>
          </li>
        );
      })}
    </>
  );
};

/**
 * Site header
 */
export const Header = () => {
  const account = useAccount();

  const { writeAsync: mintDAI } = useScaffoldContractWrite({
    contractName: "tDAI",
    functionName: "mint",
    args: [account.address, parseEther("1000")],
  });

  const { writeAsync: mintETH } = useScaffoldContractWrite({
    contractName: "tETH",
    functionName: "mint",
    args: [account.address, parseEther("1000")],
  });

  const { writeAsync: mintBTC } = useScaffoldContractWrite({
    contractName: "tBTC",
    functionName: "mint",
    args: [account.address, parseEther("1000")],
  });

  // const balanceDai = balanceDAI !== undefined ? formatEther(balanceDAI) : "Cargando...";
  // const balanceBtc = balanceBTC !== undefined ? formatEther(balanceBTC) : "Cargando...";
  // const balanceEth = balanceETH !== undefined ? formatEther(balanceETH) : "Cargando...";

  const getFormattedBalance = (contractName: string, account: GetAccountResult<PublicClient>) => {
    const { data: balanceData } = useScaffoldContractRead({
      contractName,
      functionName: "balanceOf",
      args: [account.address],
      watch: true,
    });
    return balanceData !== undefined ? formatEther(balanceData) : "0";
  };

  const balanceDai = getFormattedBalance("tDAI", account);
  const balanceBtc = getFormattedBalance("tBTC", account);
  const balanceEth = getFormattedBalance("tETH", account);

  // console.log(balanceDai,balanceBtc,balanceEth)

  return (
    <>
      <div className="sticky top-0 z-20 justify-between flex-shrink-0 min-h-0 p-6 text-white bg-transparent shadow-md lg:static navbar sm:px-2">
        <div className="flex gap-3">
          <Link href="/" passHref className="items-center hidden gap-2 ml-4 mr-6 lg:flex shrink-0">
            <div>
              <Image src="/logo.png" alt="logo" width={142} height={65} className="w-auto h-auto" priority></Image>
            </div>
          </Link>
          <ul className="hidden gap-8 px-1 text-xl lg:flex lg:flex-nowrap">
            <HeaderMenuLinks />
          </ul>
        </div>
        <div className="flex-grow gap-8 mr-4 navbar-end">
          <div className="flex gap-[10px] ">
            <div className="flex gap-[20px]">
              <div className="flex flex-col items-center gap-[6px]">
                <button
                  className="border min-w-[90px] w-full rounded-xl px-2"
                  onClick={() => {
                    mintDAI();
                  }}
                >
                  Mint DAI
                </button>
                <span>Balance DAI: {balanceDai} </span>
              </div>
              <div className="flex flex-col items-center gap-[6px]">
                <button
                  className="border min-w-[90px] w-full rounded-xl px-2"
                  onClick={() => {
                    mintETH();
                  }}
                >
                  Mint ETH
                </button>
                <span>Balance ETH: {balanceEth}</span>
              </div>
              <div className="flex flex-col items-center gap-[6px]">
                <button
                  className="border min-w-[90px] w-full rounded-xl px-2"
                  onClick={() => {
                    mintBTC();
                  }}
                >
                  Mint BTC
                </button>
                <span>Balance BTC: {balanceBtc}</span>
              </div>
            </div>
          </div>
          <Link href="/register" className="border w-[150px] rounded-xl px-2">
            Launch App
          </Link>
          <RainbowKitCustomConnectButton />
          <FaucetButton />
        </div>
      </div>
    </>
  );
};
