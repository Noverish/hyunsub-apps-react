import { generateApi } from '../generate-api';
import { SimpleResponse } from 'src/model/api';
import { DrivePathParams } from 'src/model/drive';

const driveNewFolderApi = generateApi<DrivePathParams, SimpleResponse>({
  api: (params) => ({
    url: '/api/v1/new-folder',
    method: 'POST',
    data: params,
  }),
});

export default driveNewFolderApi;
