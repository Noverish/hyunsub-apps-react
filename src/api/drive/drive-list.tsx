import { DriveFileInfo, DrivePathParams } from "src/model/drive";
import { generateQuery } from "../generate-api";

const driveListApi = generateQuery<DrivePathParams, DriveFileInfo[]>({
  api: (params) => ({
    url: '/api/v1/list',
    method: 'POST',
    data: params,
  }),
  key: () => 'driveListApi',
})

export default driveListApi;
