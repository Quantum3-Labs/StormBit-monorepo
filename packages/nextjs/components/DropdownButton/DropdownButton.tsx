import { useState } from "react";
import Image from "next/image";

interface DropdownButtonProps {
  selectedToken: string;
  setSelectedToken: (token: string) => void;
}

function DropdownButton({ selectedToken, setSelectedToken }: DropdownButtonProps) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = event => {
    event.preventDefault();
    setDropdownOpen(!isDropdownOpen);
  };

  const handleTokenSelection = (token: string) => event => {
    event.preventDefault();
    setSelectedToken(token);
    setDropdownOpen(false);
  };

  const getIcon = (token: string) => {
    switch (token) {
      case "ETH":
        return "/logo-eth.png";
      case "BTC":
        return "/btc-logo.png";
      case "DAI":
        return "/dai.png";
      default:
        return "";
    }
  };

  return (
    <div className="relative">
      <button onClick={toggleDropdown} className="flex items-center justify-center dropdown-trigger gap-[5px]">
        {selectedToken && <Image src={getIcon(selectedToken)} alt={`icon ${selectedToken}`} width={17} height={17} />}
        {selectedToken}
        <span className="arrow-down">&#9662;</span>
      </button>
      {isDropdownOpen && (
        <ul className="dropdown-menu absolute inset-x-0 top-full left-0 z-50">
          {selectedToken !== "ETH" && (
            <li className="flex gap-[5px] items-center">
              <Image src="/logo-eth.png" alt="icon eth" width={17} height={17} />
              <button onClick={handleTokenSelection("ETH")}>ETH</button>
            </li>
          )}
          {selectedToken !== "BTC" && (
            <li className="flex gap-[5px] items-center">
              <Image src="/btc-logo.png" alt="icon btc" width={18} height={18} />
              <button onClick={handleTokenSelection("BTC")}>BTC</button>
            </li>
          )}
          {selectedToken !== "DAI" && (
            <li className="flex gap-[5px] items-center">
              <Image src="/dai.png" alt="icon dai" width={17} height={17} />
              <button onClick={handleTokenSelection("DAI")}>DAI</button>
            </li>
          )}
        </ul>
      )}
    </div>
  );
}

export default DropdownButton;
