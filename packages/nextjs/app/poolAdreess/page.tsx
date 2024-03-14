"use client";

import { useState } from "react";
import Image from "next/image";
import { CiCalendar } from "react-icons/ci";
import Button from "~~/components/Button/Button";
import TableAction from "~~/components/TableActions/TableAction";

function Page() {
  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = button => {
    setActiveButton(button);
  };
  return (
    <section className="bg-[#070817] w-screen p-10">
      <div className="flex gap-8">
        <Image src="/profile.png" alt="profile" width={166} height={166}></Image>
        <div className="flex flex-col justify-center">
          <h1 className="text-5xl font-bold text-white">EduFunds Pool</h1>
          <div className="text-[#374B6D] flex items-center">
            <CiCalendar />
            <span> Created November 2023</span>
          </div>
        </div>
      </div>
      <div className="flex gap-12">
        <div>
          <Image src="/graph.png" alt="graph" width={1135} height={614}></Image>
          <div className="flex gap-11">
            <div className="container-total w-[347px] text-white flex flex-col py-8 px-9 gap-2">
              <span className="text-xl">TVL</span>
              <span className="text-2xl font-bold">$32.3706</span>
            </div>
            <div className="container-total w-[347px] text-white flex flex-col py-8 px-9 gap-2">
              <span className="text-xl">APY</span>
              <span className="text-2xl font-bold">$32.3706</span>
            </div>
            <div className="container-total w-[347px] text-white flex flex-col py-8 px-9 gap-2">
              <span className="text-xl">Pool Usage</span>
              <span className="text-2xl font-bold">15%</span>
            </div>
          </div>

          <h3 className="text-white">Description</h3>
          <p className="text-white">
            EduFunds Pool is a pool for students who wants to travel to web3 events and borrow money. They can then
            repay the amounts borrowed after participating to hackathons or any other events.
          </p>

          <h3 className="text-white">Actions</h3>
          <TableAction></TableAction>
        </div>
        <div>
          <div className="flex text-white">
            <button
              className={`py-10 text-2xl container-total w-[300px] ${
                activeButton === "deposit" ? "bg-indigo-900" : ""
              }`}
              onClick={() => handleButtonClick("deposit")}
            >
              Deposit
            </button>
            <button
              className={`py-10 text-2xl container-total w-[300px] ${
                activeButton === "withdraw" ? "bg-indigo-900" : ""
              }`}
              onClick={() => handleButtonClick("withdraw")}
            >
              Withdraw
            </button>
          </div>
          <div className="w-[595px] h-[447px] flex flex-col justify-between container-total my-16 text-white px-8 py-6">
            <span className="text-2xl">Borrow</span>
            <Button>Request Loan</Button>
          </div>
          <div className="container-total w-[595px] h-[447px] px-8 py-6 my-16 text-white">
            <span className="text-2xl">Stakers</span>
          </div>
          <div className="container-total w-[595px] h-[254px] px-8 py-6 my-16 text-white">
          <span className="text-2xl">Group Messages</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Page;
