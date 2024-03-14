"use client"
import { useState } from "react";
import MyGraph from "./Graph";
import dataSet from "./data";
import DropdownSelector from "./menugraph";
// import "antd/dist/antd.css";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles(() => ({
  container: {
    color: "#fff",
    padding: "1rem",
    transition: "0.3s ease-in-out",
    width: "1200px",
    height: "400px",
    display: "flex",
    flexDirection: "column",
    position: "relative",
  },
}));

function Analytics() {
  const classes = useStyles();
  const [data, setData] = useState(dataSet.Today);

  const fetchCustomData = (key: string | number) => {
    setData(dataSet[key]);
  };

  return (
    <div className={classes.container}>
      <DropdownSelector fetchCustomData={fetchCustomData} />
      <MyGraph data={data} />
    </div>
  );
}

export default Analytics;
