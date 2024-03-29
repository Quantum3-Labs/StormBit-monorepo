import React from "react";
import { tokens } from "./data";
import "./selectToken.css";
import { Avatar, Select, SelectItem, SelectedItems } from "@nextui-org/react";

type Token = {
  id: number;
  name: string;
  avatar: string;
  description: string;
};

export default function SelectToken() {
  return (
    <Select
      items={tokens}
      label=""
      placeholder="Select Token"
      labelPlacement="outside"
      className="text-white border border-[#374B6D] rounded-[14px]"
      classNames={{
        description: "descriptiom",
        errorMessage: "errorMesage",
        label: "label text-white",
        mainWrapper: "mainWrapper",
        trigger: "trigger bg-transparent py-8 ",
        innerWrapper: "inner text-white",
        selectorIcon: "slectorIcon",
        spinner: "spinner",
        listboxWrapper: "listboxWrapper",
        listbox: "flex border-red-700",
        popoverContent: "bg-[#17172B] border border-[#374B6D]",
      }}
      renderValue={(items: SelectedItems<Token>) => {
        return items.map(item => (
          <div key={item.key} className="flex items-center gap-2">
            <Avatar alt={item.data?.name} className="flex-shrink-0" size="sm" src={item.data?.avatar} />
            <div className="flex flex-col">
              <span className="text-white">{item.data?.name}</span>
            </div>
          </div>
        ));
      }}
    >
      {user => (
        <SelectItem
          key={user.id}
          textValue={user.name}
          className="bg-transparent base"
          classNames={{
            base: "text-white",
            selectedIcon: "",
            shortcut: "shortcut-classes",
          }}
        >
          <div className="flex items-center gap-2">
            <Avatar alt={user.name} className="flex-shrink-0" size="sm" src={user.avatar} />
            <div className="flex flex-col">
              <span className="text-small">{user.name}</span>
              <span className="text-white text-tiny">{user.description}</span>
            </div>
          </div>
        </SelectItem>
      )}
    </Select>
  );
}
