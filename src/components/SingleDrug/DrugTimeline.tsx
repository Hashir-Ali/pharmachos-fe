import dayjs from 'dayjs';
import Link from 'next/link';

import { IOrder } from '@/types';
import { ShoppingCart } from '@mui/icons-material';
import Timeline from '@mui/lab/Timeline';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import { Alert } from '@mui/material';

const TimelineStyleOverride = {
  [`& .${timelineItemClasses.root}:before`]: {
    flex: 0,
    padding: 0,
  },
};
const TimelineSeparatorStyleOverride = {
  [".MuiTimelineConnector-root"]: {
    height: "60px",
    margin: " 20px 0 20px 0",
  },
};

type FCProps = {
  data: IOrder[] | undefined;
};

export default function DrugTimelime({ data }: FCProps) {
  if (!data || !data.length)
    return (
      <div className='flex justify-center py-8'>
        <Alert severity='warning'>
          Order History does not exist for this drug!
        </Alert>
      </div>
    );

  return (
    <Timeline className='mt-5' sx={TimelineStyleOverride}>
      {data.slice(0, 5).map((item, index) => (
        <TimelineItem key={`tl-${item._id}`}>
          <TimelineSeparator sx={TimelineSeparatorStyleOverride}>
            <TimelineDot className='bg-transparent shadow-none m-0'>
              <ShoppingCart className='text-secondary-green' fontSize='large' />
            </TimelineDot>
            {data.length !== index + 1 && (
              <TimelineConnector className='bg-secondary-green w-[2px]' />
            )}
          </TimelineSeparator>
          <TimelineContent>
            <div className='flex gap-x-8'>
              <div>
                <p className=' text-gray-600 mb-1 text-sm'>
                  {dayjs(item.Updated_at).format("DD MMM YYYY")}
                </p>
                <p className=' text-gray-600 text-sm'>
                  {dayjs(item.Updated_at).format("hh:mm a")}
                </p>
              </div>
              <div>
                <h1 className='text-gray-700 font-semibold'>
                  {item.ordered_by.first_name + " " + item.ordered_by.last_name}{" "}
                  placed an order.
                </h1>
                <p className='text-gray-600'>
                  {item.quantityOrdered} units for &pound;{item.cost} from{" "}
                  {item.From}.
                </p>
                <p className='text-gray-600'>
                  Order expected to arrive on{" "}
                  {dayjs(item.expected_delivery_date).format("DD/MM/YYYY")}
                </p>
                <div className='flex justify-end'>
                  <Link href='#' className='mt-5 text-gray-400 cursor-not-allowed'>
                    <b>View more</b>
                  </Link>
                </div>
              </div>
            </div>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
}
