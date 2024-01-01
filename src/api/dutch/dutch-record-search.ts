import { generateQuery } from '../generate-api';
import { PageData } from 'src/model/api';
import { DutchRecordPreview } from 'src/model/dutch';

interface DutchRecordSearchParams {
  tripId: string;
  query?: string;
  page?: string;
}

const dutchRecordSearchApi = generateQuery<DutchRecordSearchParams, PageData<DutchRecordPreview>>({
  api: (params) => ({
    url: `/api/v1/search/records`,
    method: 'POST',
    data: params,
  }),
  key: 'dutchRecordSearchApi',
});

export default dutchRecordSearchApi;
