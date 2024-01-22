"use client";
import {
  MouseEvent,
  useState,
} from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import useLogout from '@/hooks/useLogout';
import drugs from '@/mock/drugs.json';
import {
  LockOpenOutlined,
  NotificationsOutlined,
} from '@mui/icons-material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

interface Props {
  first_name?: string;
  last_name?: string;
}

const RouteToLabel: Record<string, string> = {
  "": "Stock Management",
  dashboard: "Dashboard",
  stocks: "Stock Management",
  "browse-drugs": "Browse Drugs",
  "review-issues": "Review Issues",
};

const RouteToLink: Record<string, string> = {
  "": "/stocks",
  dashboard: "/dashboard",
  stocks: "/dashboard/stocks",
  "browse-drugs": "/dashboard/stocks/browse-drugs",
  "review-issues": "/dashboard/review-issues",
};

const MockDrugs = drugs as Record<string, string>;

export default function Header({ first_name, last_name }: Props) {
  const path = usePathname();
  const logout = useLogout();

  const subpaths = path.split('/').filter( path => path )
  
  const lastPath = subpaths[subpaths.length - 1];
  // const doesMedicineIDExist =
  //   (subpaths.includes("browse-drugs") && subpaths[2]) || "";
  const drugName = subpaths[3] || "";
  const firstHalf = drugName.split(" ")[0];
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <header className="flex items-center justify-between h-20 pr-5 ml-5">
      <div className="flex">
        {path &&
          subpaths?.map((item, index) => (
            <div key={`Link-${item}`} className="flex">
              <Link
                href={item in RouteToLink ? RouteToLink[item] : "#"}
                className={`hover:underline ${
                  lastPath === item ? "" : "opacity-60"
                }`}
              >
                {RouteToLabel[item]}
              </Link>
              {index !== subpaths.length - 1 && (
                <p className="mx-2 opacity-60">/</p>
              )}
            </div>
          ))}
        <Link href="#">{firstHalf}</Link>
      </div>
        <>
          <div className="flex justify-center items-center gap-x-3">
            <NotificationsOutlined className=" text-gray-800" />
            <p>
              {first_name} {last_name}
            </p>
            <div
              id="demo-positioned-button"
              aria-controls={open ? "demo-positioned-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              className=" bg-primary-green rounded-full h-10 w-10 text-white flex items-center justify-center cursor-pointer"
            >
              {first_name?.charAt(0)}
              {last_name?.charAt(0)}
            </div>
          </div>
          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem dense onClick={logout} disableRipple>
              <LockOpenOutlined className="mr-3" /> Logout
            </MenuItem>
          </Menu>
        </>
    </header>
  );
}
