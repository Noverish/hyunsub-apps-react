import { generateApi } from '../generate-api';

export interface DriveMoveBulkParams {
  from: string;
  to: string;
  files: string[];
}

const driveMoveBulkApi = generateApi<DriveMoveBulkParams, any>((params) => ({
  url: '/api/v1/move-bulk',
  method: 'POST',
  data: params,
}));

export default driveMoveBulkApi;
