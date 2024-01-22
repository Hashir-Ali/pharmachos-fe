"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  Error,
  ExpandMore,
  Layers,
  People,
  Settings,
  TableRows,
  UploadFile,
} from '@mui/icons-material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';

const AccordianSummaryStyleOverride = {
  boxShadow: "none",
  padding: 0,
  border: 0,
  "&:before": { height: 0 },
};

const BaseLink = "/dashboard";
const StockManagementLinks = [
  { label: "Browse Drugs", link: `/stocks/browse-drugs` },
  { label: "Review Issues", link: "/review-issues" },
  { label: "Ordering", link: "#" },
  { label: "Reporting", link: "#" },
  { label: "Analytics", link: "#" },
];

export function SideBarLinks() {
  const path = usePathname();
  return (
    <div className='mt-8'>
      <Accordion sx={AccordianSummaryStyleOverride}>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          sx={{ padding: 0, border: 0 }}
        >
          <div className='flex items-center gap-x-5'>
            <TableRows className='text-primary-green' />
            <p className=' '>Stock Management</p>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className='text-center'>
            {StockManagementLinks.map((item, index) => (
              <Link
                key={`link-${index + 1}`}
                href={item.link === "#" ? item.link : BaseLink + item.link}
                className={`text-sm py-3 rounded-md w-full inline-block ${
                  path.includes(item.link) ? "bg-[#EDF7F4]" : ""
                } ${item.link === "#" ? 'text-gray-400 cursor-not-allowed' : ''} `}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion className='mt-3' sx={AccordianSummaryStyleOverride}>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          className='p-0'
          sx={{ padding: 0 }}
        >
          <div className='flex items-center gap-x-5 text-gray-400 cursor-not-allowed'>
            <Layers className='text-primary-green' />
            <p className='text-gray-400 cursor-not-allowed'>Prescription Tracking</p>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className='flex flex-col items-center text-gray-400 cursor-not-allowed'>
            <Link href='#' className='text-sm text-gray-400 cursor-not-allowed'>
              Review Issues
            </Link>
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion className='mt-3' sx={AccordianSummaryStyleOverride}>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          className='p-0'
          sx={{ padding: 0 }}
        >
          <div className='flex items-center gap-x-5'>
            <Error className='text-primary-green' />
            <p className='text-gray-400 cursor-not-allowed '>Queries & Issues</p>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className=' ml-7 flex flex-col gap-y-5'></div>
        </AccordionDetails>
      </Accordion>
      <div className='flex flex-col gap-y-3 mt-3 text-gray-400 cursor-not-allowed'>
        <div className='flex items-center gap-x-5 mt-3 cursor-pointer'>
          <UploadFile className='text-primary-green' />
          <p className=' '>Screening</p>
        </div>
        <div className='flex items-center gap-x-5 mt-3 cursor-pointer'>
          <People className='text-primary-green' />
          <p className=' '>Service Bookings</p>
        </div>
        <div className='flex items-center gap-x-5 mt-3 cursor-pointer'>
          <Settings className='text-primary-green' />
          <p className=' '>Settings</p>
        </div>
      </div>
    </div>
  );
}

export default function SideBar() {
  return (
    <div className='min-w-[256px] w-[256px] hidden lg:block bg-white py-5 px-4 h-screen rounded-tr-[92px]'>
      <div className='flex items-center gap-x-3'>
        <img src='/assets/images/logo.svg' alt='Logo' />
        <Link href='/dashboard' className=' text-primary-green text-lg'>
          <b>Pharmacy</b> OS
        </Link>
      </div>
      <SideBarLinks />
      <div className='mt-8'>
        <div className='flex justify-between p-2 pr-5 rounded-lg bg-primary-green opacity-60 pointer-events-none'>
          <div className='bg-white p-3 rounded-lg h-[45px] w-[45px] text-primary-green font-semibold'>
            37
          </div>
          <div className='flex flex-col justify-between text-white'>
            <p>Reminders</p>
            <p className='text-sm'>For completion today</p>
          </div>
        </div>
        <div className='flex justify-between p-2 pr-5 rounded-lg bg-primary-green mt-5 opacity-60 pointer-events-none cursor-pointer'>
          <div className='bg-white p-3 rounded-lg h-[45px] w-[45px] text-primary-green font-semibold'>
            30
          </div>
          <div className='flex flex-col justify-between text-white'>
            <p>Assigned Issues</p>
            <p className='text-sm'>For completion today</p>
          </div>
          {/* <Link
            href='/dashboard/review-issues'
            className='flex flex-col justify-between text-white'
          >
          </Link> */}
        </div>
      </div>
    </div>
  );
}
