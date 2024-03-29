import React, { ReactNode, useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu } from "antd";
import { createUseStyles } from "react-jss";

export interface Category {
  key: number;
  content: ReactNode;
  value: string;
}
/**
 * Add your all dropdown categories here with unique key
 */
const dropdownCategories: Category[] = [
  {
    key: 0,
    content: "Today",
    value: "Today",
  },
  {
    key: 1,
    content: "Yesterday",
    value: "Yesterday",
  },
  {
    key: 2,
    content: "Last 7 days",
    value: "Last_7_days",
  },
  {
    key: 3,
    content: "Last 14 days",
    value: "Last_14_days",
  },
  {
    key: 4,
    content: "Last 30 days",
    value: "Last_30_days",
  },
  {
    key: 5,
    content: "Last 90 days",
    value: "Last_90_days",
  },
];

/**
 * Stylesheet using react-jss
 */
const useStyles = createUseStyles(() => ({
  container: {
    display: "flex",
    justifyContent: "flex-end",
    "& button": {
      color: "#FFFF",
      width: 150,
      border: "none",
    },
  },
}));
interface DropdownSelectorProps {
  fetchCustomData: (key: Category) => void;
}
export const DropdownSelector: React.FC<DropdownSelectorProps> = ({ fetchCustomData }) => {
  const classes = useStyles();

  // This state is used to track selected value from dropdown
  const [activeTimeFrame, setActiveTimeFrame] = useState(2);

  const handleDataFetching = (key: number) => {
    setActiveTimeFrame(key);
    /**
     * This function invokes when user selectes an item from dropdown,
     * you can call a function to fetch data with key or value
     * @here we called @function fetchCustomData(value)
     */
    fetchCustomData(dropdownCategories[key]);
  };

  return (
    <div className={classes.container}>
      <Dropdown
        overlay={
          <Menu>
            {dropdownCategories.map((item: Category) => {
              return (
                <Menu.Item onClick={() => handleDataFetching(item.key)} key={item.key}>
                  {item.content}
                </Menu.Item>
              );
            })}
          </Menu>
        }
        className="bg-none"
      >
        <Button>
          {dropdownCategories[activeTimeFrame].content} <DownOutlined />
        </Button>
      </Dropdown>
    </div>
  );
};

export default DropdownSelector;
