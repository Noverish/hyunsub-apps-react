import { generateApi } from "src/api/generate-api";

export interface VideoScanMetadataParams {
  videoId: string;
}

const videoMetadataScan = generateApi<VideoScanMetadataParams, any>(params => ({
  url: `/api/v1/metadata/scan`,
  method: 'POST',
  data: params,
}));

export default videoMetadataScan;
