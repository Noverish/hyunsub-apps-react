import { generateApi } from '../generate-api';
import dutchRecordDetailApi from './dutch-record-detail';
import dutchRecordMembersApi from './dutch-record-members';
import dutchRecordSearchApi from './dutch-record-search';
import { DutchRecord } from 'src/model/dutch';

export interface DutchRecordDeleteParams {
  tripId: string;
  recordId: string;
}

const dutchRecordDeleteApi = generateApi<DutchRecordDeleteParams, DutchRecord>({
  api: (params) => ({
    url: `/api/v1/trips/${params.tripId}/records/${params.recordId}`,
    method: 'DELETE',
  }),
  postHandle: (result, params) => {
    const tripId = params.tripId;
    const recordId = result.id;
    dutchRecordDetailApi.setCache({ tripId, recordId }, null);
    dutchRecordMembersApi.setCache({ recordId }, []);
    dutchRecordSearchApi.clearCache();
  },
});

export default dutchRecordDeleteApi;
