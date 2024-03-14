import { JSXElementConstructor, Key, PromiseLikeOfReactNode, ReactElement, ReactNode, ReactPortal } from "react";
import { Menu } from "antd";

export const menu = (
  handleDataFetching: { (key: any, value: any): void; (arg0: string, arg1: any): void },
  dropdownCategories: any[],
  selectedItem: { key: any; content?: string; value?: string },
) => {
  return (
    <Menu>
      {dropdownCategories.map(
        (item: {
          key: Key | null | undefined;
          value: any;
          content:
            | string
            | number
            | boolean
            | ReactElement<any, string | JSXElementConstructor<any>>
            | Iterable<ReactNode>
            | ReactPortal
            | PromiseLikeOfReactNode
            | null
            | undefined;
        }) => {
          return (
            /**
             * Dont include the selected item in the list
             */
            selectedItem.key != item.key && (
              <Menu.Item onClick={e => handleDataFetching(e.key, item.value)} key={item.key}>
                {item.content}
              </Menu.Item>
            )
          );
        },
      )}
    </Menu>
  );
};
