import { t } from 'i18next';

export interface DutchRecordPreview {
  id: string;
  content: string;
  location: string;
  currency: DutchCurrency;
  payment: DutchPayment;
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

export const dutchPaymentList: DutchPayment[] = ['CARD', 'CASH'];

export type DutchPayment = 'CARD' | 'CASH';

export function dutchPaymentStr(v: DutchPayment): string {
  switch (v) {
    case 'CARD':
      return t('DutchPayment.card');
    case 'CASH':
      return t('DutchPayment.cash');
  }
}

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
  payment: DutchPayment;
  date: string;
  members: DutchRecordMemberParams[];
}

export interface DutchRecordMemberParams {
  memberId: string;
  actual: number;
  should: number;
}

export type DutchSettleResult = Record<string, number>;

export interface DutchSettleEachResult {
  currency: DutchCurrency;
  shares: DutchSettleEachResultShare[];
}

export interface DutchSettleEachResultShare {
  memberId: string;
  should: number;
  actual: number;
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

export interface DutchTripDetail {
  id: string;
  name: string;
  tripCurrency: DutchCurrency;
  settleCurrency: DutchCurrency;
}

export interface DutchTripCurrency {
  currency: DutchCurrency;
  rate: number | null;
}
