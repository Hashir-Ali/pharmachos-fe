import { SelectChangeEvent } from "@mui/material/Select";
import {
  Checkbox,
  ListItemText,
  InputLabel,
  TextField,
  FormControl,
  Button,
  OutlinedInput,
  MenuItem,
  Select,
  Box,
  Chip,
  Divider,
} from "@mui/material";
import { Settings } from "@mui/icons-material";
import { ChangeEvent, useState } from "react";
import { useGetRequest } from "@/hooks/useGetRequest";

export default function ReviewIssuesFilter({
  selectedFilters,
  setOpenIssueDialog,
  setSearchQuery,
  setSelectedFilters,
}: any) {
  const [filters, setFilters] = useState<string[]>(selectedFilters || []);

  const { data: issueTypes, loading: issueTypesLoading } =
    useGetRequest<any>(`/issue-types`);
  const issueTypesArray = (issueTypes && issueTypes) || [];
  const issueTypeOptions: { label: string; id: string }[] = [
    { label: "Issues for today", id: "today" },
  ];
  issueTypesArray.forEach((element: { issue_type: string; _id: string }) => {
    issueTypeOptions.push({ label: element.issue_type, id: element._id });
  });

  const handleChange = (event: SelectChangeEvent<typeof filters>) => {
    const {
      target: { value },
    } = event;
    setFilters(typeof value === "string" ? value.split(",") : value);
    setSelectedFilters(typeof value === "string" ? value.split(",") : value);
  };

  const selectRenderedValues = filters.map((value) => {
    const fItem = issueTypeOptions.find((item) => item.id === value);
    return fItem?.label;
  });

  return (
    <div className="flex gap-5 mt-8">
      <div className="flex basis-1/2 gap-x-5">
        <TextField
          label="Search"
          variant="outlined"
          sx={{ width: 300 }}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setSearchQuery(event.target.value);
          }}
        />
        <FormControl sx={{ width: 300 }}>
          <InputLabel id="demo-multiple-checkbox-label">
            Filters Selected
          </InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            multiline
            value={filters}
            onChange={handleChange}
            input={<OutlinedInput label="Filters Selected" multiline />}
            renderValue={(selected) => selectRenderedValues.join(", ")}
          >
            {issueTypeOptions.map((item, index) => (
              <MenuItem
                key={item.id}
                value={item.id}
                sx={{
                  paddingLeft: 0,
                  borderBottom: !index ? "1px solid #cecece" : "",
                }}
              >
                <Checkbox checked={filters.includes(item.id)}/>
                <ListItemText primary={item.label} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="flex basis-1/2 items-center justify-end">
        <Button
          variant="contained"
          color="primary"
          className=" h-10"
          onClick={() => setOpenIssueDialog(true)}
        >
          Create Issue
        </Button>
        <Settings className="text-gray-600 cursor-pointer ml-5" />
      </div>
    </div>
  );
}
