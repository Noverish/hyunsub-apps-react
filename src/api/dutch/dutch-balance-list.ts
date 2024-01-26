import { generateQuery } from '../generate-api';
import { DutchBalance } from 'src/model/dutch';

interface DutchBalanceListParams {
  tripId: string;
}

const dutchBalanceListApi = generateQuery<DutchBalanceListParams, DutchBalance[]>({
  api: (params) => ({
    url: `/api/v1/trips/${params.tripId}/balances`,
    method: 'GET',
    params,
  }),
  key: 'dutchBalanceListApi',
});

export default dutchBalanceListApi;
