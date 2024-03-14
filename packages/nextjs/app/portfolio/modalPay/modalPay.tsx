import "./modalPay.css";
import Button from "~~/components/Button/Button";
import { useScaffoldContract } from "~~/hooks/scaffold-eth";

interface ModalProps {
  setModalPay: () => void;
}

function ModalPay({ setModalPay }: ModalProps) {


  const { data: LendingContract } = useScaffoldContract({
    contractName: "StormBitLending",
  });

  const { data: SimpleAgreementContract } = useScaffoldContract({
    contractName: "SimpleAgreement",
  });

  return (
    <div className="container-modalPay">
      <div className="content-modalPay">
        <div className="flex justify-between">
          <h3 className="text-2xl font-bold">Payment</h3>
          <span onClick={() => setModalPay()} className="cursor-pointer">
            X
          </span>
        </div>
        <div className="flex flex-col items-center justify-center gap-4 my-9">
          <span className="text-[#4A5056]">Next payment</span>
          <span className="text-3xl font-bold text-[#4A5056]">1000 USDC</span>
        </div>
        <Button size="large" onClick={() => setModalPay()}>
          Pay
        </Button>
      </div>
    </div>
  );
}

export default ModalPay;
