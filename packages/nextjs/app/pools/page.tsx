"use client";

import { useState } from "react";
import type { NextPage } from "next";
import { FiSearch } from "react-icons/fi";
import Button from "~~/components/Button/Button";
import PoolContent from "~~/components/PoolContent/PoolContent";
import CreationModal from "~~/components/PoolCreationModal/CreationModal";

const BlockExplorer: NextPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const data = [
    {
      name: "Total Supply",
      value: "$19.87M",
      border: "",
    },
    {
      name: "Total Borrow",
      value: "$1.31M",
      border: "1px",
    },
    {
      name: "Available Liquidity",
      value: "$18.55M",
      border: "1px",
    },
    {
      name: "Total Agreements",
      value: "$1.97M",
      border: "1px",
    },
  ];

  return (
    <>
      <div className="flex flex-col gap-6 bg-[#070817] w-screen p-10">
        <div className="flex justify-end">
          <div className="flex items-center justify-center gap-2">
            <div className="flex rounded-[5px] border border-solid border-[#A8B1C8] px-4 justify-center items-center">
              <span className="text-white pr-2 border-e border-[#3A3B4B]">%</span>
              <input
                placeholder="Search pool Usage"
                className="px-4 py-2 bg-transparent border-none focus:outline-none"
              ></input>
              <FiSearch></FiSearch>
            </div>
            <Button
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              Create Pool
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-24">
          <div className="flex text-[#A8B1C8]  justify-center items-center container-total max-w-fit">
            {data.map((element, index) => (
              <>
                <div
                  key={index}
                  className="flex flex-col gap-2 my-9 border-[#374B6D] px-24"
                  style={{ borderInlineStartWidth: element.border }}
                >
                  <span className="text-2xl">{element.name}</span>
                  <span className="text-white text-[32px]">{element.value}</span>
                </div>
              </>
            ))}
          </div>
          <PoolContent></PoolContent>
        </div>
        {isModalOpen && <CreationModal setIsModalOpen={() => setIsModalOpen(false)}></CreationModal>}
      </div>
    </>
  );
};

export default BlockExplorer;
