export interface Data {
  view: number;
  name: string;
}

type DataSetType = {
  Today: Data[];
  Yesterday: Data[];
  Last_7_days: Data[];
  Last_14_days: Data[];
  Last_30_days: Data[];
  Last_90_days: Data[];
};

const data_1: Data[] = [
  {
    view: 1000,
    name: "Jan",
  },
  {
    view: 1200,
    name: "Fab",
  },
  {
    view: 1500,
    name: "March",
  },
  {
    view: 1780,
    name: "April",
  },
  {
    view: 1000,
    name: "May",
  },
  {
    view: 1990,
    name: "June",
  },
  {
    view: 2190,
    name: "July",
  },
  {
    view: 2490,
    name: "Aug",
  },
  {
    view: 2200,
    name: "Sept",
  },
  {
    view: 2300,
    name: "Oct",
  },
  {
    view: 2500,
    name: "Nov",
  },
  {
    view: 2380,
    name: "Dec",
  },
];

const data_2: Data[] = [
  {
    view: 100,
    name: "Jan",
  },
  {
    view: 200,
    name: "Fab",
  },
  {
    view: 150,
    name: "March",
  },
  {
    view: 1280,
    name: "April",
  },
  {
    view: 900,
    name: "May",
  },
  {
    view: 200,
    name: "June",
  },
  {
    view: 1190,
    name: "July",
  },
  {
    view: 490,
    name: "Aug",
  },
  {
    view: 2000,
    name: "Sept",
  },
  {
    view: 2300,
    name: "Oct",
  },
  {
    view: 2500,
    name: "Nov",
  },
  {
    view: 2380,
    name: "Dec",
  },
];

const dataSet: DataSetType = {
  Today: data_1,
  Yesterday: data_2,
  Last_7_days: data_1,
  Last_14_days: data_2,
  Last_30_days: data_1,
  Last_90_days: data_2,
};

export default dataSet;
