import React, { useState } from "react";
import { menu } from "./items";
import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown } from "antd";
import { createUseStyles } from "react-jss";

/**
 * Add your all dropdown categories here with unique key
 */
const dropdownCategories = [
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
    position: "absolute",
    right: 10,
    "& button": {
      color: "black",
      border: "1.5px solid #EDEEF1",
      width: 150,
      borderRadius: "15px",
    },
  },
}));

export const DropdownSelector = ({ fetchCustomData }) => {
  const classes = useStyles();

  // This state is used to track selected value from dropdown
  const [activeTimeFrame, setActiveTimeFrame] = useState(2);

  const handleDataFetching = (key, value) => {
    setActiveTimeFrame(key);
    /**
     * This function invokes when user selectes an item from dropdown,
     * you can call a function to fetch data with key or value
     * @here we called @function fetchCustomData(value)
     */
    fetchCustomData(value);
  };

  return (
    <div className={classes.container}>
      <Dropdown overlay={menu(handleDataFetching, dropdownCategories, dropdownCategories[activeTimeFrame])}>
        <Button>
          {dropdownCategories[activeTimeFrame].content} <DownOutlined />
        </Button>
      </Dropdown>
    </div>
  );
};

export default DropdownSelector;
