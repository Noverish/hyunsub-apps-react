import { generateApi } from "../generate-api";

export interface DriveUploadSessionParams {
  path: string;
}

export interface DriveUploadSessionResult {
  sessionKey: string;
}

const driveUploadSessionApi = generateApi<DriveUploadSessionParams, DriveUploadSessionResult>((params) => ({
  url: '/api/v1/upload-session',
  method: 'POST',
  data: params,
}));

export default driveUploadSessionApi;
