"use client";
import { useState } from "react";

import CreateIssueDialog from "@/components/ReviewIssues/CreateIssueDialog";
import ReviewIssuesFilter from "@/components/ReviewIssues/ReviewIssuesFilter";
import ReviewDrugIssues from "@/components/ReviewIssues/ReviewIssuesTable";
import UpdateIssueDialog from "@/components/ReviewIssues/UpdateIssueDialog";
import {
  Alert,
  Box,
  CircularProgress,
  Snackbar,
  Tab,
  Tabs,
} from "@mui/material";
import { useGetRequest } from "@/hooks/useGetRequest";
import { useDebounce } from "ahooks";

export type UpdateIssueForm = {
  drugName: string;
  progress: string;
  notes: string;
};

export type DrugIssuesData = {
  _id: number;
  progress: string;
  notes: {
    Updated_at: string;
    created_at: string;
    created_by: string;
    issue: string;
    note: string;
    _id: string;
  };
  issue_type: string;
  is_unabled: boolean;
  due_date: number;
  drugId: any;
  name: string;
  description: string;
  created_by: object;
  created_at: string;
  assigned_to: object;
  updated_at: number;
};

export default function ReviewIssues() {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });
  const [openCreateIssueDialog, setOpenCreateIssueDialog] = useState(false);
  const [openUpdateIssueDialog, setOpenUpdateIssueDialog] = useState(false);
  const [updateIssuesValues, setUpdateIssuesValues] =
    useState<UpdateIssueForm>();
  const [openSnackBar, setSnackBarOpen] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [rowData, setRowData] = useState<DrugIssuesData>();

  const debouncedSearchValue = useDebounce(searchQuery, { wait: 500 });

  const { data: openIssuesdata, loading: openIssuesLoading } =
    useGetRequest<any>(
      `/issues/inProgress?limit=${paginationModel.pageSize}&page=${paginationModel.page}&filters=${selectedFilters}&q=${debouncedSearchValue}`,
      undefined,
      undefined,
      refetch,
      true
    );
  const { data: closedIssuesdata, loading: closedIssuesLoading } =
    useGetRequest<any>(
      `/issues/completed?limit=${paginationModel.pageSize}&page=${paginationModel.page}&filters=${selectedFilters}&q=${debouncedSearchValue}`,
      undefined,
      undefined,
      refetch,
      true
    );

  // const handleFilterChange = (event: SelectChangeEvent) => {
  //   console.log(event);
  //   const {
  //     target: { value },
  //   } = event;
  //   setSelectedFilters((currFilters) =>
  //     currFilters.includes(value)
  //       ? currFilters.filter((item) => item !== value)
  //       : [...currFilters, value]
  //   );
  // };

  const handleTabChange = (_: unknown, newValue: number) => {
    setActiveTab(newValue);
  };

  const createIssueDialogProps = {
    open: openCreateIssueDialog,
    setOpen: setOpenCreateIssueDialog,
    onCreateIssue: () => {
      setRefetch(!refetch);
      setSuccessMsg("New Issue Created!");
      setOpenCreateIssueDialog(false);
      setSnackBarOpen(true);
    },
  };

  const updateIssueDialogProps = {
    open: openUpdateIssueDialog,
    setOpen: setOpenUpdateIssueDialog,
    onUpdateIssue: () => {
      setRefetch(!refetch);
      setSuccessMsg("Issue Updated!");
      setOpenUpdateIssueDialog(false);
      setSnackBarOpen(true);
    },
    values: updateIssuesValues,
    rowData,
  };

  const filterProps = {
    selectedFilters,
    // handleFilterChange,
    setSelectedFilters,
    setSearchQuery,
    // selectRenderedValue,
    setOpenIssueDialog: setOpenCreateIssueDialog,
  };

  const onOpenIssuesClick = (row: DrugIssuesData) => {
    setUpdateIssuesValues({
      drugName: row?.drugId?.name,
      progress: row.progress,
      notes: row.notes.note,
    });
    setRowData(row);

    setOpenUpdateIssueDialog(true);
  };

  const onSnackBarClose = () => {
    setSnackBarOpen(false);
  };

  return (
    <div className="bg-white p-5 mx-8 overflow-x-hidden">
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          paddingLeft: 0,
        }}
      >
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab className="font-semibold" label="Open Issues" value={0} />
          <Tab className="font-semibold" label="Closed Issues" value={1} />
        </Tabs>
      </Box>
      <Snackbar
        open={openSnackBar}
        autoHideDuration={2000}
        onClose={onSnackBarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={onSnackBarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          {successMsg}
        </Alert>
      </Snackbar>
      <ReviewIssuesFilter {...filterProps} />
      <CreateIssueDialog {...createIssueDialogProps} />
      {updateIssuesValues && <UpdateIssueDialog {...updateIssueDialogProps} />}
      <div className="mt-5">
        {activeTab === 0 && (
          <>
            {openIssuesLoading ? (
              <div className="flex justify-center py-8">
                <CircularProgress color="primary" />
              </div>
            ) : (
              <ReviewDrugIssues
                issues={openIssuesdata || []}
                setPaginationModel={setPaginationModel}
                paginationModel={paginationModel}
                onOpenIssuesClick={onOpenIssuesClick}
              />
            )}
          </>
        )}
        {activeTab === 1 && (
          <>
            {closedIssuesLoading ? (
              <div className="flex justify-center py-8">
                <CircularProgress color="primary" />
              </div>
            ) : (
              <ReviewDrugIssues
                onOpenIssuesClick={onOpenIssuesClick}
                setPaginationModel={setPaginationModel}
                paginationModel={paginationModel}
                issues={closedIssuesdata || []}
                showClosed={true}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
