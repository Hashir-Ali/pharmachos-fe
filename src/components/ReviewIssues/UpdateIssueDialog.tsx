import { Dispatch, SetStateAction, useState } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import {
  Button,
  TextField,
  FormControl,
  MenuItem,
  Dialog,
  CircularProgress,
} from "@mui/material";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  DrugIssuesData,
  UpdateIssueForm,
} from "@/app/dashboard/review-issues/page";
import { usePostRequest } from "@/hooks/usePostRequest";

const dialogSchema = yup.object({
  drugName: yup.string().required("Required"),
  progress: yup.string().required("Required"),
  notes: yup.string().required("Required"),
});

const progressFilters = [
  { value: "To Do", label: "To Do" },
  { value: "In Progress", label: "In Progress" },
  { value: "Completed", label: "Completed" },
];

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onUpdateIssue: () => void;
  values?: UpdateIssueForm;
  rowData?: DrugIssuesData;
};

export default function UpdateIssueDialog({
  open,
  setOpen,
  onUpdateIssue,
  values,
  rowData,
}: Props) {
  const defaultFormValues = values;

  const { register, handleSubmit, formState, getValues, setValue } = useForm({
    defaultValues: defaultFormValues,
    values: values,
    resolver: yupResolver(dialogSchema),
  });
  const { errors } = formState;
  const { fetchData, error, loading, fetched } = usePostRequest(
    `/issues/${rowData?._id}`
  );

  const onFormSubmit = async (values: any) => {
    console.log(
      "🚀 ~ file: UpdateIssueDialog.tsx:59 ~ onFormSubmit ~ values:",
      values
    );

    let fData = values;
    if (values.progress === "Completed") {
      fData = { ...values, closing_date: new Date() };
    }
    await fetchData(fData, "PATCH");
    onUpdateIssue();
  };

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      maxWidth="sm"
    >
      {loading && <CircularProgress size={20} className="mr-3" />}
      <div className="bg-white p-5">
        <h1 className="text-2xl">Update Progress</h1>
        <p className=" text-sm mt-2">
          Add notes on the issue to update the progress.
        </p>
        <form
          className="flex flex-col mt-5"
          onSubmit={handleSubmit(onFormSubmit)}
        >
          <div className="flex flex-row gap-x-3 mt-3">
            <div className="basis-1/2">
              <FormControl fullWidth>
                <TextField
                  id="drugName"
                  label="Drug name"
                  variant="standard"
                  {...register("drugName")}
                  error={Boolean(errors.drugName)}
                  disabled
                  helperText={<>{errors.drugName?.message}</>}
                />
              </FormControl>
            </div>
            <div className="basis-1/2">
              <TextField
                id="progress"
                select
                fullWidth
                label="Progress"
                variant="standard"
                {...register("progress")}
                defaultValue={defaultFormValues?.progress}
                error={Boolean(errors.progress)}
                helperText={<>{errors.progress?.message}</>}
              >
                {progressFilters.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </div>
          <div className="mt-5">
            <FormControl fullWidth>
              <TextField
                id="notes"
                multiline
                label="Notes"
                variant="standard"
                {...register("notes")}
                error={Boolean(errors.notes)}
                helperText={<>{errors.notes?.message}</>}
              />
            </FormControl>
          </div>
          <div className="mt-5 flex justify-end">
            <Button variant="contained" type="submit" color="primary">
              Update
            </Button>
          </div>
        </form>
      </div>
    </Dialog>
  );
}
