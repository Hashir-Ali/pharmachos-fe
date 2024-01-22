"use client";
import { Box, Tabs, Tab, CircularProgress, Alert } from "@mui/material";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import DrugOverview from "@/components/SingleDrug/DrugOverview";
import DrugOrders from "@/components/SingleDrug/DrugOrders";
import DrugTimelime from "@/components/SingleDrug/DrugTimeline";
import DrugReporting from "@/components/SingleDrug/DrugReporting";
import Link from "next/link";
import { useGetRequest } from "@/hooks/useGetRequest";
import { IDrugData, IReporting } from "@/types";

export default function DrugView({ params }: { params: { slug: string } }) {
  const [activeTab, setActiveTab] = useState(0);
  const handleTabChange = (_: unknown, newValue: number) => {
    setActiveTab(newValue);
  };

  const {
    data: drugData,
    loading,
    error,
  } = useGetRequest<IDrugData>(`/drug/${params.slug}`);

  const { data: reportingData } = useGetRequest<Record<string, IReporting>>(
    `/drug/${params.slug}/reporting`
  );

  if (error && !loading)
    return (
      <div className='flex justify-center items-center h-1/2'>
        <Alert severity='error' variant='filled' className=' w-[500px]'>
          Drug data does not exist!
        </Alert>
      </div>
    );

  return (
    <div className='bg-white p-3 m-5'>
      <div className='flex justify-between'>
        <div>
          <h1 className='text-2xl'>{drugData?.name}</h1>
          <p className='text-gray-500 text-sm'>EAN: {drugData?.drugEAN}</p>
        </div>
        <Link href='/dashboard/stocks/browse-drugs'>
          <CloseIcon className='cursor-pointer' />
        </Link>
      </div>
      <div className='mt-8'>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            paddingLeft: 0,
          }}
        >
          <Tabs value={activeTab} onChange={handleTabChange}>
            <Tab className='font-semibold' label='Overview' value={0} />
            <Tab className='font-semibold' label='Orders' value={1} />
            <Tab className='font-semibold' label='Activity' value={2} />
            <Tab className='font-semibold' label='Reporting' value={3} />
          </Tabs>
        </Box>

        {loading ? (
          <div className='flex flex-row py-8 justify-center'>
            <CircularProgress color='primary' />
          </div>
        ) : (
          <div>
            {activeTab === 0 && drugData && <DrugOverview {...drugData} />}
            {activeTab === 1 && <DrugOrders data={drugData?.orders} />}
            {activeTab === 2 && <DrugTimelime data={drugData?.orders} />}
            {activeTab === 3 && reportingData && (
              <DrugReporting data={reportingData} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
