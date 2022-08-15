import { generateApi } from "../generate-api";

export interface VideoScanMetadataParams {
  videoId: string;
}

const scanVideoMetadata = generateApi<VideoScanMetadataParams, any>(params => ({
  url: `/api/v1/metadata/scan`,
  method: 'POST',
  data: params,
}));

export default scanVideoMetadata;
