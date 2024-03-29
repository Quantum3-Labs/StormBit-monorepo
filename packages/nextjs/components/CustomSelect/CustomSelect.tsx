import React, { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  defaultValue?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  showBorder?: boolean;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  defaultValue,
  onChange,
  placeholder,
  showBorder = true,
}) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectChange = (value: string) => {
    setSelectedValue(value);
    onChange(value);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        className={`inline-flex justify-center w-full rounded-md focus:outline-none ${
          showBorder ? "border border-[#374B6D]" : ""
        } bg-[#17172B] px-4 py-2 text-sm font-medium text-white hover:bg-[#25253E]  focus:ring-[#374B6D]`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedValue ? options?.find(option => option.value === selectedValue)?.label : placeholder}
        <ChevronDownIcon className={`-mr-1 ml-2 h-5 w-5 ${isOpen ? "transform rotate-180" : ""}`} aria-hidden="true" />
      </button>
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-[130px] border border-[#374B6D] rounded-md shadow-lg bg-[#17172B] ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
          {options.map(option => (
            <button
              key={option.value}
              className={`block w-full px-4 py-2 text-sm text-white hover:bg-[#25253E] focus:outline-none ${
                selectedValue === option.value ? "font-medium" : ""
              }`}
              onClick={() => handleSelectChange(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
