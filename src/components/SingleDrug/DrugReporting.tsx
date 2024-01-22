"use client";
import dynamic from 'next/dynamic';

import { IReporting } from '@/types';
import { DrugReportingColumnChartOptions } from '@/utility/charts';
import {
  MonthIndexToLabel,
  MonthIndexToLabelAbbr,
} from '@/utility/mockDataGenerator';
import { Alert } from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridColumnGroupingModel,
  GridRenderCellParams,
} from '@mui/x-data-grid';

const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

const DisableColumnMenu = true;

const DataGridStyleOverride = {
  width: "100%",
  border: "0",
  paddingLeft: 0,
  [".MuiDataGrid-footerContainer"]: {
    border: "0 !important",
  },
  [".MuiDataGrid-columnHeaderTitle"]: {
    fontWeight: "600",
  },
};
const PageSizeOptions = [5, 10, 15, 20];
const InitialPageOptions = {
  pagination: {
    paginationModel: {
      pageSize: 10,
    },
  },
};
const columnGroupingModel: GridColumnGroupingModel = [
  {
    groupId: " ",
    children: [{ field: "month" }],
  },
  {
    groupId: "Purchased",
    headerAlign: "center",
    children: [{ field: "purchased_quantity" }, { field: "purchased_value" }],
  },
  {
    groupId: "Dispensed",
    headerAlign: "center",
    children: [{ field: "dispensed_quantity" }, { field: "dispensed_value" }],
  },
];
const columns: GridColDef[] = [
  {
    field: "month",
    headerName: "Month",
    type: "number",
    disableColumnMenu: DisableColumnMenu,
    minWidth: 100,
    flex: 1,
    align: "left",
    headerAlign: "left",
    renderCell: (params: GridRenderCellParams) => {
      return <div>{MonthIndexToLabel[params.row.month]}</div>;
    },
  },
  {
    field: "purchased_quantity",
    headerName: "Quantity",
    type: "number",
    disableColumnMenu: DisableColumnMenu,
    minWidth: 100,
    renderCell: (params: GridRenderCellParams) => {
      return <div>{params.row.purchased_quantity}</div>;
    },
  },
  {
    field: "purchased_value",
    headerName: "Value",
    disableColumnMenu: DisableColumnMenu,
    type: "number",
    minWidth: 100,
    renderCell: (params: GridRenderCellParams) => {
      return <div>&pound;{params.row.purchased_value}</div>;
    },
  },
  {
    field: "dispensed_quantity",
    headerName: "Quantity",
    type: "number",
    disableColumnMenu: DisableColumnMenu,
    minWidth: 100,
    renderCell: (params: GridRenderCellParams) => {
      return <div>{params.row.dispensed_quantity}</div>;
    },
  },
  {
    field: "dispensed_value",
    headerName: "Value",
    disableColumnMenu: DisableColumnMenu,
    type: "number",
    minWidth: 100,
    renderCell: (params: GridRenderCellParams) => {
      return <div>&pound;{params.row.dispensed_value}</div>;
    },
  },
];
type FCProps = {
  data: Record<string, IReporting>;
};

export default function DrugReporting({ data }: FCProps) {
  const reportingData = Object.entries(data);
  if (!reportingData || !reportingData.length)
    return (
      <div className='flex justify-center py-8'>
        <Alert severity='warning'>Reports do not exist for this drug!</Alert>
      </div>
    );

  /// Prepare chart data ///
  const columnChartData = [
    {
      name: "Purchased",
      data: reportingData.map(([key, { purchased }]) => purchased.quantity),
    },
    {
      name: "Dispensed",
      data: reportingData.map(([key, { dispensed }]) => dispensed.quantity),
    },
  ];

  const barChartXAxisCategories = reportingData.map(
    ([key, value]) => MonthIndexToLabelAbbr[Number(key)]
  );
  const barChartOptions = {
    ...DrugReportingColumnChartOptions,
    xaxis: {
      ...DrugReportingColumnChartOptions.xaxis,
      categories: barChartXAxisCategories,
    },
  };
  /// Prepare table data ///
  const tableData = reportingData.map(
    ([key, { purchased, dispensed }], index) => ({
      id: `table-row-${index + 1}`,
      month: Number(key),
      purchased_quantity: purchased.quantity,
      purchased_value: purchased.value,
      dispensed_quantity: dispensed.quantity,
      dispensed_value: dispensed.value,
    })
  );

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2'>
      <div>
        <DataGrid
          experimentalFeatures={{ columnGrouping: true }}
          sx={DataGridStyleOverride}
          rowHeight={40}
          showColumnVerticalBorder={false}
          showCellVerticalBorder={false}
          columnHeaderHeight={56}
          rows={tableData}
          rowSelection={false}
          columns={columns}
          initialState={InitialPageOptions}
          pageSizeOptions={PageSizeOptions}
          columnGroupingModel={columnGroupingModel}
        />
      </div>
      <div className=' ml-8 flex flex-col lg:justify-center'>
        <ApexCharts
          series={columnChartData}
          options={barChartOptions}
          height={600}
          width={"100%"}
          type='bar'
        />
      </div>
    </div>
  );
}
