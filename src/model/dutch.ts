export interface DutchRecordPreview {
  id: string;
  content: string;
  location: string;
  currency: DutchCurrency;
  date: string;
  amount: number;
  members: string[];
}

export interface DutchRecordDetail {
  record: DutchRecordPreview;
  members: DutchRecordMember[];
}

export const dutchCurrencyList: DutchCurrency[] = ['KRW', 'JPY', 'USD', 'CNY', 'TWD'];

export type DutchCurrency = 'KRW' | 'JPY' | 'USD' | 'CNY' | 'TWD';

export interface DutchRecordMember {
  recordId: string;
  memberId: string;
  actual: number;
  should: number;
  name: string;
}

export interface DutchMember {
  id: string;
  name: string;
}

export interface DutchRecordParams {
  content: string;
  location: string;
  currency: DutchCurrency;
  date: string;
  members: DutchRecordMemberParams[];
}

export interface DutchRecordMemberParams {
  memberId: string;
  actual: number;
  should: number;
}

export interface DutchSettleResult {
  currency: DutchCurrency;
  shares: DutchSettleResultShare[];
}

export interface DutchSettleResultShare {
  memberId: string;
  amount: number;
}

export interface DutchSpend {
  recordId: string;
  content: string;
  location: string;
  date: string;
  currency: DutchCurrency;
  actual: number;
  should: number;
}

export interface DutchSpendSum {
  currency: DutchCurrency;
  actual: number;
  should: number;
}

export interface DutchTripDetail {
  id: string;
  name: string;
  tripCurrency: DutchCurrency;
  settleCurrency: DutchCurrency;
}
