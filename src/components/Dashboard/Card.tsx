import { ReactElement } from "react";
import { SvgIconProps } from "@mui/material";
import Link from "next/link";

type Props = { title: string; icon: ReactElement<SvgIconProps>; link: string };

export default function Card({ title, icon, link }: Props) {
  return (
    <div className=' bg-light-green flex justify-between h-[120px] rounded-lg border p-6 lg:p-3 border-primary-green'>
      <div className='flex flex-col justify-center'>
        {icon}
        <h1 className=' mt-3 font-semibold text-gray-800 text-lg leading-5'>
          {title}
        </h1>
      </div>
      <div>
        <Link
          href={link}
          className='bg-primary-green p-2 h-full flex items-center justify-center w-[90px] max-h-[90px] rounded-lg text-white'
        >
          View
        </Link>
      </div>
    </div>
  );
}
