import MockDrugData from "@/mock/drugs.json";
const drugNames = Object.values(MockDrugData);

export const random = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min)) + min;

export const stockValueGenerator = () => {
  return { min: Math.random() };
};
export const mockData = Object.entries(MockDrugData)
  .slice(0, 25)
  .map((item, index) => {
    const min = random(5, 50);
    const max = random(50, 500);
    const current = random(min, max);
    const toOrder = max - current;

    return {
      id: item[0],
      name: item[1],
      status: index % 2 ? "good" : "issue",
      current_stock: { min, max, current, toOrder },
      last_order: { date: "04/06/23", price: "2,000", supplier: "Novartis" },
      rule_type: "Automatic",
      last_5_months: [
        { month: "May", value: random(15, random(20, 100)) },
        { month: "June", value: random(15, random(20, 100)) },
        { month: "Jul", value: random(15, random(20, 100)) },
        { month: "Aug", value: random(15, random(20, 100)) },
        { month: "Sept", value: random(15, random(20, 100)) },
      ],
      last_update: "12/02/2023",
    };
  });
export const idGenerator = () => {
  let r = (Math.random() + 1).toString(36).substring(7).toUpperCase();
  return r;
};
export const drugOrderHistory = [
  {
    id: 1,
    order: idGenerator(),
    order_date: "01/01/2024",
    price_container: 3.2,
    from: "AAH",
    quantity: 50,
    received: false,
    type: "preferred",
  },
  {
    id: 2,
    order: idGenerator(),
    order_date: "01/01/2024",
    price_container: 4.2,
    from: "AAH",
    quantity: 10,
    received: true,
    type: "contracted",
  },
  {
    id: 3,
    order: idGenerator(),
    order_date: "01/01/2024",
    price_container: 5.2,
    from: "AAH",
    quantity: 50,
    received: true,
    type: "other",
  },
  {
    id: 4,
    order: idGenerator(),
    order_date: "01/01/2024",
    price_container: 1.2,
    from: "AAH",
    quantity: 20,
    received: false,
    type: "preferred",
  },
  {
    id: 5,
    order: idGenerator(),
    order_date: "01/01/2024",
    price_container: 6.2,
    from: "AAH",
    quantity: 40,
    received: false,
    type: "contracted",
  },
  {
    id: 6,
    order: idGenerator(),
    order_date: "01/01/2024",
    price_container: 8.2,
    from: "AAH",
    quantity: 60,
    received: true,
    type: "other",
  },
  {
    id: 7,
    order: idGenerator(),
    order_date: "01/01/2024",
    price_container: 4.2,
    from: "AAH",
    quantity: 40,
    received: false,
    type: "preferred",
  },
  {
    id: 8,
    order: idGenerator(),
    order_date: "01/01/2024",
    price_container: 2.2,
    from: "AAH",
    quantity: 80,
    received: false,
    type: "contracted",
  },
  {
    id: 9,
    order: idGenerator(),
    order_date: "01/01/2024",
    price_container: 9.2,
    from: "AAH",
    quantity: 90,
    received: true,
    type: "preferred",
  },
];
export const dateFormatter = (date: number) => {
  return [
    new Date(date).toLocaleDateString([], {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    }),
    new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  ];
};
export const drugReportingData = [
  {
    id: idGenerator(),
    month: 0,
    purchased_quantity: 0,
    purchased_value: 0,
    dispensed_quantity: 8,
    dispensed_value: 3.9,
  },
  {
    month: 1,
    id: idGenerator(),
    purchased_quantity: 10,
    purchased_value: 110,
    dispensed_quantity: 4,
    dispensed_value: 7.6,
  },
  {
    month: 2,
    id: idGenerator(),
    purchased_quantity: 20,
    purchased_value: 210,
    dispensed_quantity: 9,
    dispensed_value: 4.3,
  },
  {
    month: 3,
    id: idGenerator(),
    purchased_quantity: 30,
    purchased_value: 310,
    dispensed_quantity: 12,
    dispensed_value: 9.8,
  },
  {
    month: 4,
    id: idGenerator(),
    purchased_quantity: 40,
    purchased_value: 410,
    dispensed_quantity: 4.3,
    dispensed_value: 6.6,
  },
];
export const reviewIssuesFilters = [
  {
    label: "Issues for today",
    value: "today",
  },
  {
    label: "Rule needs attention",
    value: "attention",
  },
  {
    label: "LT supply issue",
    value: "supply_issue",
  },
  {
    label: "Order overdue",
    value: "overdue",
  },
];
export const drugIssues = Array(10)
  .fill(1)
  .map((item, index) => ({
    id: index + 1,
    rule_attention: reviewIssuesFilters[random(0, 2)].value,
    name: drugNames[index],
    description_and_action:
      "We suggest you increase your stock holding for this drug. Reasons: This drug has a high variability in throughput Generally has a long expiry Is often out of stock.",
    progress: "In progress",
    created_by: "System",
    notes: "Increased min stock value to 20",
    assigned_by: "Bill Gates",
    issue_date: Date.now(),
    due_date: Date.now(),
  }));

export const MonthIndexToLabelAbbr = [
  "Jan",
  "Feb",
  "Mar",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
export const MonthIndexToLabel = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
