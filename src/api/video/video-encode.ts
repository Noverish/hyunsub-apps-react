import { generateApi } from "src/api/generate-api";

export interface VideoEncodeParams {
  videoId: string;
  options: string;
}

const videoEncode = generateApi<VideoEncodeParams, any>(params => ({
  url: `/api/v1/encode`,
  method: 'POST',
  data: params,
}));

export default videoEncode;
