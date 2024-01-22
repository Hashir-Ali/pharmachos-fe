"use client";
import dayjs from 'dayjs';

import { IOrder } from '@/types';
import {
  Alert,
  Checkbox,
} from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
} from '@mui/x-data-grid';

const Supplier_Type: Record<string, string> = {
  contracted: "Contracted supplier",
  preferred: "Preferred supplier",
  other: "Other supplier",
};
const GridInitialState = {
  pagination: {
    paginationModel: {
      pageSize: 5,
    },
  },
};
const PageSizeOptions = [5, 10, 15, 20];
const DisableColumnMenu = true;
const DataGridStyleOverride = {
  width: "100%",
  border: "0",
  paddingLeft: 0,
  [".MuiDataGrid-footerContainer"]: {
    border: "0 !important",
  },
};

type FCProps = {
  data: IOrder[] | undefined;
};

const columns: GridColDef[] = [
  {
    field: "order",
    headerName: "Order",
    disableColumnMenu: DisableColumnMenu,
    minWidth: 270,
  },
  {
    field: "order_date",
    headerName: "Order Date",
    disableColumnMenu: DisableColumnMenu,
    minWidth: 120,
    renderCell: (params: GridRenderCellParams) => {
      return <div>{dayjs(params.row.order_date).format("DD-MMM-YYYY")}</div>;
    },
  },
  {
    field: "price_container",
    headerName: "Price per container",
    disableColumnMenu: DisableColumnMenu,
    type: "number",
    minWidth: 180,
    renderCell: (params: GridRenderCellParams) => {
      return <div>&pound;{params.row.price_container}</div>;
    },
  },
  {
    field: "from",
    headerName: "From",
    disableColumnMenu: DisableColumnMenu,
    minWidth: 150,
  },
  {
    field: "quantity",
    headerName: "Quantity",
    disableColumnMenu: DisableColumnMenu,
    type: "number",
    minWidth: 80,
  },
  {
    field: "received",
    headerName: "Received",
    disableColumnMenu: DisableColumnMenu,
    headerAlign: "center",
    align: "center",
    minWidth: 100,
    renderCell: (params: GridRenderCellParams) => {
      return (
        <Checkbox disableRipple disabled defaultChecked={params.row.received} />
      );
    },
  },
  {
    field: "type",
    headerName: "Type",
    disableColumnMenu: DisableColumnMenu,
    minWidth: 300,
    renderCell: (params: GridRenderCellParams) => {
      return (
        <div
          className={`rounded-2xl py-1 px-3 ${
            params.formattedValue === "other"
              ? "bg-orange-100 text-orange-600"
              : " bg-blue-50 text-blue-900"
          }`}
        >
          {Supplier_Type[params.formattedValue]}
          {params?.row.type || 'others'}
        </div>
      );
    },
  },
];

export default function DrugOrders({ data }: FCProps) {
  if (!data || !data.length)
    return (
      <div className='flex justify-center py-8'>
        <Alert severity='warning'>No Orders for this drug!</Alert>
      </div>
    );

  const mappedGridValues = data.map((item) => ({
    id: item._id,
    order: item.ordered_by._id,
    order_date: item.created_at,
    price_container: item.cost,
    from: item.From,
    quantity: item.quantityOrdered,
    received: item.isReceived,
    type: item.type,
  }));

  return (
    <DataGrid
      sx={DataGridStyleOverride}
      showColumnVerticalBorder={false}
      showCellVerticalBorder={false}
      columnHeaderHeight={56}
      rows={mappedGridValues}
      rowSelection={false}
      columns={columns}
      initialState={GridInitialState}
      pageSizeOptions={PageSizeOptions}
    />
  );
}
