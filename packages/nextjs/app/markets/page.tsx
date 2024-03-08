"use client";

import { useState } from "react";
import Image from "next/image";
import type { NextPage } from "next";
import Button from "~~/components/Button/Button";
import CreationModal from "~~/components/PoolCreationModal/CreationModal";
import Table from "~~/components/Table/table";

const BlockExplorer: NextPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-6 rounded-[5px] w-[1800px] min-h-[700px] bg-white p-10 mb-[50px] ">
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <div>
              <Image src="/home.png" alt="home" width={24} height={24} className="w-[24px] h-[24px]"></Image>
            </div>
            <span className="text-2xl text-[#4A5056] font-bold">/Markets</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="flex rounded-[5px] border border-solid border-[#EAEBEF] px-4 justify-center items-center">
              <div>
                <Image src="/search.png" alt="search" width={20} height={20} className="w-[20px] h-[20px]"></Image>
              </div>
              <input placeholder="search pool name" className="px-4 py-2 border-none focus:outline-none"></input>
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
        <div className="flex justify-center">
          <Table></Table>
        </div>
        {isModalOpen && <CreationModal setIsModalOpen={() => setIsModalOpen(false)}></CreationModal>}
      </div>
    </>
  );
};

export default BlockExplorer;
