import { generateApi } from '../generate-api';

export interface DriveRemoveParams {
  paths: string[];
}

const driveRemoveBulkApi = generateApi<DriveRemoveParams, any>((params) => ({
  url: '/api/v1/remove-bulk',
  method: 'POST',
  data: params,
}));

export default driveRemoveBulkApi;
