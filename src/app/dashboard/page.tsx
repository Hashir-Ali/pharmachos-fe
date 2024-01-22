import { SxProps } from "@mui/material";
import {
  SpaceDashboardOutlined,
  Info,
  ShoppingCart,
  TableRows,
  Layers,
  ContentPaste,
} from "@mui/icons-material";
import Card from "@/components/Dashboard/Card";
const IconClassName: string = "text-secondary-green";
const IconCustomStyle: SxProps = { fontSize: 56 };

const CardOptions = [
  {
    title: "Browse Drugs",
    link: "/dashboard/stocks/browse-drugs",
    icon: (
      <SpaceDashboardOutlined className={IconClassName} sx={IconCustomStyle} />
    ),
    isAvailable: true,
  },
  {
    title: "Review Issues",
    link: "/dashboard/review-issues",
    icon: <Info className={IconClassName} sx={IconCustomStyle} />,
    isAvailable: true,
  },
  {
    title: "Ordering",
    link: "",
    icon: <ShoppingCart className={IconClassName} sx={IconCustomStyle} />,
    isAvailable: false,
  },
  {
    title: "Reporting",
    link: "",
    icon: <TableRows className={IconClassName} sx={IconCustomStyle} />,
    isAvailable: false,
  },
  {
    title: "Analytics",
    link: "",
    icon: <Layers className={IconClassName} sx={IconCustomStyle} />,
    isAvailable: false,
  },
  {
    title: "Action Log",
    link: "",
    icon: <ContentPaste className={IconClassName} sx={IconCustomStyle} />,
    isAvailable: false,
  },
];

export default function Dashboard() {
  return (
    <div className='mx-5'>
      <div className='p-8 lg:p-6 mt-8 bg-white rounded-xl'>
        <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4'>
          {CardOptions.map((item, index) => (
            <div
              key={`card-${index + 1}`}
              className={
                item.isAvailable ? "" : " opacity-50 pointer-events-none"
              }
            >
              <Card {...item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
