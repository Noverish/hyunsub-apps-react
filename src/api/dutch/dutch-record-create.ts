import { generateApi } from '../generate-api';
import dutchRecordDetailApi from './dutch-record-detail';
import dutchRecordSearchApi from './dutch-record-search';
import { DutchRecord } from 'src/model/dutch';

export interface DutchRecordCreateParams {
  tripId: string;
  content: string;
  location: string;
  currency: string;
  date: string;
  members: DutchRecordMemberCreateParams[];
}

export interface DutchRecordMemberCreateParams {
  memberId: string;
  actual: number;
  should: number;
}

const dutchRecordCreateApi = generateApi<DutchRecordCreateParams, DutchRecord>({
  api: (params) => ({
    url: `/api/v1/trips/${params.tripId}/records`,
    method: 'POST',
    data: params,
  }),
  postHandle: (result, params) => {
    const tripId = params.tripId;
    const recordId = result.id;
    dutchRecordDetailApi.setCache({ tripId, recordId }, result);
    dutchRecordSearchApi.clearCache();
  },
});

export default dutchRecordCreateApi;
