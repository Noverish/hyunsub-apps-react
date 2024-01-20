import { generateInfiniteQuery } from '../generate-infinite-query';
import { DutchCurrency, DutchRecordPreview } from 'src/model/dutch';

interface DutchRecordSearchParams {
  tripId: string;
  query?: string;
  currency?: DutchCurrency;
}

const dutchRecordSearchApi = generateInfiniteQuery<DutchRecordSearchParams, DutchRecordPreview>({
  api: (params) => ({
    url: `/api/v1/trips/${params.tripId}/search/records`,
    method: 'POST',
    data: params,
  }),
  key: 'dutchRecordSearchApi',
});

export default dutchRecordSearchApi;
