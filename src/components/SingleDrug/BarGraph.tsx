import {
  MonthIndexToLabel,
  MonthIndexToLabelAbbr,
} from "@/utility/mockDataGenerator";

interface Props {
  stockValues: Record<number, number>;
  width?: number;
  maxHeight?: number;
}
interface PastValues {
  month: string;
  value: number;
}

export default function BarGraph({
  stockValues,
  width = 24,
  maxHeight = 65,
}: Props) {
  const mappedValues = Object.entries(stockValues).map(([month, value]) => ({
    month: MonthIndexToLabelAbbr[Number(month)],
    value,
  }));
  // Show last 5 months only
  const m2 = mappedValues. slice(-5);
  const valuesArray = m2.map((obj) => obj.value);
  const maxValue = Math.max(...valuesArray);
  if(!mappedValues) return <>No Data</>;
  return (
    <div className="flex flex-col items-center mr-8">
      <div className="flex gap-x-2 rotate-180">
        {m2.map((item, index) => {
          return (
            <div key={item.month} style={{ height: `${maxHeight}px` }}>
              <div
                className="bg-primary-green rounded-bl-sm rounded-br-sm"
                style={{
                  height: `${(item.value/maxValue) * 100}%`,
                  width: `${width}px`,
                }}
              >
                <p className="text-white text-center text-xs rotate-180">
                  {item.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex gap-x-1 ">
        {m2.map((item) => (
          <p className=" text-gray-600" key={`para-${item.month}`}>
            {item.month}
          </p>
        ))}
      </div>
    </div>
  );
}
