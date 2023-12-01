import { generateApi } from '../generate-api';
import { SimpleResponse } from 'src/model/api';

export interface DriveRenameBulkParams {
  path: string;
  renames: DriveRenameBulkParamsData[];
}

export interface DriveRenameBulkParamsData {
  from: string;
  to: string;
}

const driveRenameBulkApi = generateApi<DriveRenameBulkParams, SimpleResponse>({
  api: (params) => ({
    url: '/api/v1/rename-bulk',
    method: 'POST',
    data: params,
  }),
});

export default driveRenameBulkApi;
