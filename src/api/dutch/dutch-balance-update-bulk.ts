import { generateApi } from '../generate-api';
import dutchBalanceListApi from './dutch-balance-list';
import { DutchBalance, DutchCurrency } from 'src/model/dutch';

export interface DutchBalanceUpdateBulkParams {
  tripId: string;
  data: DutchBalanceUpdateBulkParamsData[];
}

export interface DutchBalanceUpdateBulkParamsData {
  currency: DutchCurrency;
  amount: number;
}

const dutchBalanceUpdateBulkApi = generateApi<DutchBalanceUpdateBulkParams, DutchBalance[]>({
  api: (params) => ({
    url: `/api/v1/trips/${params.tripId}/_bulk/balances`,
    method: 'PUT',
    data: params,
  }),
  postHandle: (result, params) => {
    const tripId = params.tripId;
    dutchBalanceListApi.setCache({ tripId }, result);
  },
});

export default dutchBalanceUpdateBulkApi;
