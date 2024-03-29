import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AiOutlineClose } from "react-icons/ai";

interface Option {
  name: string;
  icon: string;
}
function SelectDestination() {
  const options: Option[] = [
    {
      name: "Avalanche",
      icon: "/avalanche.png",
    },
    {
      name: "Arbitrum",
      icon: "/arbitrum.png",
    },
    {
      name: "Ethereum",
      icon: "/eth1.png",
    },
    {
      name: "Optimism",
      icon: "/op.png",
    },
    {
      name: "Starknet",
      icon: "/starknet.png",
    },
  ];
  // const options = ["Avalanche", "Arbitrum", "Ethereum", "Optimism", "Starknet"];
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef}>
      <button
        className="inline-flex items-center px-4 py-2 font-semibold text-white bg-[#19192B] rounded border border-[#374B6D]"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption ? selectedOption.name : "Select destination"}
        <svg
          className={`fill-current h-4 w-4 ml-2 ${isOpen ? "transform rotate-180" : ""}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path fillRule="evenodd" d="M10 12l-6-6 1.5-1.5L10 9.086l4.5-4.5L16 6l-6 6z"></path>
        </svg>
      </button>
      {isOpen && (
        <div className="absolute flex flex-col gap-6 top-0 left-0 w-full p-8 text-2xl text-white bg-[#19192B] rounded-[15px] rounded-tr shadow-lg ">
          <div className="flex justify-between">
            <span>Destination</span>
            <AiOutlineClose onClick={() => setIsOpen(false)} className="cursor-pointer" />
          </div>
          <ul className="flex flex-col gap-5">
            {options.map((option, index) => (
              <li
                key={index}
                className="px-4 py-8 cursor-pointer  border border-[#374B6D] rounded-[18px] flex gap-4 items-center"
                onClick={() => handleOptionClick(option)}
              >
                <Image src={option.icon} alt={option.name} width={50} height={50} className="rounded-full"></Image>
                {option.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SelectDestination;
