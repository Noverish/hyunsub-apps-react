import { generateApi } from '../generate-api';
import { SimpleResponse } from 'src/model/api';

export interface DriveRemoveParams {
  paths: string[];
}

const driveRemoveBulkApi = generateApi<DriveRemoveParams, SimpleResponse>({
  api: (params) => ({
    url: '/api/v1/remove-bulk',
    method: 'POST',
    data: params,
  }),
});

export default driveRemoveBulkApi;
