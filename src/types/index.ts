export interface IDrugData {
  _id: string;
  created_at: Date;
  Updated_at: Date;
  is_enabled: boolean;
  name: string;
  dosage: number;
  dosageUnit: string;
  dosageForm: string;
  BNFCode: string;
  fullDescription: string;
  containerSize: number;
  location: string;
  drugEAN: number;
  orders: IOrder[];
  distributors: IDistributor[];
  stock: IStock;
  passThrough: IPassThrough;
  monthlyStockLevels: { [key: string]: number };
}
export interface IPassThrough {
  thisMonth: number;
  lastMonth: number;
  fiveMonths: number;
  lastYear: number;
  allTime: number;
}
export interface IDistributor {
  _id: string;
  created_at: Date;
  Updated_at: Date;
  is_enabled: boolean;
  distributorId: string;
  drugId: string;
  type: string;
  is_preferred: boolean;
  name: string;
  NHS_Contract_End_Date: Date;
}
export interface IStock {
  _id: string;
  created_at: Date;
  Updated_at: Date;
  is_enabled: boolean;
  drugId: string;
  stockRuleMin: number;
  stockRuleMax: number;
  currentStock: number;
  LooseUnits: number;
  onOrder: number;
  newStock: number;
}
export interface IOrder {
  _id: string;
  created_at: Date;
  Updated_at: Date;
  is_enabled: boolean;
  supplierId: string;
  drugId: string;
  ordered_by: IOrderedBy;
  quantityOrdered: number;
  quantityReceived: number;
  cost: number;
  isReceived: boolean;
  expected_delivery_date: Date;
  From: string;
  type: null;
}
export interface IOrderedBy {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  roles: string[];
}
export interface IReporting {
  purchased: IReportingData;
  dispensed: IReportingData;
}

export interface IReportingData {
  quantity: number;
  value: number;
}
