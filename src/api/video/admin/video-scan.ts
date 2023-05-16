import { generateApi } from "src/api/generate-api";

export interface VideoScanParams {
  entryId: string;
}

const videoScanApi = generateApi<VideoScanParams, any>((params) => ({
  url: `/api/v1/scan`,
  method: 'POST',
  data: params,
}));

export default videoScanApi;
