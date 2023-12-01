import { generateApi } from '../generate-api';
import { SimpleResponse } from 'src/model/api';

export interface DriveMoveBulkParams {
  from: string;
  to: string;
  files: string[];
}

const driveMoveBulkApi = generateApi<DriveMoveBulkParams, SimpleResponse>({
  api: (params) => ({
    url: '/api/v1/move-bulk',
    method: 'POST',
    data: params,
  }),
});

export default driveMoveBulkApi;
