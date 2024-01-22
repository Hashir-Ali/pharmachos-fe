"use client";
import {
  TableContainer,
  TableBody,
  TableRow,
  Table,
  TableHead,
  TableCell,
  Alert,
} from "@mui/material";
import { useState } from "react";
import { MonthIndexToLabelAbbr, random } from "@/utility/mockDataGenerator";
import { barChartOptions } from "@/utility/charts";
import dynamic from "next/dynamic";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });
import { ArrowDownward, ArrowDropDown, ArrowUpward } from "@mui/icons-material";
import { IDistributor, IDrugData, IStock } from "@/types";
import dayjs from "dayjs";

const TableCells = [
  { key: "issue_type", label: "Issue Type" },
  { key: "description", label: "Description" },
  { key: "updated_by", label: "Updated By" },
  { key: "progress", label: "Progress" },
];
const excludedCols = ["description"];

const Issue_Type: Record<string, string> = {
  critical: "Rule needs attention",
  warning: "Rule may need some attention",
  resolved: "Resolved",
};

const tableData = [
  {
    issue_type: "critical",
    description:
      "We suggest you increase your stock holding for this drug. Reasons: This drug has a high variability in throughput Generally has ...",
    updated_by: {
      userName: "Sherry Malik",
      img: "https://randomuser.me/api/portraits/thumb/women/68.jpg",
    },
    progress: "In progress",
  },
  {
    issue_type: "critical",
    description:
      "We suggest you increase your stock holding for this drug. Reasons: This drug has a high variability in throughput Generally has ...",
    updated_by: {
      userName: "Jennifer Ruth",
      img: "https://randomuser.me/api/portraits/thumb/men/37.jpg",
    },
    progress: "In progress",
  },
];

