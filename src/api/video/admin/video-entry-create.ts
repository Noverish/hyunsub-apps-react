import { generateApi } from "src/api/generate-api";
import { VideoEntry } from "src/model/video";

export interface VideoEntryCreateParams {
  name: string;
  thumbnail?: string;
  category: string;
  videoGroupId?: string;
}

const videoEntryCreateApi = generateApi<VideoEntryCreateParams, VideoEntry>(params => ({
  url: '/api/v1/entries',
  method: 'POST',
  data: params,
}));

export default videoEntryCreateApi;
