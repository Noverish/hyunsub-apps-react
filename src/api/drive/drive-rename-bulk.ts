import { generateApi } from '../generate-api';

export interface DriveRenameBulkParams {
  path: string;
  renames: DriveRenameBulkParamsData[];
}

export interface DriveRenameBulkParamsData {
  from: string;
  to: string;
}

const driveRenameBulkApi = generateApi<DriveRenameBulkParams, any>({
  api: (params) => ({
    url: '/api/v1/rename-bulk',
    method: 'POST',
    data: params,
  }),
});

export default driveRenameBulkApi;
