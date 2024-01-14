import { generateApi } from '../generate-api';
import dutchRecordDetailApi from './dutch-record-detail';
import dutchRecordSearchApi from './dutch-record-search';
import { DutchRecordDetail, DutchRecordParams } from 'src/model/dutch';

export interface DutchRecordCreateParams extends DutchRecordParams {
  tripId: string;
}

const dutchRecordCreateApi = generateApi<DutchRecordCreateParams, DutchRecordDetail>({
  api: (params) => ({
    url: `/api/v1/trips/${params.tripId}/records`,
    method: 'POST',
    data: params,
  }),
  postHandle: (result, params) => {
    const tripId = params.tripId;
    const recordId = result.record.id;
    dutchRecordDetailApi.setCache({ tripId, recordId }, result);
    dutchRecordSearchApi.clearCache();
  },
});

export default dutchRecordCreateApi;
