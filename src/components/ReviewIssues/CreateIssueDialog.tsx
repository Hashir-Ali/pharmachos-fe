import { ChangeEvent, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import {
  Button,
  TextField,
  Checkbox,
  ListItemText,
  FormControl,
  MenuItem,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  OutlinedInput,
  Autocomplete,
  CircularProgress,
} from "@mui/material";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDebounce } from "ahooks";
import { useGetRequest } from "@/hooks/useGetRequest";
import React from "react";
import { usePostRequest } from "@/hooks/usePostRequest";
import { ProfileResponse } from "@/app/dashboard/layout";

const datePickerStyleOverride = {
  [".MuiOutlinedInput-notchedOutline"]: {
    borderLeft: 0,
    borderRight: 0,
    borderTop: 0,
    borderRadius: 0,
  },
  [".Mui-focused"]: {
    borderColor: "#fff",
  },
};

const dialogSchema = yup.object({
  // drugName: yup.string().required("Drug name is required"),
  issueType: yup.string().required("Issue type is required"),
  descriptionAndAction: yup.string().required("Description required"),
  // dueDate: yup.string().required("Due date required"),
  assignTo: yup.string().required("Assign To required"),
});
const today = dayjs();
export default function CreateIssueDialog({
  open,
  setOpen,
  onCreateIssue,
}: any) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(dialogSchema),
  });
  const [searchDrug, setSearchDrug] = useState("");
  const [selectedDrug, setSelectedDrug] = useState<string | null>();
  const [dueDate, setDueDate] = useState<Dayjs | null>(today);
  const debouncedSearchDrugs = useDebounce(searchDrug, { wait: 500 });
  const { fetchData, error, loading } = usePostRequest(`/issues/`);

  const { data: drugsData, loading: drugsLoading } = useGetRequest<any>(
    `/drug/searchDrugs?filters=${debouncedSearchDrugs}`
  );

  const drugDatas = (drugsData && drugsData[0]) || [];
  const drugOptions: { label: string; id: string }[] = [];
  drugDatas.forEach(
    (element: {
      name: string;
      _id: string;
      dosage: string;
      dosageUnit: string;
      dosageForm: string;
    }) => {
      drugOptions.push({
        label: `${element.name} ${element.dosage}${element.dosageUnit}`,
        id: element._id,
      });
    }
  );

  const { data: issueTypes, loading: issueTypesLoading } =
    useGetRequest<any>(`/issue-types`);
  const issueTypesArray = (issueTypes && issueTypes) || [];
  const issueTypeOptions: { label: string; id: string }[] = [];
  issueTypesArray.forEach((element: { issue_type: string; _id: string }) => {
    issueTypeOptions.push({ label: element.issue_type, id: element._id });
  });

  const { data: assignToData, loading: assignToLoading } =
    useGetRequest<any>(`/users`);
  const assignToArray = (assignToData && assignToData) || [];
  const assignToOptions: { label: string; id: string }[] = [];
  assignToArray.forEach(
    (element: { first_name: string; last_name: string; _id: string }) => {
      assignToOptions.push({
        label: `${element.first_name} ${element.last_name}`,
        id: element._id,
      });
    }
  );

  const { data: userProfile } =
    useGetRequest<ProfileResponse>("/users/profile");
  const onFormSubmit = (values: any) => {
    const finalData = {
      is_enabled: true,
      drugId: selectedDrug,
      issue_type: values.issueType,
      description: values.descriptionAndAction,
      due_date: dueDate,
      created_by: userProfile?._id,
      assigned_to: values.assignTo,
      progress: "To Do",
      note: null
    };
    fetchData(finalData);
    onCreateIssue();
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
      <form
        className="flex flex-col mt-5"
        onSubmit={handleSubmit(onFormSubmit)}
      >
        <DialogTitle id="alert-dialog-title font-semibold">
          Create Issue
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div className="basis-1/2 p-2 mt-2">
              <FormControl fullWidth>
                {/* <TextField label="Drug name" variant="standard" /> */}
                <Autocomplete
                  id="drugName"
                  // {...register("drugName")}
                  value={drugOptions.find((option) => {
                    return selectedDrug === option.id;
                  })}
                  onChange={(event, newValue) => {
                    setSelectedDrug(newValue ? newValue.id : null);
                  }}
                  options={drugOptions}
                  sx={{ width: 300 }}
                  loading={drugsLoading}
                  defaultValue={drugOptions[0]}
                  getOptionLabel={(option) => option.label}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Drug Name"
                      // error={Boolean(errors.drugName)}
                      onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        setSearchDrug(event.target.value);
                      }}
                    />
                  )}
                />
              </FormControl>
            </div>
            <div className="flex flex-row gap-x-3 mt-3 p-2">
              <div className="basis-1/2 ">
                <FormControl sx={{ width: 220 }}>
                  <InputLabel id="demo-multiple-checkbox-label">
                    Issue Type
                  </InputLabel>
                  {issueTypeOptions && (
                    <Select
                      labelId="issueType"
                      id="issueType"
                      variant="standard"
                      defaultValue={issueTypeOptions[0]?.id}
                      {...register("issueType")}
                      error={Boolean(errors.issueType)}
                      // multiple
                      // // multiline
                      // value={filters}
                      // onChange={handleChange}
                    >
                      {issueTypesLoading && (
                        <div className="flex justify-center py-8">
                          <CircularProgress color="primary" />
                        </div>
                      )}
                      {issueTypeOptions.map((item: any, index: number) => (
                        <MenuItem
                          key={item.id}
                          value={item.id}
                          sx={{
                            paddingLeft: 0,
                            borderBottom: !index ? "1px solid #cecece" : "",
                          }}
                        >
                          {/* <Checkbox checked={filters.includes(item.id)} /> */}
                          <ListItemText
                            primary={item.label}
                            className="ml-3 p-1"
                          />
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                </FormControl>
              </div>
              <div className="basis-1/2">
                <FormControl sx={{ width: 220 }}>
                  <InputLabel id="demo-multiple-checkbox-label">
                    Assign To
                  </InputLabel>
                  {assignToOptions && (
                    <Select
                      labelId="assignTo"
                      id="assignTo"
                      variant="standard"
                      defaultValue={assignToOptions[0]?.id}
                      {...register("assignTo")}
                      error={Boolean(errors.assignTo)}
                    >
                      {assignToLoading && (
                        <div className="flex justify-center py-8">
                          <CircularProgress color="primary" />
                        </div>
                      )}
                      {assignToOptions.map((item: any, index: number) => (
                        <MenuItem
                          key={item.id}
                          value={item.id}
                          sx={{
                            paddingLeft: 0,
                            borderBottom: !index ? "1px solid #cecece" : "",
                          }}
                        >
                          {/* <Checkbox checked={filters.includes(item.id)} /> */}
                          <ListItemText
                            primary={item.label}
                            className="ml-3 p-1"
                          />
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                </FormControl>
              </div>
            </div>
            <div className="mt-5  p-2">
              <FormControl fullWidth>
                <TextField
                  multiline
                  error={Boolean(errors.descriptionAndAction)}
                  label="Description and Action"
                  defaultValue={null}
                  {...register("descriptionAndAction")}
                  variant="standard"
                />
              </FormControl>
            </div>

            <div className="mt-5  p-2">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Due date"
                  sx={datePickerStyleOverride}
                  minDate={today}
                  value={setDueDate}
                  onChange={(newValue: any) => setDueDate(newValue)}
                />
              </LocalizationProvider>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions className="p-3">
          <Button variant="contained" type="submit" color="primary">
            Create Issue
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
