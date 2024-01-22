"use client";
import {
  ChangeEvent,
  useState,
} from 'react';

import { useDebounce } from 'ahooks';
import dayjs from 'dayjs';
import Link from 'next/link';

import BarGraph from '@/components/SingleDrug/BarGraph';
import ProgressBar from '@/components/SingleDrug/ProgressBar';
import { useGetRequest } from '@/hooks/useGetRequest';
import {
  ArrowDownward,
  ArrowUpward,
} from '@mui/icons-material';
import {
  capitalize,
  Chip,
  CircularProgress,
  FormControl,
  InputLabel,
  OutlinedInput,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

// make sure col names match keys in json response bcs of sorting algorithm
const TableCells = [
  { key: "name", label: "Name" },
  { key: "status", label: "Status" },
  { key: "current_stock", label: "Current stock" },
  { key: "last_order", label: "Last order" },
  { key: "rule_type", label: "Rule type" },
  { key: "last_5_months", label: "Last 5 months" },
  { key: "last_update", label: "Last update" },
];
const excludedCols = [
  "current_stock",
  "last_order",
  "last_5_months",
  "status",
  "rule_type",
  "last_update",
];
const successChipsClass = "bg-green-100 text-green-800";
const issueChipsClass = "bg-red-100 text-red-600";
const TableOverriddenStyles = {
  [".MuiTableRow-root:nth-of-type(even)"]: {
    background: "#F7F7F8",
  },
  [".MuiTableCell-body"]: {
    paddingTop: 0,
    paddingBottom: 0,
  },
};
const PageLimit = 10;
const ProgressBarValuesMultiplier = 1;
function splitText(text: string) {
  let spl = text.split(" ");
  return [spl[0], spl[1] + " " + spl[2] + " " + spl[3], spl[4]];
}
export default function BrowseDrugs() {
  const [search, setSearch] = useState("");
  const [sortCol, setSortCol] = useState({ sortOnField: "", orderBy: "" });
  const [queryParams, setQueryParams] = useState({
    page: 1,
    limit: PageLimit,
    sort: "ASC",
    filters: "",
  });
  const debouncedValue = useDebounce(search, { wait: 500 });
  const onColClick = (key: string) => {
    if (sortCol.sortOnField === key) {
      const order = sortCol.orderBy === "ASC" ? "DESC" : "ASC";
      setSortCol((state) => ({
        ...state,
        orderBy: order,
      }));
      setQueryParams((state) => ({ ...state, sort: order }));
    } else {
      setSortCol({ sortOnField: key, orderBy: "ASC" });
      setQueryParams((state) => ({ ...state, sort: "ASC" }));
    }
  };

  const onPaginationChange = (event: ChangeEvent<any>, page: number) => {
    setQueryParams((state) => ({ ...state, page }));
  };

  const progressBarProps = ({ stockRuleMin, stockRuleMax, currentStock }: any) => {
    return {
      stockRuleMin: Math.round(stockRuleMin * ProgressBarValuesMultiplier),
      stockRuleMax: Math.round(stockRuleMax * ProgressBarValuesMultiplier),
      currentStock: Math.round(currentStock * ProgressBarValuesMultiplier),
    };
  };

  const { data, loading } = useGetRequest<any>(
    `/drug?sort=${queryParams.sort}&limit=${PageLimit}&page=${queryParams.page}&filters=${debouncedValue}`,
    queryParams
  );
  const tableData = (data && data[0]) || [];
  const tableDataCount = (data && data[1]) || [];
  return (
    <div className='bg-white rounded-lg p-5 m-5'>
      <FormControl variant='outlined'>
        <InputLabel htmlFor='search-input'>Search</InputLabel>
        <OutlinedInput
          id='search-input'
          label='Search'
          size='small'
          sx={{ m: 1 }}
          autoComplete='off'
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setSearch(event.target.value);
          }}
        />
      </FormControl>
      <div className='mt-5'>
        {loading ? (
          <div className='flex justify-center py-8'>
            <CircularProgress color='primary' />
          </div>
        ) : (
          <TableContainer sx={TableOverriddenStyles}>
            <Table size='small'>
              <TableHead>
                <TableRow>
                  {TableCells.map((item) => (
                    <TableCell key={item.key}>
                      <div
                        className='flex items-center gap-x-2 font-semibold text-gray-700 cursor-pointer'
                        onClick={() =>
                          item.key === "name" ? onColClick(item.key) : null
                        }
                      >
                        {item.label}
                        {sortCol.sortOnField === item.key &&
                          !excludedCols.includes(item.key) &&
                          (queryParams.sort === "ASC" ? (
                            <ArrowUpward fontSize='small' />
                          ) : (
                            <ArrowDownward fontSize='small' />
                          ))}
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData.map((row: any) => (
                  <TableRow
                    key={row._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell width={220}>
                      <Link href={`/dashboard/stocks/browse-drugs/${row._id}`}>
                        {row.name + " " + row.dosage + `(${row.dosageUnit})`}
                        <br />
                        {row.dosageForm}
                      </Link>
                    </TableCell>
                    <TableCell width={90}>
                      {
                        <Chip
                          label={capitalize(row.status)}
                          className={` font-medium 
                          ${
                            row.status === "Issue"
                              ? issueChipsClass
                              : successChipsClass
                          }
                        `}
                        />
                      }
                    </TableCell>
                    <TableCell  width={200} style={{ minWidth: 100, maxWidth: 200 }}>
                      {row?.stock ? (
                        <ProgressBar {...progressBarProps(row?.stock)} />
                      ) : null}
                    </TableCell>
                    <TableCell className='py-1' width={150}>
                      <div className=' flex flex-col gap-y-1'>
                        {row?.Orders?.lastOrder
                          ? splitText(row.Orders.lastOrder).map(
                              (item, index) => <p key={index}>{item}</p>
                            )
                          : ""}
                      </div>
                    </TableCell>
                    <TableCell width={150}>
                      <p>{row?.stock?.ruleType}</p>
                    </TableCell>
                    <TableCell width={150}>
                      {row?.stock?.monthlyStockLevels ? (
                        <BarGraph
                          stockValues={row?.stock?.monthlyStockLevels}
                        />
                      ) : null}
                    </TableCell>
                    <TableCell width={100}>
                      <p>{dayjs(row.Updated_at).format("DD/MM/YYYY")}</p>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        {!loading && (
          <div className=' mt-5 flex justify-end'>
            <Pagination
              onChange={onPaginationChange}
              count={Math.ceil(tableDataCount/queryParams.limit)}
              page={queryParams.page}
              shape='rounded'
            />
          </div>
        )}
      </div>
    </div>
  );
}
