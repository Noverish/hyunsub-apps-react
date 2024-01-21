import { generateApi } from '../generate-api';
import { DutchSettleResult } from 'src/model/dutch';

export interface DutchSettleParams {
  tripId: string;
  mainMemberId: string;
}

const dutchSettleApi = generateApi<DutchSettleParams, DutchSettleResult>({
  api: (params) => ({
    url: `/api/v1/trips/${params.tripId}/settle`,
    method: 'POST',
    data: params,
  }),
});

export default dutchSettleApi;
