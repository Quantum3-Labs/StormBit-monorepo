import React from "react";
import { useState } from "react";
import Link from "next/link";
import "./poolContents.css";
import { Button, Pagination } from "@nextui-org/react";
import { CircularProgress } from "@nextui-org/react";
import { data } from "~~/data/data";

export default function PoolContent() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage;

  const currentPageData = data.slice(startIndex, endIndex);
  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <div className="flex flex-wrap items-center justify-center gap-16">
        {currentPageData.map((element, index) => (
          <>
            <Link href="/poolAdreess" key={index} className="w-[470px] flex flex-col gap-8 container-pool text-white">
              <CircularProgress
                strokeWidth={1}
                label="usage"
                size="lg"
                value={element.usage}
                color="secondary"
                formatOptions={{ style: "percent", unit: "percent" }}
                showValueLabel={true}
                classNames={{
                  base: "base-classes",
                  label: "label-classes",
                  value: "value-classes",
                  svg: "svg-classes",
                  track: "track-classes",
                  indicator: "indicator-classes",
                }}
              />

              <span className="text-2xl pl-14">{element.name}</span>
              <div className="flex items-center justify-center">
                <div className="flex flex-col items-center justify-center gap-6 py-3 pr-20 border-e">
                  <span className="text-lg">Supply APY</span>
                  <span className="text-4xl">{element.supply}%</span>
                </div>
                <div className="flex flex-col items-center justify-center gap-6 py-3 pl-20">
                  <span className="text-lg">Borrow APY</span>
                  <span className="text-4xl">{element.borrow}%</span>
                </div>
              </div>
            </Link>
          </>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 text-lg text-white">
        <Button
          size="md"
          variant="flat"
          color="secondary"
          onPress={() => setCurrentPage(prev => (prev > 1 ? prev - 1 : prev))}
        >
          Prev
        </Button>
        <Pagination
          total={Math.ceil(data.length / itemsPerPage)}
          color="secondary"
          page={currentPage}
          onChange={setCurrentPage}
          classNames={{
            base: "",
            prev: "prev-classes",
            item: "item-classes bg-transparent text-white border border-[#BCBCBC] w-[64px] h-[64px] rounded-[6px] gap",
            next: "next-classes",
            cursor: "cursor-classes bg-[#9135F5] w-[64px] h-[64px] rounded-[6px]",
            forwardIcon: "forward-icon-classes",
            ellipsis: "ellipsis-classes",
            chevronNext: "chevron-next-classes",
            wrapper: "gap-4;",
          }}
        />
        <Button
          size="md"
          variant="flat"
          color="secondary"
          onPress={() => setCurrentPage(prev => (prev < Math.ceil(data.length / itemsPerPage) ? prev + 1 : prev))}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
