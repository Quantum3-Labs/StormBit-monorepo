"use client";

import Link from "next/link";
import Button from "~~/components/Button/Button";

function Page() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-[#070817] w-screen">
      <div className="w-[900px] rounded-[5px] bg-[#16182E] text-white p-16 flex flex-col gap-4">
        <h1 className="text-4xl font-bold">Create your Account</h1>
        <div>
          <span>Already have an account? </span>
          <Link href="/login" className="text-[#9135F5]">
            Login here
          </Link>
        </div>
        <div className="flex flex-col">
          <span className="mb-2">Stormbit ID</span>
          <div className="border border-solid border-[#374B6D] rounded-[7px] w-[760px] flex justify-between h-[47px] items-center">
            <input type="text" className="bg-transparent border-none focus:outline-none w-[680px] px-4"></input>
            <span className=" border-s border-[#374B6D] px-4">.stormbit</span>
          </div>
          <Button>Register</Button>
        </div>
      </div>
    </div>
  );
}

export default Page;
