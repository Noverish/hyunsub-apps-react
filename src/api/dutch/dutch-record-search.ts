import { generateQuery } from '../generate-api';
import { PageData } from 'src/model/api';
import { DutchRecord } from 'src/model/dutch';

interface DutchRecordSearchParams {
  tripId: string;
  query?: string;
  page?: string;
}

const dutchRecordSearchApi = generateQuery<DutchRecordSearchParams, PageData<DutchRecord>>({
  api: (params) => ({
    url: `/api/v1/search/records`,
    method: 'POST',
    data: params,
  }),
  key: 'dutchRecordSearchApi',
});

export default dutchRecordSearchApi;
