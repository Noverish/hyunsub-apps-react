export interface DutchRecord {
  id: string;
  content: string;
  location: string;
  currency: DutchCurrency;
  date: string;
  amount: number;
  members: string[];
}

export type DutchCurrency = 'KRW' | 'JPY' | 'USD' | 'CNY' | 'TWD';
