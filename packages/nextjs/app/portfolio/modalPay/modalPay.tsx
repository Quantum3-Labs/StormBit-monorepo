import "./modalPay.css";
import Button from "~~/components/Button/Button";

interface ModalProps {
  setModalPay: () => void;
}

function ModalPay({ setModalPay }: ModalProps) {
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
