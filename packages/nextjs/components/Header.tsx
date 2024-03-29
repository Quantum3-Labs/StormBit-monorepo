import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CiDesktopMouse1, CiWallet } from "react-icons/ci";
import { LiaDotCircleSolid } from "react-icons/lia";
import { TfiBook } from "react-icons/tfi";
import { parseEther } from "viem";
import { useAccount } from "wagmi";
import { FaucetButton, RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import useFormattedBalance from "~~/hooks/scaffold-eth/useFormattedBalance";

type HeaderMenuLink = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

export const menuLinks: HeaderMenuLink[] = [
  {
    label: "Pools",
    href: "/pools",
    icon: <LiaDotCircleSolid />,
  },
  {
    label: "Portfolio",
    href: "/portfolio",
    icon: <CiWallet />,
  },
  {
    label: "Docs",
    href: "/docs",
    icon: <TfiBook />,
  },
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <CiDesktopMouse1 />,
  },
];

export const HeaderMenuLinks = () => {
  const pathname = usePathname();

  return (
    <>
      {menuLinks.map(({ label, href, icon }) => {
        const isActive = pathname === href;
        return (
          <li key={href}>
            <Link href={href} passHref>
              <span className={`flex items-center gap-[5px] ${isActive ? "text-[#A24DFF]" : "text-[#ffffff]"}`}>
                {icon} {label}
              </span>
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

  const balanceDai = useFormattedBalance("tDAI", account);
  const balanceBtc = useFormattedBalance("tBTC", account);
  const balanceEth = useFormattedBalance("tETH", account);

  // console.log(balanceDai,balanceBtc,balanceEth)

  return (
    <>
      <div className="z-10 w-full shadow-md bg-header">
        <div className="flex items-center justify-center">
          <div className=" flex justify-between items-center 0 min-h-0 p-6 text-white lg:static navbar sm:px-2 max-w-[1920px] w-full">
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
              {account ? (
                <button className="border rounded-xl py-[15px] px-[50px]">
                  <Link href="/register">Launch App</Link>
                </button>
              ) : (
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
              )}
              <RainbowKitCustomConnectButton />
              <FaucetButton />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
