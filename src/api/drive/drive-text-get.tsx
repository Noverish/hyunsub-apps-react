import { DrivePathParams } from "src/model/drive";
import { generateQuery } from "../generate-api";

const driveTextGetApi = generateQuery<DrivePathParams, string>({
  api: (params) => ({
    url: '/api/v1/download-text',
    method: 'POST',
    data: params,
    responseType: 'text',
  }),
  key: () => 'driveTextGetApi',
})

export default driveTextGetApi;
