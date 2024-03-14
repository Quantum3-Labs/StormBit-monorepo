import { useEffect, useState } from "react";
import Image from "next/image";
import Button from "../Button/Button";
import DropdownButton from "../DropdownButton/DropdownButton";
import "./CreationModal.css";
import toast from "react-hot-toast";
import { parseEther } from "viem";
import { useAccount } from "wagmi";
import { useScaffoldContract, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { ContractName } from "~~/utils/scaffold-eth/contract";

interface PoolConfig {
  name: string;
  owner: string;
  minCreditScore: bigint;
  maxAmountOfStakers: bigint;
  quorum: bigint;
  maxPoolUsage: bigint;
  votingPowerCooldown: bigint;
  amount: bigint;
  agreements: boolean[];
}

interface ModalProps {
  setIsModalOpen: () => void;
}
const CreationModal: React.FC<ModalProps> = ({ setIsModalOpen }) => {
  const { address } = useAccount();
  const [showInfo, setShowInfo] = useState(false);
  const [selectedToken, setSelectedToken] = useState("ETH");
  const [poolConfig, setPoolConfig] = useState<PoolConfig>({
    name: "",
    owner: address ? address : "",
    minCreditScore: BigInt(0),
    maxAmountOfStakers: BigInt(0),
    quorum: BigInt(0),
    maxPoolUsage: BigInt(0),
    votingPowerCooldown: BigInt(0),
    amount: BigInt(0),
    agreements: [false, false, false],
  });

  const contractToken: Record<string, ContractName> = {
    ETH: "tETH",
    BTC: "tBTC",
    DAI: "tDAI",
  };

  const { data: token } = useScaffoldContract({
    contractName: contractToken[selectedToken],
  });

  console.log(selectedToken);

  const { data: simpleAgreementContract } = useScaffoldContract({
    contractName: "SimpleAgreement",
  });

  const { data: stormBitCoreContract } = useScaffoldContract({
    contractName: "StormBitCore",
  });
  const { writeAsync: createPool, isLoading: createPoolLoading } = useScaffoldContractWrite({
    contractName: "StormBitCore",
    functionName: "createPool",
    args: [
      {
        name: poolConfig.name,
        creditScore: BigInt(poolConfig.minCreditScore),
        maxAmountOfStakers: BigInt(poolConfig.maxAmountOfStakers),
        votingQuorum: BigInt(poolConfig.quorum),
        maxPoolUsage: BigInt(poolConfig.maxPoolUsage),
        votingPowerCoolDown: BigInt(poolConfig.votingPowerCooldown),
        initAmount: parseEther(poolConfig.amount.toString()),
        initToken: token ? token.address : "",
        supportedAssets: [token ? token.address : ""],
        supportedAgreements: [simpleAgreementContract ? simpleAgreementContract.address : ""],
      },
    ],
    value: BigInt(0),
    onBlockConfirmation: txReceipt => {
      toast.success(`Pool created successfully with hash ${txReceipt.transactionHash as string}`);
      setIsModalOpen();
    },
    blockConfirmations: 0,
  });

  const { writeAsync: approveTokens } = useScaffoldContractWrite({
    contractName: contractToken[selectedToken],
    functionName: "approve",
    args: [stormBitCoreContract ? stormBitCoreContract.address : "", parseEther("1000")],
    value: BigInt(0),
    onBlockConfirmation: txReceipt => {
      toast.success(`Tokens approved successfully with hash ${txReceipt.transactionHash as string}`);
      createPool();
      setIsModalOpen();
    },
    blockConfirmations: 0,
  });

  return (
    <div className="container-modal">
      <div className="gap-4 content-modal">
        <div className="flex flex-col gap-10">
          <div className="flex justify-between">
            <p className="text-2xl font-medium text-[#ffffff] pb-12 border-b border-[#374B6D] w-11/12">Create Pool</p>
            <button
              onClick={() => {
                setIsModalOpen();
              }}
            >
              X
            </button>
          </div>
          <form className="flex flex-col gap-4">
            <div className="flex items-center">
              <label htmlFor="campo1" className="w-1/5 text-xl">
                Pool name
              </label>
              <input
                type="text"
                id="campo1"
                name="campo1"
                className="w-full p-5 bg-transparent border-[#374B6D] focus:outline-none rounded-[14px]"
                value={poolConfig.name}
                onChange={e => setPoolConfig({ ...poolConfig, name: e.target.value })}
              />
            </div>
            <div className="flex items-center">
              <label htmlFor="campo2" className="w-1/5 text-xl">
                Owner
              </label>
              <input
                value={poolConfig.owner}
                onChange={e => setPoolConfig({ ...poolConfig, owner: e.target.value })}
                type="text"
                id="campo2"
                name="campo2"
                className="w-full p-5 border bg-transparent border-[#374B6D] focus:outline-none rounded-[14px]"
              />
            </div>
            <div className="flex gap-16">
              <div className="flex-1">
                <label htmlFor="campo3">Min Credit Score</label>
                <div className="flex items-center gap-5 ">
                  <input
                    type="range"
                    id="campo3"
                    name="campo3"
                    className="w-11/12 p-2 custom-range"
                    value={String(poolConfig.minCreditScore)}
                    onChange={e => setPoolConfig({ ...poolConfig, minCreditScore: BigInt(e.target.value ?? 0) })}
                  />
                  <span className="p-3 border border-solid border-[#374B6D] rounded-[7px]">
                    {String(poolConfig.minCreditScore)}
                  </span>
                </div>
              </div>
              <div className="flex-1">
                <label htmlFor="campo4">Max Amount Of Stakers</label>
                <div className="flex items-center gap-5 ">
                  <input
                    type="range"
                    id="campo4"
                    name="campo4"
                    className="w-11/12 p-2 custom-range"
                    value={String(poolConfig.maxAmountOfStakers)}
                    onChange={e => setPoolConfig({ ...poolConfig, maxAmountOfStakers: BigInt(e.target.value ?? 0) })}
                  />
                  <span className="p-3 border border-solid border-[#374B6D] rounded-[7px]">
                    {String(poolConfig.maxAmountOfStakers)}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-16">
              <div className="flex-1">
                <label htmlFor="campo5">Min Quorum</label>
                <div className="flex items-center gap-5 ">
                  <input
                    type="range"
                    id="campo5"
                    name="campo5"
                    className="w-11/12 p-2 custom-range"
                    value={String(poolConfig.quorum)}
                    onChange={e => setPoolConfig({ ...poolConfig, quorum: BigInt(e.target.value ?? 0) })}
                  />
                  <span className="p-3 border border-solid border-[#374B6D] rounded-[7px]">
                    {String(poolConfig.quorum)}
                  </span>
                </div>
              </div>
              <div className="flex-1">
                <label htmlFor="campo6">Max Pool Usage</label>
                <div className="flex items-center gap-5 ">
                  <input
                    type="range"
                    id="campo6"
                    name="campo6"
                    className="w-11/12 p-2 custom-range"
                    value={String(poolConfig.maxPoolUsage)}
                    onChange={e => setPoolConfig({ ...poolConfig, maxPoolUsage: BigInt(e.target.value ?? 0) })}
                  />
                  <span className="p-3 border border-solid border-[#374B6D] rounded-[7px]">
                    {String(poolConfig.maxPoolUsage)}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <label htmlFor="campo7">Voting Power Cooldown</label>
              <div className="flex items-center gap-5 ">
                <input
                  type="range"
                  id="campo7"
                  name="campo7"
                  className="w-full p-2 border custom-range"
                  value={String(poolConfig.votingPowerCooldown)}
                  onChange={e => setPoolConfig({ ...poolConfig, votingPowerCooldown: BigInt(e.target.value ?? 0) })}
                />
                <span className="p-3">days</span>
              </div>
            </div>
            <div className="flex flex-col flex-1 gap-4">
              <label htmlFor="campo1">Amount</label>
              <div className="flex items-center border border-[#374B6D] rounded-[14px]">
                <input
                  type="text"
                  id="campo1"
                  name="campo1"
                  className="w-full p-5 bg-transparent border-none focus:outline-none"
                  value={String(poolConfig.amount)}
                  onChange={e => setPoolConfig({ ...poolConfig, amount: BigInt(e.target.value ?? 0) })}
                />
                <div className="px-[10px]">
                  <DropdownButton selectedToken={selectedToken} setSelectedToken={setSelectedToken} />
                </div>
              </div>
            </div>
            <span>Agreement supported</span>
            <div className="flex gap-16">
              <div className="flex gap-4">
                <input type="checkbox"></input>
                <div className="flex items-center gap-2">
                  <span>Base agreement</span>
                  <div
                    className="info-icon-container"
                    onMouseEnter={() => setShowInfo(true)}
                    onMouseLeave={() => setShowInfo(false)}
                  >
                    <Image src="/information.png" alt="information" width={18} height={18}></Image>
                    {showInfo && (
                      <div className="text-xs info-tooltip text-[#484848]">
                        <span className="text-xs font-bold">Strategy Name</span>
                        <br></br>
                        <span>Some description info here...</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <input type="checkbox"></input>
                <div className="flex items-center gap-2">
                  <span>NFT agreement</span>
                  <div
                    className="info-icon-container"
                    onMouseEnter={() => setShowInfo(true)}
                    onMouseLeave={() => setShowInfo(false)}
                  >
                    <Image src="/information.png" alt="information" width={18} height={18} />
                    {showInfo && (
                      <div className="text-xs info-tooltip text-[#484848]">
                        <span className="text-xs font-bold">Strategy Name</span>
                        <br></br>
                        <span>Some description info here...</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <input type="checkbox"></input>
                <div className="flex items-center gap-2">
                  <span>FT agreement</span>
                  <div
                    className="info-icon-container"
                    onMouseEnter={() => setShowInfo(true)}
                    onMouseLeave={() => setShowInfo(false)}
                  >
                    <Image src="/information.png" alt="information" width={18} height={18}></Image>
                    {showInfo && (
                      <div className="text-xs info-tooltip text-[#484848]">
                        <span className="text-xs font-bold">Strategy Name</span>
                        <br></br>
                        <span>Some description info here...</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="flex items-center justify-center">
          <Button onClick={() => approveTokens()} size="large">
            {createPoolLoading ? "Creating Pool" : "Create Pool"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreationModal;
