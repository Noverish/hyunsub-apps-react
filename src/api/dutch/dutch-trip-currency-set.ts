import { generateApi } from '../generate-api';
import dutchTripCurrencyListApi from './dutch-trip-currency-list';
import { DutchCurrency, DutchTripCurrency } from 'src/model/dutch';

export interface DutchTripCurrencySetParams {
  tripId: string;
  currency: DutchCurrency;
  rate: number;
}

const dutchTripCurrencySetApi = generateApi<DutchTripCurrencySetParams, DutchTripCurrency>({
  api: (params) => ({
    url: `/api/v1/trips/${params.tripId}/currencies/${params.currency}`,
    method: 'PUT',
    data: params,
  }),
  postHandle: () => {
    dutchTripCurrencyListApi.invalidate();
  },
});

export default dutchTripCurrencySetApi;
