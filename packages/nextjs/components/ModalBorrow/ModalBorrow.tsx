import React, { ChangeEvent, useState } from "react";
import Button from "../Button/Button";
import "./ModalBorrow.css";
import Preview from "~~/components/BorrowInput/Preview";
import CustomCheckbox from "~~/components/CustomCheckbox/CustomCheckbox";
import CustomSelect from "~~/components/CustomSelect/CustomSelect";
import { options, optionsPayment, optionsType } from "~~/data/data";

interface ModalProps {
  setIsModalOpen: () => void;
}

const ModalBorrow: React.FC<ModalProps> = ({ setIsModalOpen }) => {
  const [selectedView, setSelectedView] = useState("borrow");
  const [selectedPayment, setSelectedPayment] = useState("month");
  const [selectedType, setSelectedType] = useState("Select type");
  const [selectedCheckbox, setSelectedCheckbox] = useState("");
  const [reason, setReason] = useState("");
  const hasLoans = true;

  const handleViewChange = (value: string) => {
    setSelectedView(value);
  };

  const handleCheckboxChange = (value: string) => {
    setSelectedCheckbox(value);
  };

  const handleReasonChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setReason(event.target.value);
  };
  const handlePayment = (value: string) => {
    setSelectedPayment(value);
  };
  const handleType = (value: string) => {
    setSelectedType(value);
  };

  const onSubmit = () => {
    if (!hasLoans) {
      setSelectedView("borrow");
    } else {
      setIsModalOpen();
    }
  };

  return (
    <div className="container-modal">
      <div className="content-modal">
        <div className="flex gap-20 border-b-1 border-[#374B6D] pb-6 justify-between">
          <div>
            <span>{selectedView === "borrow" ? "Borrow" : "Repay"}</span>
          </div>
          <div className="flex gap-4 max-w-[180px] w-full text-white">
            <CustomSelect options={options} defaultValue="borrow" onChange={handleViewChange} />
          </div>
        </div>
        <div className="content">
          {hasLoans || selectedView == "borrow" ? (
            <div className="mt-8">
              <Preview />
              <div className="flex flex-col flex-1 gap-4 mt-5 ">
                <label htmlFor="campo3">Payment Schedule</label>
                <div className="flex items-center justify-between border w-full p-2 border-[#374B6D] rounded-[14px] bg-transparent">
                  <div className="flex justify-center items-center">
                    <input
                      type="text"
                      id="campo1"
                      name="campo1"
                      className="bg-transparent border-none p-2 focus:outline-none w-full"
                      autoComplete="off"
                      maxLength={10}
                    />
                  </div>
                  <CustomSelect
                    options={optionsPayment}
                    placeholder={selectedPayment}
                    onChange={handlePayment}
                    showBorder={false}
                  />
                </div>
              </div>
              <div className="flex flex-col flex-1 gap-4 mt-5">
                <label htmlFor="campo3">Penalty</label>
                <div className="flex items-center justify-between border w-full p-2 border-[#374B6D] rounded-[14px] bg-transparent">
                  <input
                    type="text"
                    id="campo1"
                    name="campo1"
                    className="w-full p-2 bg-transparent border-none focus:outline-none "
                    autoComplete="off"
                    maxLength={10}
                  />
                  <span className="px-[5px]">%</span>
                </div>
              </div>
              <div className="flex flex-col gap-4 mt-5">
                <span>Agreement supported</span>
                <div className="flex gap-16">
                  <CustomCheckbox
                    isSelected={selectedCheckbox === "Simple"}
                    isDisabled={selectedCheckbox == "Simple"}
                    onClick={() => handleCheckboxChange("Simple")}
                  >
                    Simple Agreement
                  </CustomCheckbox>
                  <CustomCheckbox
                    isSelected={selectedCheckbox === "ERC721"}
                    isDisabled={selectedCheckbox == "ERC721"}
                    onClick={() => handleCheckboxChange("ERC721")}
                  >
                    ERC721 Agreement
                  </CustomCheckbox>
                  <CustomCheckbox
                    isSelected={selectedCheckbox === "ERC20"}
                    isDisabled={selectedCheckbox == "ERC720"}
                    onClick={() => handleCheckboxChange("ERC20")}
                  >
                    ERC20 Agreement
                  </CustomCheckbox>
                </div>
              </div>

              {selectedView === "borrow" && selectedCheckbox === "Simple" && (
                <>
                  <div className="flex flex-col flex-1 gap-4 mt-5">
                    <label htmlFor="TypeBorrow">Type</label>
                    <div className="flex items-center justify-between w-full border border-[#374B6D] rounded-[14px] bg-transparent p-2">
                      <span className="text-[#4A5056]">{selectedType}</span>
                      <CustomSelect options={optionsType} onChange={handleType} showBorder={false} />
                    </div>
                  </div>
                  <div className="flex flex-col flex-1 gap-4 mt-5">
                    <label htmlFor="Reason">Reason</label>
                    <div className="flex items-center ">
                      <textarea
                        className="w-full p-2 bg-transparent border border-[#374B6D] rounded-[14px] focus:outline-none placeholder-[#4A5056] "
                        placeholder="Write Reason"
                        value={reason}
                        onChange={handleReasonChange}
                        autoComplete="off"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div> You haven’t borrowed anything yet.</div>
          )}
        </div>
        <Button onClick={onSubmit}>{selectedView === "borrow" ? "Borrow" : "Repay"}</Button>
        {selectedView === "repay" && (
          <div className="flex justify-between">
            <span>DAI Debt</span>
            <span>0 DAI</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalBorrow;