export default function DrugOverview({
  stock,
  distributors,
  location,
  containerSize,
  dosage,
  dosageUnit,
  passThrough,
  monthlyStockLevels,
}: IDrugData) {
  const [sortCol, setSortCol] = useState({ sortOnField: "", orderBy: "" });

  const onColClick = (key: string) => {
    if (sortCol.sortOnField === key) {
      setSortCol((state) => ({
        ...state,
        orderBy: state.orderBy === "asc" ? "desc" : "asc",
      }));
    } else {
      setSortCol({ sortOnField: key, orderBy: "asc" });
    }
  };

  const distributor = distributors[0];

  const passThroughData = [
    { name: "This month", value: passThrough?.thisMonth },
    { name: "Last month", value: passThrough?.lastMonth },
    { name: "Last 5 months", value: passThrough?.fiveMonths },
    { name: "Last 12 months", value: passThrough?.lastYear },
    { name: "All time", value: passThrough?.allTime },
  ];

  const doesPassThroughDataExists =
    passThrough && Object.entries(passThrough).length > 0;

  const monthlyStockData = Object.entries(monthlyStockLevels);

  const chartValues = monthlyStockData.map(([_, value]) => value);
  const chartSeries = { name: "Stock", data: chartValues };
  const chartOptions = {
    ...barChartOptions,
    xaxis: {
      ...barChartOptions.xaxis,
      categories: monthlyStockData.map(
        ([month]) => MonthIndexToLabelAbbr[Number(month)]
      ),
    },
  };
  return (
    <div className="mt-5">
      {doesPassThroughDataExists && (
        <div className=" bg-gray-50 p-5">
          <p className="text-primary-green font-semibold mb-3">Pass-through</p>
          <div className="grid xl:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-3">
            {passThroughData.map((item, index) => (
              <div
                key={`pass-${index}`}
                className="bg-white px-5 py-2 rounded-sm"
              >
                <h1 className="text-xl font-semibold">{item.value}</h1>
                <p className="text-gray-500">{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="grid xl:grid-cols-2 lg:grid-cols-1 gap-x-5">
        <div className=" bg-gray-50 p-5 mt-5">
          <p className="text-primary-green font-semibold mb-3 text-center">
            Stock levels
          </p>
          <div className="flex flex-row gap-x-3">
            <div className="basis-1/4 flex flex-col justify-between">
              <div className="bg-white flex items-center justify-center rounded-sm p-2">
                <p className="font-semibold text-center">Stock rules</p>
              </div>
              <div className="flex gap-x-3">
                <div className="w-1/2 flex flex-col justify-between gap-y-3">
                  <div className="bg-white flex items-center justify-center py-2 rounded-sm">
                    <p>Min</p>
                  </div>
                  <div className="bg-white flex items-center justify-center py-2 rounded-sm">
                    <p>{stock?.stockRuleMin}</p>
                  </div>
                </div>
                <div className="w-1/2 flex flex-col justify-between gap-y-3">
                  <div className="bg-white flex items-center justify-center py-2 rounded-sm">
                    <p>Max</p>
                  </div>
                  <div className="bg-white flex items-center justify-center py-2 rounded-sm">
                    <p>{stock?.stockRuleMax}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="basis-1/2 flex flex-col justify-between">
              <div className="bg-white flex items-center justify-center rounded-sm py-2">
                <p className="font-semibold">Cartons</p>
              </div>
              <div className="flex gap-x-3 mt-3">
                <div className="w-1/3 flex flex-col justify-between gap-y-3">
                  <div className="bg-white flex items-center justify-center rounded-sm py-2">
                    <p className="text-center">In stock</p>
                  </div>
                  <div className="bg-light-red flex items-center justify-center rounded-sm py-2">
                    <p>{stock?.currentStock}</p>
                  </div>
                </div>
                <div className="w-1/3 flex flex-col justify-between gap-y-3">
                  <div className="bg-white flex items-center justify-center rounded-sm py-2">
                    <p className="text-center">On order</p>
                  </div>
                  <div className="bg-gray-200 flex items-center justify-center rounded-sm py-2">
                    <p>{stock?.onOrder}</p>
                  </div>
                </div>
                <div className="w-1/3 flex flex-col justify-between gap-y-3">
                  <div className="bg-white flex items-center justify-center rounded-sm py-2">
                    <p className="text-center">New stock</p>
                  </div>
                  <div className="bg-light-green-1 flex items-center justify-center rounded-sm py-2">
                    <p>{stock?.currentStock}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="basis-1/4 flex flex-col justify-between">
              <div className="bg-white flex items-center justify-center rounded-sm p-2">
                <p className="font-semibold text-center">Loose tablets</p>
              </div>
              <div className="flex flex-col gap-y-3 w-full">
                <div className="bg-white py-2 rounded-sm text-center">
                  <p>In stock</p>
                </div>
                <div className="bg-white py-2 rounded-sm text-center">
                  <p>{stock?.LooseUnits}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" bg-gray-50 p-5 mt-5">
          <div className="flex justify-between border-b-[1px] border-slate-300 py-2">
            <p className="text-slate-600">Dose Unit</p>
            <p className="font-semibold">
              {dosage} {dosageUnit}
            </p>
          </div>
          <div className="flex justify-between border-b-[1px] border-slate-300 py-2">
            <p className="text-slate-600">Container size</p>
            <p className="font-semibold">{containerSize} tablet</p>
          </div>
          <div className="flex justify-between border-b-[1px] border-slate-300 py-2">
            <p className="text-slate-600">Location</p>
            <p className="font-semibold">{location}</p>
          </div>
        </div>
      </div>
      <div className="grid xl:grid-cols-2 lg:grid-cols-1 gap-x-5">
        <div className=" bg-gray-50 p-5 mt-5 overscroll-auto focus:overscroll-contain overflow-y-auto h-72">
          <div className="flex justify-between border-b-[1px] border-slate-300 py-2">
            <p className="text-primary-green font-semibold">Distributors</p>
            <p className="text-primary-green font-semibold">
              End date:{" "}
              {dayjs(distributor?.NHS_Contract_End_Date).format("DD/MM/YYYY")}
            </p>
          </div>
          {distributors.map((distributor, index) => (
            <div className="flex justify-between border-b-[1px] border-slate-300 py-2" key={`${index}${distributor?.name}`}>
              <p className="text-slate-600">{distributor.type}</p>
              <p className="font-semibold">{distributor?.name}</p>
            </div>
          ))}

          {/* <div className="flex justify-between border-b-[1px] border-slate-300 py-2">
            <p className="text-slate-600">Contracted</p>
            <p className="font-semibold">{distributor?.name}</p>
          </div> */}
          {/* <div className='flex justify-between border-b-[1px] border-slate-300 py-2'>
            <p className='text-slate-600'>Contracted</p>
            <p className='font-semibold'>Contracted ALLIANCE LTD</p>
          </div> */}
        </div>
        <div className=" bg-gray-50 p-5 mt-5">
          <div className="flex justify-between py-2">
            <p className="text-primary-green font-semibold">
              Monthly stock levels
            </p>
          </div>
          {monthlyStockData && monthlyStockData.length > 0 ? (
            <ApexCharts
              options={chartOptions}
              series={[chartSeries]}
              type="bar"
              height={200}
              width={"100%"}
            />
          ) : (
            <Alert className="mt-3" severity="warning">
              Monthly stock data does not exist.
            </Alert>
          )}
        </div>
      </div>
      <TableContainer className="mt-3" sx={{ boxShadow: "0" }}>
        <Table>
          <TableHead>
            <TableRow>
              {TableCells.map((item) => (
                <TableCell key={item.key}>
                  <div
                    className="flex items-center gap-x-2 font-semibold text-gray-700 cursor-pointer"
                    onClick={() => onColClick(item.key)}
                  >
                    {item.label}
                    {sortCol.sortOnField === item.key &&
                      !excludedCols.includes(item.key) &&
                      (sortCol.orderBy === "asc" ? (
                        <ArrowUpward fontSize="small" />
                      ) : (
                        <ArrowDownward fontSize="small" />
                      ))}
                  </div>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row, index) => (
              <TableRow
                key={`issue_row-${index}`}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>
                  <p
                    className={`${
                      row.issue_type === "critical"
                        ? "text-primary-red"
                        : row.issue_type === "resolved"
                        ? " text-primary-green"
                        : ""
                    }`}
                  >
                    {Issue_Type[row.issue_type]}
                  </p>
                </TableCell>
                <TableCell sx={{ minWidth: 300, maxWidth: 500 }}>
                  <p>{row.description}</p>
                </TableCell>
                <TableCell>
                  <div className="flex gap-x-1 items-center">
                    <img
                      className=" h-8 w-8 rounded-full"
                      alt={row.updated_by.userName}
                      src={row.updated_by.img}
                    />
                    <p>{row.updated_by.userName}</p>
                  </div>
                </TableCell>
                <TableCell align="right">
                  <div className="text-center p-2 bg-yellow-50  rounded-2xl w-28 flex justify-between items-center">
                    <ArrowDropDown className=" text-orange-600" />
                    <p className="text-orange-600">{row.progress}</p>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
