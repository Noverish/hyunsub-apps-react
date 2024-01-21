import { generateQuery } from '../generate-api';
import { DutchTripCurrency } from 'src/model/dutch';

interface DutchTripCurrencyListParams {
  tripId: string;
}

const dutchTripCurrencyListApi = generateQuery<DutchTripCurrencyListParams, DutchTripCurrency[]>({
  api: (params) => ({
    url: `/api/v1/trips/${params.tripId}/currencies`,
    method: 'GET',
    params,
  }),
  key: 'dutchTripCurrencyListApi',
});

export default dutchTripCurrencyListApi;
