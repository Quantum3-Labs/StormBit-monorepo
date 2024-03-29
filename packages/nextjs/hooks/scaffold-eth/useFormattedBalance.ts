import { useEffect, useState } from "react";
import { formatEther } from "viem";
import { PublicClient } from "wagmi";
import { GetAccountResult } from "wagmi/dist/actions";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import { ContractName } from "~~/utils/scaffold-eth/contract";

const useFormattedBalance = (contractName: ContractName, account: GetAccountResult<PublicClient>): string => {
  const [formattedBalance, setFormattedBalance] = useState<string>("0");

  const { data: balanceData } = useScaffoldContractRead({
    contractName,
    functionName: "balanceOf",
    args: [account.address],
    watch: true,
  });

  useEffect(() => {
    if (balanceData !== undefined) {
      setFormattedBalance(formatEther(balanceData));
    }
  }, [balanceData]);

  return formattedBalance;
};

export default useFormattedBalance;
