import React, { useEffect } from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatEther, formatUnits, parseAbiItem } from "viem";
import { useContractReads } from "wagmi";
import { GetAccountResult } from "wagmi/actions";
import { useScaffoldContract, useScaffoldContractRead, useScaffoldEventHistory } from "~~/hooks/scaffold-eth";
import { Pools } from "~~/types/Pools";
import { contracts } from "~~/utils/scaffold-eth/contract";

interface PoolResult {
  name: string;
  totalBorrowed: bigint;
  totalSupplied: bigint;
}

function Table() {
  const [poolList, setPoolList] = useState([] as Pools[]);

  const { data: LendingContract } = useScaffoldContract({
    contractName: "StormBitLending",
  });

  const { data: tDAIContract } = useScaffoldContract({
    contractName: "tDAI",
  });
  const { data: tETHContract } = useScaffoldContract({
    contractName: "tETH",
  });
  const { data: tBTCContract } = useScaffoldContract({
    contractName: "tBTC",
  });

  const { data: ScaffoldEventHistoryData, isLoading: ScaffoldEventHistoryLoading } = useScaffoldEventHistory({
    contractName: "StormBitCore",
    eventName: "PoolCreated",
    fromBlock: BigInt(0),
  });

  const { data: poolName, isLoading: poolsLoading } = useContractReads({
    contracts: ScaffoldEventHistoryData?.map(item => ({
      address: item.args.pool,
      abi: LendingContract?.abi,
      functionName: "poolName",
    })),
  });

  const poolAddresses = ScaffoldEventHistoryData?.map(item => item.log.address);

  const tokenData = poolAddresses
    ? poolAddresses.flatMap(address => [
        {
          address: tDAIContract?.address,
          abi: tDAIContract?.abi,
          method: "balanceOf",
          params: [address],
        },
        {
          address: tETHContract?.address,
          abi: tETHContract?.abi,
          method: "balanceOf",
          params: [address],
        },
        {
          address: tBTCContract?.address,
          abi: tBTCContract?.abi,
          method: "balanceOf",
          params: [address],
        },
      ])
    : [];

  // console.log(tokenData[1].params);

  const { data: tokensPoolData } = useContractReads({
    contracts:
      tokenData && ScaffoldEventHistoryData
        ? tokenData.map(token => {
            console.log(token.address);
            console.log(token.abi);
            console.log(token.method);
            console.log(token.params);
            return {
              address: token.address,
              abi: token.abi,
              functionName: token.method,
              params: token.params,
            };
          })
        : [],
  });

  console.log(tokensPoolData);
  // useEffect(() => {
  //   if (tokensPoolData && tokensPoolData.length > 0 && ScaffoldEventHistoryData) {
  //     const newPoolList = tokensPoolData.map((pool, index) => {
  //       console.log({ pool });
  //       const poolAddr = pool.address;
  //       const poolResult: PoolResult = pool.result as PoolResult;
  //
  //       return {
  //         address: poolAddr || "",
  //         name: poolName ? (poolName[index].result as string) : "",
  //         borrowedAPY: "0%",
  //         suppliedAPY: "0%",
  //         totalBorrowed: poolResult ? formatUnits(poolResult.totalBorrowed, 18) : "0",
  //         totalSupplied: poolResult ? formatUnits(poolResult.totalSupplied, 18) : "0",
  //         marketSize: poolResult ? formatUnits(poolResult.totalBorrowed + poolResult.totalSupplied, 18) : "0",
  //       };
  //     });
  //
  //     setPoolList(newPoolList);
  //   }
  // }, [tokensPoolData, ScaffoldEventHistoryData]);

  return (
    <div className="w-[1450px] flex flex-col">
      {poolsLoading || ScaffoldEventHistoryLoading ? (
        <>
          <div className="flex flex-col items-center justify-center gap-16 my-7">
            <Image src="/loading.png" alt="loading" width={150} height={150}></Image>
            <span className="text-3xl text-[#4A5056] font-semibold"> Loading </span>
          </div>
        </>
      ) : (
        <>
          <div className="flex gap-4 h-[95px] items-center p-8 border border-solid border-[#EAEBEF]">
            <span className="w-[160px] text-center">Pool</span>
            <span className="w-[160px] text-center">Market SIze</span>
            <span className="w-[160px] text-center">Total Supplied</span>
            <span className="w-[160px] text-center">Supply APY</span>
            <span className="w-[160px] text-center">Total Borrowed</span>
            <span className="w-[160px] text-center">Borrow APY</span>
            <span className="w-[160px] text-center"></span>
          </div>
          {poolList.map((pool, index) => (
            <div key={index} className="flex gap-4 h-[95px] items-center p-8 border border-solid border-[#EAEBEF]">
              <p className="w-[160px] text-center">{pool.name}</p>
              <p className="w-[160px] text-center">{pool.marketSize}</p>
              <p className="w-[160px] text-center">{pool.totalSupplied}</p>
              <p className="w-[160px] text-center">{pool.suppliedAPY}</p>
              <p className="w-[160px] text-center">{pool.totalBorrowed}</p>
              <p className="w-[160px] text-center">{pool.borrowedAPY}</p>
              <Link href={`/pool/${pool.address}`}>
                <button className="border border-solid border-[#4A5056] rounded-[7px] py-4 px-10">Trade</button>
              </Link>
              <Link href={`/pool/${pool.address}`}>
                <Image src="/chevron-right.png" alt="chevron" width={24} height={24}></Image>
              </Link>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default Table;
