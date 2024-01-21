import { generateQuery } from '../generate-api';
import { DutchSettleEachResult } from 'src/model/dutch';

export interface DutchSettleEachParams {
  tripId: string;
}

const dutchSettleEachApi = generateQuery<DutchSettleEachParams, DutchSettleEachResult[]>({
  api: (params) => ({
    url: `/api/v1/trips/${params.tripId}/settle/each`,
    method: 'GET',
  }),
  key: 'dutchSettleEachApi',
});

export default dutchSettleEachApi;
