import React, { useEffect, useState } from "react";
import Image from "next/image";
import Button from "../Button/Button";
import toast from "react-hot-toast";
import { encodeAbiParameters, parseEther } from "viem";
import { useAccount, useContractWrite } from "wagmi";
import DropdownButton from "~~/components/DropdownButton/DropdownButton";
import { useScaffoldContract } from "~~/hooks/scaffold-eth";
import { ContractName } from "~~/utils/scaffold-eth/contract";

interface baseAgreementConfig {
  paymentSchedule: bigint;
  penalty: bigint;
}
interface borrowConfig {
  amount: bigint;
  agreements: boolean[];
  baseAgreementSettings: baseAgreementConfig;
}
interface BorrowProps {
  poolAddress: string;
}
function Borrow({ poolAddress }: BorrowProps) {
  const [selectedAgreement, setSelectedAgreement] = useState<string>("baseChain");
  const [timeUnit, setTimeUnit] = useState<string>("month");
  const [selectedToken, setSelectedToken] = useState("ETH");
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [borrowConfig, setBorrowConfig] = useState<borrowConfig>({
    amount: BigInt(0),
    agreements: [false, false, false],
    baseAgreementSettings: {
      paymentSchedule: BigInt(0),
      penalty: BigInt(0),
    },
  });
  const { address } = useAccount();

  const contractToken: Record<string, ContractName> = {
    ETH: "tETH",
    BTC: "tBTC",
    DAI: "tDAI",
  };

  const { data: token } = useScaffoldContract({
    contractName: contractToken[selectedToken],
  });

  const { data: LendingContract } = useScaffoldContract({
    contractName: "StormBitLending",
  });

  const { data: simpleAgreementContract } = useScaffoldContract({
    contractName: "SimpleAgreement",
  });

  const timeMap = {
    month: 30 * 24 * 60 * 60,
    quater: 90 * 24 * 60 * 60,
    year: 365 * 24 * 60 * 60,
  };

  const { data: requestLoanData, write: submitRequestLoan } = useContractWrite(
    token && address
      ? {
          address: poolAddress,
          abi: LendingContract?.abi,
          functionName: "requestLoan",
          args: [
            {
              amount: parseEther("1000"),
              token: token ? token.address : "",
              agreement: simpleAgreementContract ? simpleAgreementContract.address : "",
              agreementCalldata: encodeAbiParameters(
                [
                  { name: "borrowAmount", type: "uint256" },
                  { name: "borrower", type: "address" },
                  { name: "token", type: "address" },
                  { name: "amounts", type: "uint256[]" },
                  { name: "times", type: "uint256[]" },
                ],
                [
                  //TODO：add interest to amount
                  parseEther(borrowConfig.amount.toString()),
                  address,
                  token?.address,
                  Array.from({ length: Number(borrowConfig.baseAgreementSettings.paymentSchedule) }, () =>
                    parseEther(
                      (
                        Number(borrowConfig.amount) / Number(borrowConfig.baseAgreementSettings.paymentSchedule)
                      ).toString(),
                    ),
                  ),
                  Array.from({ length: Number(borrowConfig.baseAgreementSettings.paymentSchedule) }, (_, index) =>
                    BigInt((timeMap as { [key: string]: number })[timeUnit] * index),
                  ),
                ],
              ),
            },
          ],
          onSuccess: txReceipt => {
            toast.success(`loan requested successfully with hash ${txReceipt.hash as string}`);
          },
        }
      : {},
  );

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleAgreementClick = (agreement: string) => {
    setSelectedAgreement(agreement);
  };

  useEffect(() => {
    renderDefaultContent();
  }, []);

  const renderDefaultContent = () => {
    setSelectedAgreement("baseChain");
  };

  return (
    <div className="flex flex-col text-[#4A5056]">
      <div className="flex flex-col">
        <span className="text-[#4A5056] font-bold my-2">Amount to Borrow</span>
        <div className="flex border border-solid border-[#EAEBEF] rounded-[5px] justify-between">
          <input
            value={borrowConfig.amount.toString()}
            onChange={e => setBorrowConfig({ ...borrowConfig, amount: BigInt(e.target.value) })}
            type="number"
            className="p-1 focus:outline-none w-[500px] border-none"
          />
          <div className="px-[10px]">
            <DropdownButton selectedToken={selectedToken} setSelectedToken={setSelectedToken} />
          </div>
        </div>
        <span className="text-xs">Balance 0.001 ETH</span>
      </div>
      <div className="flex flex-col gap-4 mt-6">
        <span className="text-[#4A5056] font-bold">Supported Agreement</span>
        <div className="flex gap-8">
          <div className="flex gap-4">
            <input type="checkbox" className="rounded-full" />
            <span>Base Agreement</span>
          </div>
          <div className="flex gap-4">
            <input type="checkbox" />
            <span>NFT Agreement</span>
          </div>
          <div className="flex gap-4">
            <input type="checkbox" />
            <span>FT Agreement</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 my-4">
        <span className="text-[#4A5056] font-bold">Aggreement Settings</span>
        <div className="flex gap-4">
          <button
            onClick={() => handleAgreementClick("baseChain")}
            className={`bg-${
              selectedAgreement === "baseChain" ? " bg-[#17344F] text-white text-sm" : "white"
            } py-2 px-4 rounded-[8px]`}
          >
            Base Chain Agreement
          </button>
          <button
            onClick={() => handleAgreementClick("nft")}
            className={`bg-${
              selectedAgreement === "nft" ? " bg-[#17344F] text-white text-sm" : "white"
            } py-2 px-4 rounded-[8px]`}
          >
            NFT Agreement
          </button>
          <button
            onClick={() => handleAgreementClick("ft")}
            className={`bg-${
              selectedAgreement === "ft" ? " bg-[#17344F] text-white text-sm" : "white"
            } py-2 px-4 rounded-[8px]`}
          >
            FT Agreement
          </button>
        </div>
        <div>
          {selectedAgreement === "baseChain" && (
            <div className="flex flex-col">
              <span>Payment Schedule</span>
              <div className="flex border border-solid border-[#EAEBEF] rounded-[5px] justify-between">
                <input
                  value={borrowConfig.baseAgreementSettings.paymentSchedule.toString()}
                  onChange={e =>
                    setBorrowConfig({
                      ...borrowConfig,
                      baseAgreementSettings: {
                        ...borrowConfig.baseAgreementSettings,
                        paymentSchedule: BigInt(parseInt(e.target.value || "0")),
                      },
                    })
                  }
                  type="text"
                  className="p-1 focus:outline-none w-[500px] border-none"
                ></input>
                <div className="flex items-center justify-center px-1">
                  <ul className="main-menu">
                    <li className="relative main-menu-item">
                      <button
                        onClick={() => {
                          toggleDropdown();
                        }}
                        className="flex items-center justify-center gap-1 dropdown-trigger"
                      >
                        {timeUnit}
                        <span className="arrow-down">&#9662;</span>
                      </button>
                      {isDropdownOpen && (
                        <ul className="dropdown-menu">
                          <li>
                            <a
                              onClick={() => {
                                setTimeUnit("month");
                              }}
                              href="#"
                            >
                              month
                            </a>
                          </li>
                          <li>
                            <a
                              onClick={() => {
                                setTimeUnit("quater");
                              }}
                              href="#"
                            >
                              quater
                            </a>
                          </li>
                          <li>
                            <a
                              onClick={() => {
                                setTimeUnit("year");
                              }}
                              href="#"
                            >
                              year
                            </a>
                          </li>
                        </ul>
                      )}
                    </li>
                  </ul>
                </div>
              </div>
              <span>Penalty</span>
              <input
                type="text"
                className="p-1 focus:outline-none border border-solid border-[#EAEBEF] rounded-[5px]"
              />
            </div>
          )}
          {selectedAgreement === "nft" && (
            <div className="flex flex-col">
              <span>NFT Address</span>
              <input type="text" className="focus:outline-none" />
              <span>Token</span>
              <div className="flex border border-solid border-[#EAEBEF] rounded-[5px] justify-between">
                <input type="text" className="p-1 w-[500px] focus:outline-none border-none"></input>
                <div className="flex items-center justify-center px-1">
                  <ul className="main-menu">
                    <li className="relative main-menu-item">
                      <button
                        onClick={toggleDropdown}
                        className="flex items-center justify-center gap-1 dropdown-trigger"
                      >
                        <Image src="/DAI.png" alt="ether" width={17} height={17}></Image>
                        DAI<span className="arrow-down">&#9662;</span>
                      </button>
                      {isDropdownOpen && (
                        <ul className="dropdown-menu">
                          <li>
                            <a href="#"> USDT</a>
                          </li>
                          <li>
                            <a href="#"> USDT</a>
                          </li>
                        </ul>
                      )}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
          {selectedAgreement === "ft" && (
            <div className="flex flex-col">
              <span>Token</span>
              <div className="flex border border-solid border-[#EAEBEF] rounded-[5px] justify-between">
                <input type="text" className="p-1 w-[500px] focus:outline-none border-none"></input>
                <div className="flex items-center justify-center px-1">
                  <ul className="main-menu">
                    <li className="relative main-menu-item">
                      <button
                        onClick={toggleDropdown}
                        className="flex items-center justify-center gap-1 dropdown-trigger"
                      >
                        <Image src="/DAI.png" alt="ether" width={17} height={17}></Image>
                        DAI<span className="arrow-down">&#9662;</span>
                      </button>
                      {isDropdownOpen && (
                        <ul className="dropdown-menu">
                          <li>
                            <a href="#">DAI</a>
                          </li>
                          <li>
                            <a href="#">DAI</a>
                          </li>
                        </ul>
                      )}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className=" bg-[#F3F7F9] p-5 text-[#17344F;]">
        <span className="font-bold">Order information</span>
        <div className="flex justify-between">
          <span>Supply Interest</span>
          <span>0.03 %</span>
        </div>
        <div className="flex justify-between">
          <span>Total Supply Amount</span>
          <span>0.001 ETH</span>
        </div>
      </div>
      <Button onClick={() => submitRequestLoan()}> Request Loan</Button>
    </div>
  );
}

export default Borrow;
