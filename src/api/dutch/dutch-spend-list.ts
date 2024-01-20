import { generateInfiniteQuery } from '../generate-infinite-query';
import { DutchSpend } from 'src/model/dutch';

interface DutchSpendListParams {
  tripId: string;
}

const dutchSpendListhApi = generateInfiniteQuery<DutchSpendListParams, DutchSpend>({
  api: (params) => ({
    url: `/api/v1/trips/${params.tripId}/spends`,
    method: 'GET',
    params,
  }),
  key: 'dutchSpendListhApi',
});

export default dutchSpendListhApi;
