import { generateApi } from '../generate-api';
import dutchRecordDetailApi from './dutch-record-detail';
import dutchRecordSearchApi from './dutch-record-search';
import { DutchRecordDetail, DutchRecordParams } from 'src/model/dutch';

export interface DutchRecordUpdateParams extends DutchRecordParams {
  tripId: string;
  recordId: string;
}

const dutchRecordUpdateApi = generateApi<DutchRecordUpdateParams, DutchRecordDetail>({
  api: (params) => ({
    url: `/api/v1/trips/${params.tripId}/records/${params.recordId}`,
    method: 'PUT',
    data: params,
  }),
  postHandle: (result, params) => {
    const tripId = params.tripId;
    const recordId = result.record.id;
    dutchRecordDetailApi.setCache({ tripId, recordId }, result);
    dutchRecordSearchApi.clearCache();
  },
});

export default dutchRecordUpdateApi;
