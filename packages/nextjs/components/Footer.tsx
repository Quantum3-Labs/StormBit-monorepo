import React from "react";

export const Footer = () => {
  return (
    <div className="flex gap-14 min-h-0 py-6 px-14 lg:mb-0 bg-black text-[#F1F3F4]">
      <div className="flex flex-col items-center justify-center">
        <span className="text-2xl font-bold">StormBit</span>
        <span className="text-[13px]">2024 @StormBit</span>
      </div>
      <div>
        <p className="text-[13px]">
          To the maximum extent permitted by applicable law, in no event shall the Company or its suppliers be liable
          for any special, incidental, indirect, or consequential damages whatsoever (including, but not limited to,
          damages for loss of profits, loss of data or other information), even if the Company or any supplier has been
          advised of the possibility of such damages and even if the remedy fails of its essential purpose.
        </p>
      </div>
    </div>
  );
};
