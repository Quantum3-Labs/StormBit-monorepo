"use client";

import React from "react";
import { useState } from "react";
import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";

export default function App() {
  const [page, setPage] = useState(1);

  const allDataArray = [
    { name: "Luke Skywalker", height: "172", mass: "77", birth_year: "19BBY" },
    { name: "Darth Vader", height: "202", mass: "136", birth_year: "41.9BBY" },
    { name: "Leia Organa", height: "150", mass: "49", birth_year: "19BBY" },
    { name: "Han Solo", height: "180", mass: "80", birth_year: "29BBY" },
    { name: "Han Solo", height: "180", mass: "80", birth_year: "29BBY" },
    { name: "Han Solo", height: "180", mass: "80", birth_year: "29BBY" },
    { name: "Han Solo", height: "180", mass: "80", birth_year: "29BBY" },
    { name: "Han Solo", height: "180", mass: "80", birth_year: "29BBY" },
    { name: "Han Solo", height: "180", mass: "80", birth_year: "29BBY" },
    { name: "Han Solo", height: "180", mass: "80", birth_year: "29BBY" },
    { name: "Han Solo", height: "180", mass: "80", birth_year: "29BBY" },
    { name: "Han Solo", height: "180", mass: "80", birth_year: "29BBY" },
    { name: "Han Solo", height: "180", mass: "80", birth_year: "29BBY" },
    { name: "Han Solo", height: "180", mass: "80", birth_year: "29BBY" },
    { name: "Han Solo", height: "180", mass: "80", birth_year: "29BBY" },
  ];

  const perPage = 4;
  const visibleDataArray = allDataArray.slice(0, perPage * page);

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const hasMore = perPage * page < allDataArray.length;

  return (
    <Table
      isHeaderSticky
      aria-label="Example table with client side sorting"
      bottomContent={
        hasMore ? (
          <div className="flex justify-center w-full">
            <Button variant="flat" onPress={handleLoadMore}>
              Load More
            </Button>
          </div>
        ) : null
      }
      classNames={{
        base: "max-h-[520px] overflow-scroll",
        table: "min-h-[420px]",
      }}
    >
      <TableHeader>
        <TableColumn key="name">Name</TableColumn>
        <TableColumn key="height">Height</TableColumn>
        <TableColumn key="mass">Mass</TableColumn>
        <TableColumn key="birth_year">Birth year</TableColumn>
      </TableHeader>
      <TableBody>
        {visibleDataArray.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.height}</TableCell>
            <TableCell>{item.mass}</TableCell>
            <TableCell>{item.birth_year}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
