"use client";
import { useState } from "react";

import {
  dateFormatter,
  reviewIssuesFilters,
} from "@/utility/mockDataGenerator";
import { Edit } from "@mui/icons-material";
import {
  DataGrid,
  GridColDef,
  GridEventListener,
  GridPaginationModel,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import { DrugIssuesData } from "@/app/dashboard/review-issues/page";

const DataGridStyleOverride = {
  width: "100%",
  border: "0",
  [".MuiDataGrid-footerContainer"]: {
    border: "0 !important",
  },
  [".MuiDataGrid-columnHeaderTitle"]: {
    fontWeight: "600",
  },
  [".MuiDataGrid-cell"]: {
    paddingTop: "16px",
    paddingBottom: "16px",
    cursor: "pointer",
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

const DisableColumnMenu = true;

type FCProps = {
  issues: DrugIssuesData[];
  showClosed?: boolean;
  onOpenIssuesClick: (row: DrugIssuesData) => void;
  onRowClick?: GridEventListener<"rowClick">;
  setPaginationModel: any;
  paginationModel: GridPaginationModel
};

export default function ReviewDrugIssues({
  issues,
  onOpenIssuesClick,
  showClosed,
  setPaginationModel,
  paginationModel
}: FCProps) {
  // fixed width flickering on load
  const columns: GridColDef[] = [
    {
      field: "drugId",
      headerName: "Name",
      type: "object",
      disableColumnMenu: DisableColumnMenu,
      minWidth: 200,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <div>
            <p className="mb-2">{`${params.row.drugId.name}
          ${params.row.drugId.dosage}${params.row.drugId.dosageUnit}
          ${params.row.drugId.dosageForm}
          
          `}</p>
            {/* <p className="mb-2">{params.row.name}</p> */}
            <div className="error-chip">{params.row.issue_type} </div>
          </div>
        );
      },
    },
    {
      field: "description",
      headerName: "Description and Action",
      type: "string",
      disableColumnMenu: DisableColumnMenu,
      minWidth: 300,
    },
    {
      field: "progress",
      headerName: "Progress",
      disableColumnMenu: DisableColumnMenu,
      type: "string",
      renderCell: (params: GridRenderCellParams) => {
        return (
          <div
            className="warning-chip"
            onClick={() => onOpenIssuesClick(params.row)}
          >
            {params.row.progress}{" "}
            {<Edit className="text-secondary-green" fontSize="small" />}
          </div>
        );
      },
    },
    {
      field: "created_by",
      headerName: "Created by",
      type: "object",
      disableColumnMenu: DisableColumnMenu,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <div>
            <p className="mb-2">
              {params.row.created_by.first_name}{" "}
              {params.row.created_by.last_name}{" "}
            </p>
          </div>
        );
      },
    },
    {
      field: "notes",
      headerName: "Notes",
      disableColumnMenu: DisableColumnMenu,
      renderCell: (params: GridRenderCellParams) => {
        return <p> {params.row.notes.note} </p>;
      },
    },
    {
      field: "assigned_to",
      headerName: "Assigned To",
      disableColumnMenu: DisableColumnMenu,
      type: "object",
      renderCell: (params: GridRenderCellParams) => {
        return (
          <div>
            <p className="mb-2">
              {params.row.assigned_to.first_name}{" "}
              {params.row.assigned_to.last_name}{" "}
            </p>
          </div>
        );
      },
    },
    {
      field: "Updated_at",
      headerName: "Issue date",
      disableColumnMenu: DisableColumnMenu,
      type: "string",
      renderCell: (params: GridRenderCellParams) => {
        return <div>{dateFormatter(params.row.Updated_at)[0]}</div>;
      },
    },
    !showClosed
      ? {
          field: "due_date",
          headerName: "Due date",
          disableColumnMenu: DisableColumnMenu,
          type: "string",
          renderCell: (params: GridRenderCellParams) => {
            return <div>{dateFormatter(params.row.due_date)[0]}</div>;
          },
        }
      : {
          field: "closing_date",
          headerName: "Closed date",
          disableColumnMenu: DisableColumnMenu,
          type: "string",
          renderCell: (params: GridRenderCellParams) => {
            return <div>{dateFormatter(params.row.closing_date)[0]}</div>;
          },
        },
  ];
  const [colState] = useState(columns.map((item) => ({ ...item, flex: 1 })));
  return (
    <DataGrid
      sx={DataGridStyleOverride}
      getRowId={(row) => row._id}
      showColumnVerticalBorder={false}
      showCellVerticalBorder={false}
      rows={issues}
      getRowHeight={() => "auto"}
      rowSelection={false}
      // onRowClick={onRowClick}
      columns={colState}
      initialState={InitialPageOptions}
      paginationModel={paginationModel}
      onPaginationModelChange={setPaginationModel}
      pageSizeOptions={PageSizeOptions}
    />
  );
}
