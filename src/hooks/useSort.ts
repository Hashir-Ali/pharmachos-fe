import { useState, useEffect } from "react";
import { useDebounce } from "ahooks";
import { mockData } from "@/utility/mockDataGenerator";
export type Order = "asc" | "desc";

export interface Props {
  data: any;
  search: string;
  sortOptions: { sortOnField: string; orderBy: string };
}

const keyToType: Record<string, string> = {
  name: "string",
  status: "string",
  rule_type: "string",
  last_update: "date",
};

export default function useSort({ data, sortOptions, search }: Props) {
  const [sortedData, setSortedData] = useState([...data]);
  const debouncedValue = useDebounce(search, { wait: 500 });

  const sortingData = () => {
    const { sortOnField, orderBy } = sortOptions;
    const type = keyToType[sortOnField];
    switch (type) {
      case "string":
        setSortedData((state) =>
          state.sort((a, b) =>
            orderBy === "asc"
              ? b[sortOnField].localeCompare(a[sortOnField])
              : a[sortOnField].localeCompare(b[sortOnField])
          )
        );
        break;
      case "date":
        setSortedData((state) =>
          state.sort((a, b) =>
            orderBy === "asc"
              ? Date.parse(a[sortOnField]) - Date.parse(b[sortOnField])
              : Date.parse(b[sortOnField]) - Date.parse(a[sortOnField])
          )
        );
        break;
      case "number":
        setSortedData((state) =>
          state.sort((a, b) =>
            orderBy === "asc"
              ? a[sortOnField] - b[sortOnField]
              : b[sortOnField] - a[sortOnField]
          )
        );
        break;
      case "":
        setSortedData(data);
        break;
    }
  };

  useEffect(() => {
    sortingData();
  }, [sortOptions]);

  useEffect(() => {
    if (!debouncedValue.length) {
      setSortedData(mockData);
      return;
    }
    setSortedData(() =>
      sortedData.filter(({ name, status }) => {
        const medicineNameLC = name.toLowerCase();
        const searchLC = search.toLowerCase();
        const statusLC = status.toLowerCase();
        return medicineNameLC.includes(searchLC) || statusLC.includes(searchLC);
      })
    );
  }, [debouncedValue]);

  return { sortedData };
}
