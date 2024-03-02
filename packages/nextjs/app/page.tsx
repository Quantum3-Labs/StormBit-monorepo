import Image from "next/image";
import type { NextPage } from "next";

const Home: NextPage = () => {
  const data = [
    {
      name: "Morpho Blue",
      description: "Permissionless Lending Protocol",
      icon: "/image13.png",
    },
    {
      name: "Captain Hooks",
      description: "Custom UniswapV4 Pools",
      icon: "/image12.png",
    },
    {
      name: "Compound",
      description: "Algorithmic, Autonomous Interest Rate Protocol",
      icon: "/image14.png",
    },
  ];

  const technology = [
    {
      name: "Custom Agreements",
      description: "As a borrower you can choose your agreement from a set of available ones.",
      icon: "/custom.png",
    },
    {
      name: "Governance Allocations",
      description: "Loans approvals for borrowers requests enhance the trust between our users.",
      icon: "/bank.png",
    },
    {
      name: "SBIT Repayments",
      description: "Lock $SBIT earned after repayments.",
      icon: "/money-bag.png",
    },
  ];

  const metrics = [
    {
      name: "Market Size",
      description: "91M",
    },
    {
      name: "Total Value Locked",
      description: "52.1M",
    },
    {
      name: "Unique Active Addresses",
      description: "249.7K",
    },
  ];
  return (
    <>
      <div className="flex flex-col items-stretch justify-center pt-10 gap-80">
        <div className="flex justify-between gap-28">
          <div className="w-[964px] my-24">
            <span className="font-bold text-white text-9xl">STORM</span>
            <span className="font-bold text-9xl text-gradient">BIT.</span>
            <p className="text-4xl text-[#B5B5B5]">Democratizing Lending with Collective Decision-Making</p>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <Image src="/scheme.png" alt="scheme" width={1330} height={604}></Image>
        </div>
        <div className="flex flex-col items-center justify-center gap-20">
          <h2 className="text-5xl text-white">Metrics based on Avalanche</h2>
          <div className="flex gap-32">
            {metrics.map(element => (
              <>
                <div className="flex flex-col items-center bg-transparent w-[423px] gap-4 rounded-[69px] h-[163px] metrics">
                  <span className="mt-12 text-4xl font-medium text-white">{element.description}</span>
                  <span className="text-[#3B3B3B] text-2xl font-medium">{element.name}</span>
                </div>
              </>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center gap-12">
          <h2 className="text-5xl font-bold text-white">Extensions</h2>
          <div className="flex gap-8">
            {data.map(element => (
              <>
                <div className="flex items-center w-[538px] gap-4 h-[257px] extensions px-4">
                  <div>
                    <Image src={element.icon} alt="icon" width={200} height={200}></Image>
                  </div>
                  <div className="flex flex-col gap-4 text-white">
                    <span className="mt-12 text-3xl font-medium text-white">{element.name}</span>
                    <span className="text-xl">{element.description}</span>
                    <button className="w-[180px] h-[55px] rounded-[9px] border border-solid border-white">
                      Launch App
                    </button>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center gap-12">
          <h2 className="text-5xl font-bold text-white">Core Technology</h2>
          <div className="flex gap-24">
            {technology.map(element => (
              <>
                <div className="flex flex-col items-center justify-center w-[474px] gap-16 h-[539px] border border-solid border-white rounded-[12px] px-12">
                  <div>
                    <Image src={element.icon} alt="icon" width={108} height={132}></Image>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-6 text-white">
                    <span className="text-2xl font-bold text-white">{element.name}</span>
                    <span className="text-xl font-medium text-center">{element.description}</span>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center roadmap w-[1980px] gap-4 my-40">
        <h2 className="text-5xl font-bold text-white">Roadmap</h2>
        <Image src="/map.png" alt="map" width={1467} height={115}></Image>
        <div className="flex flex-wrap w-[1500px] gap-8 justify-center">
          <div className="w-[469px] h-[91px] credit rounded-3xl flex items-center justify-center">
            <span className="text-xl font-medium text-white">Credit Score Aggregation</span>
          </div>
          <div className="w-[469px] h-[91px] credit rounded-3xl flex items-center justify-center">
            <span className="text-xl font-medium text-white">Cross-chain Governance For Lenders</span>
          </div>
          <div className="w-[469px] h-[91px] credit rounded-3xl flex items-center justify-center">
            <span className="text-xl font-medium text-white">Public Tesnet</span>
          </div>
          <div className="w-[469px] h-[91px] credit rounded-3xl flex items-center justify-center">
            <span className="text-xl font-medium text-white">SBIT Token Faucet on multiple chains</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
