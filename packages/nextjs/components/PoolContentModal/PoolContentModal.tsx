import { useState } from "react";
import Button from "../Button/Button";
import CustomCheckbox from "../CustomCheckbox/CustomCheckbox";
import SelectToken from "../SelectToken/SelectToken";
import SelectableButton from "../SelectableButton/SelectableButton";
import "./poolContentModal.css";
import toast from "react-hot-toast";
import { AiOutlineClose } from "react-icons/ai";
import { RiInformationLine } from "react-icons/ri";
import { parseEther } from "viem";
import { useAccount } from "wagmi";
import ModalContainer from "~~/components/ModalContainer/ModalContainer";
import { useScaffoldContract, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

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
const PoolContentModal: React.FC<ModalProps> = ({ setIsModalOpen }) => {
  const [selectedButtonTime, setSelectedButtonTime] = useState("");
  const [selectedCheckbox, setSelectedCheckbox] = useState<string[]>([]);
  const { address } = useAccount();
  const [showInfo, setShowInfo] = useState(false);
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

  const { data: tokenContractDAI } = useScaffoldContract({
    contractName: "tDAI",
  });

  // const { data: tokenContractETH } = useScaffoldContract({
  //   contractName: "tETH",
  // });
  // const { data: tokenContractBTC } = useScaffoldContract({
  //   contractName: "tBTC",
  // });

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
        initToken: tokenContractDAI ? tokenContractDAI.address : "",
        supportedAssets: [tokenContractDAI ? tokenContractDAI.address : ""],
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
    contractName: "tDAI",
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

  const handleButton = (button: string) => {
    if (selectedButtonTime !== button) {
      setSelectedButtonTime(button);
    }
  };

  const handleClick = (value: string) => {
    if (selectedCheckbox.includes(value)) {
      setSelectedCheckbox(selectedCheckbox.filter(c => c !== value));
    } else {
      setSelectedCheckbox([...selectedCheckbox, value]);
    }
  };
  const handleCloseModal = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsModalOpen();
    }
  };

  return (
    <ModalContainer onClick={handleCloseModal}>
      <div className="flex flex-col gap-8 pb-[20px]">
        <div className="border-b border-[#374B6D] ">
          <div className="flex justify-between items-center w-full pb-[20px]">
            <p className="text-2xl font-medium text-[#ffffff] m-0 ">Create Pool</p>
            <button
              onClick={() => {
                setIsModalOpen();
              }}
            >
              <AiOutlineClose />
            </button>
          </div>
        </div>
        <form className="flex flex-col gap-10">
          <div className="flex flex-col gap-[20px]">
            <div className="flex items-center">
              <label htmlFor="campo1" className="w-1/5 text-xl">
                Pool name
              </label>
              <input
                type="text"
                id="campo1"
                name="campo1"
                className="w-full p-3 bg-transparent border-[#374B6D] focus:outline-none rounded-[14px]"
                value={poolConfig.name}
                onChange={e => setPoolConfig({ ...poolConfig, name: e.target.value })}
              />
            </div>
            <div className="flex items-center">
              <label htmlFor="campo2" className="w-1/5 text-xl">
                Manager
              </label>
              <input
                value={poolConfig.owner}
                onChange={e => setPoolConfig({ ...poolConfig, owner: e.target.value })}
                type="text"
                id="campo2"
                name="campo2"
                className="w-full p-3 border bg-transparent border-[#374B6D] focus:outline-none rounded-[14px]"
              />
            </div>
          </div>

          <div className="flex gap-16">
            <div className="flex-1">
              <label htmlFor="campo3">Manager Fee</label>
              <div className="flex items-center gap-5 ">
                <input
                  type="range"
                  id="campo3"
                  name="campo3"
                  className="w-11/12 py-2 custom-range"
                  value={String(poolConfig.minCreditScore)}
                  onChange={e => setPoolConfig({ ...poolConfig, minCreditScore: BigInt(e.target.value ?? 0) })}
                />
                <span className="p-3 border border-solid border-[#374B6D] rounded-[7px] max-w-[60px] w-full text-center">
                  {String(poolConfig.minCreditScore)}%
                </span>
              </div>
            </div>
            <div className="flex-1">
              <label htmlFor="campo4">Max Pool Usage</label>
              <div className="flex items-center gap-5 ">
                <input
                  type="range"
                  id="campo4"
                  name="campo4"
                  className="w-11/12 py-2 custom-range"
                  value={String(poolConfig.maxAmountOfStakers)}
                  onChange={e => setPoolConfig({ ...poolConfig, maxAmountOfStakers: BigInt(e.target.value ?? 0) })}
                />
                <span className="p-3 border border-solid border-[#374B6D] rounded-[7px] max-w-[60px] w-full text-center">
                  {String(poolConfig.maxAmountOfStakers)}%
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-[20px] flex-col">
            <div className="flex items-center gap-4">
              <span>Timelock</span>
              <div
                className="info-icon-container"
                onMouseEnter={() => setShowInfo(true)}
                onMouseLeave={() => setShowInfo(false)}
              >
                <RiInformationLine />
                {showInfo && (
                  <div className="text-xs text-white info-tooltip">
                    <span className="text-xs font-bold">Delay before loan approval is executed</span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex gap-6 ">
              <SelectableButton
                text="3 days"
                selected={selectedButtonTime === "3 days"}
                onClick={() => handleButton("3 days")}
              />
              <SelectableButton
                text="7 days"
                selected={selectedButtonTime === "7 days"}
                onClick={() => handleButton("7 days")}
              />
              <SelectableButton
                text="15 days"
                selected={selectedButtonTime === "15 days"}
                onClick={() => handleButton("15 days")}
              />
            </div>
          </div>
          <div className="flex flex-col gap-10">
            <div className="flex flex-col flex-1 gap-4">
              <label htmlFor="campo1">Token vault</label>
              <div className="flex items-center">
                <SelectToken />
              </div>
            </div>
            <div className="flex flex-col flex-1 gap-4">
              <label htmlFor="campo1">Initial deposit</label>
              <div className="flex items-center border border-[#374B6D] rounded-[14px]">
                <input
                  type="text"
                  id="campo"
                  name="campo"
                  className="w-full p-3 bg-transparent border-none focus:outline-none"
                  value={String(poolConfig.amount)}
                  onChange={e => setPoolConfig({ ...poolConfig, amount: BigInt(e.target.value ?? 0) })}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[20px]">
            <span>Agreement supported</span>
            <div className="flex gap-16">
              <CustomCheckbox isSelected={selectedCheckbox.includes("Simple")} onClick={() => handleClick("Simple")}>
                Simple Agreement
              </CustomCheckbox>
              <CustomCheckbox isSelected={selectedCheckbox.includes("ERC721")} onClick={() => handleClick("ERC721")}>
                ERC721 Agreement
              </CustomCheckbox>
              <CustomCheckbox isSelected={selectedCheckbox.includes("ERC20")} onClick={() => handleClick("ERC20")}>
                ERC20 Agreement
              </CustomCheckbox>
            </div>
          </div>
        </form>
      </div>
      <div className="flex items-center justify-center py-[20px]">
        <Button onClick={() => approveTokens()} size="large">
          {createPoolLoading ? "Creating Pool" : "Create Pool"}
        </Button>
      </div>
    </ModalContainer>
  );
};

export default PoolContentModal;
