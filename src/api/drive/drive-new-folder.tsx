import { DrivePathParams } from 'src/model/drive';
import { generateApi } from "../generate-api";

const driveNewFolderApi = generateApi<DrivePathParams, any>((params) => ({
  url: '/api/v1/new-folder',
  method: 'POST',
  data: params,
}))

export default driveNewFolderApi;
