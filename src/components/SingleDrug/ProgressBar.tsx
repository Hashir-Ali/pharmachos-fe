import { random } from "@/utility/mockDataGenerator";
import { Tooltip, Typography } from "@mui/material";
import React from "react";
import { useEffect, useRef, useState } from "react";

interface Props {
  currentStock: number;
  stockRuleMin: number;
  stockRuleMax: number;
  toOrder?: number;
}

const leftDotClass =
  "bg-white h-[6px] w-[6px] rounded-full absolute top-1/2 transform -translate-y-1/2 left-6 z-10";
const rightDotClass =
  "bg-primary-green h-[6px] w-[6px] rounded-full absolute top-1/2 transform -translate-y-1/2 right-6 z-10";

export default function ProgressBar({ currentStock, stockRuleMin, stockRuleMax }: Props) {
  const ProgressContainerWidth = useRef<HTMLDivElement>(null);
  const [progressBarWidth, setProgressBarWidth] = useState<number>(0);

  useEffect(() => {
    if (!ProgressContainerWidth.current) return;
    setProgressBarWidth(ProgressContainerWidth.current?.clientWidth || 0);
  }, []);

  // Cause of  dumbasss BE response
  const maxValue = stockRuleMax < stockRuleMin ? stockRuleMax + stockRuleMin : stockRuleMax;
  const currentValue =
    stockRuleMin > stockRuleMax ? random(stockRuleMin + 10, maxValue - 10) : stockRuleMin;

  const currentPBWidth =
    progressBarWidth && maxValue > 0
      ? Math.round((currentValue / maxValue) * progressBarWidth)
      : 0;

  return (
    <div>
      <div className='flex justify-between mx-3 mb-1'>
        <span className=' font-bold'>MIN</span>
        <span className=' font-bold'>MAX</span>
      </div>
      <Tooltip arrow title={<Typography color="inherit">{`Current Stock: ${currentStock}`}</Typography>}>
      <div
        className=' bg-gray-200 rounded-[42px] h-[22px] w-full flex items-center relative progress-bar'
        ref={ProgressContainerWidth}
      >
        <div className={leftDotClass}></div>
        <div className={rightDotClass}></div>
        <div
          className={`${
            currentValue < stockRuleMin ? "bg-primary-red" : "bg-primary-green "
          } h-[16px] rounded-tl-[42px] rounded-bl-[42px] ml-1`}
          style={{ width: `${currentPBWidth}%` }}
        ></div>
        {/* <div
          className=' bg-gray-300 h-[16px] mr-1'
          style={{ width: `${toOrderPBWidth}px` }}
        ></div> */}
      </div>
        </Tooltip>
      <div className='flex justify-between mx-5 mt-2 mb-1'>
        <span className=' font-bold'>{stockRuleMin}</span>
        <span className=' font-bold'>{maxValue}</span>
      </div>
    </div>
  );
}
