import { generateQuery } from '../generate-api';
import { DutchSpendSum } from 'src/model/dutch';

interface DutchSpendSumParams {
  tripId: string;
}

const dutchSpendSumApi = generateQuery<DutchSpendSumParams, DutchSpendSum[]>({
  api: ({ tripId }) => ({
    url: `/api/v1/trips/${tripId}/spend-sum`,
    method: 'GET',
  }),
  key: 'dutchSpendSumApi',
});

export default dutchSpendSumApi;
