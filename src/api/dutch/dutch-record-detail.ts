import { generateQuery } from '../generate-api';
import { DutchRecord } from 'src/model/dutch';

interface DutchRecordDetailParams {
  tripId: string;
  recordId: string;
}

const dutchRecordDetailApi = generateQuery<DutchRecordDetailParams, DutchRecord | null>({
  api: ({ tripId, recordId }) => ({
    url: `/api/v1/trips/${tripId}/records/${recordId}`,
    method: 'GET',
  }),
  key: 'dutchRecordDetailApi',
});

export default dutchRecordDetailApi;
