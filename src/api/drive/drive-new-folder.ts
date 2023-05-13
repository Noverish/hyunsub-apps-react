import { generateApi } from '../generate-api';
import { DrivePathParams } from 'src/model/drive';

const driveNewFolderApi = generateApi<DrivePathParams, any>((params) => ({
  url: '/api/v1/new-folder',
  method: 'POST',
  data: params,
}));

export default driveNewFolderApi;
