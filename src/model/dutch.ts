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

export const dutchCurrencyList = ['KRW', 'JPY', 'USD', 'CNY', 'TWD'];

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
  currency: string;
  date: string;
  members: DutchRecordMemberParams[];
}

export interface DutchRecordMemberParams {
  memberId: string;
  actual: number;
  should: number;
}
