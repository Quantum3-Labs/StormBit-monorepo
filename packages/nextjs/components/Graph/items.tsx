import { ReactNode } from "react";
import { Menu } from "antd";

export const menu = (
  handleDataFetching: (key: number) => void,
  dropdownCategories: any[],
  selectedItem: { key: number; content?: string; value?: string },
) => {
  return (
    <Menu>
      {dropdownCategories.map((item: { key: number; value: any; content: ReactNode }) => {
        return (
          /**
           * Dont include the selected item in the list
           */
          selectedItem.key != item.key && (
            <Menu.Item onClick={() => handleDataFetching(item.key)} key={item.key}>
              {item.content}
            </Menu.Item>
          )
        );
      })}
    </Menu>
  );
};
