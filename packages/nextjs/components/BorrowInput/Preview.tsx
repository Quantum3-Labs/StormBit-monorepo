import { useState } from "react";
import Image from "next/image";

interface PreviewProps {
  placeholder?: string;
}

const Preview: React.FC<PreviewProps> = ({ placeholder = "0" }) => {
  const [selectedButton, setSelectedButton] = useState<string | null>(null);

  const handleButtonClick = (buttonType: string) => {
    setSelectedButton(buttonType);
  };

  return (
    <div className="border border-[#374B6D] rounded-md flex justify-between">
      <div className="flex flex-col justify-center gap-4 p-[10px]">
        <input type="text" className="bg-transparent border-none focus:outline-none" placeholder={placeholder} />
        <span>~ $0.00</span>
      </div>
      <div className="flex flex-col p-[10px] gap-[10px]">
        <div className="flex gap-[5px]">
          <Image src="/USDT.png" alt="icon" width={20} height={20} />
          <span>USDT</span>
        </div>
        <div className="gap-[5px] flex">
          <button
            className={`bg-[#25253E] px-[8px] py-[5px] rounded-md ${selectedButton === "half" ? "bg-[#9135F5]" : ""}`}
            onClick={() => handleButtonClick("half")}
          >
            Half
          </button>
          <button
            className={`bg-[#25253E] px-[8px] py-[5px] rounded-md ${selectedButton === "max" ? "bg-[#9135F5]" : ""}`}
            onClick={() => handleButtonClick("max")}
          >
            Max
          </button>
        </div>
      </div>
    </div>
  );
};

export default Preview;
