import { generateApi } from 'src/api/generate-api';

export interface VideoEncodeParams {
  videoId: string;
  options: string;
}

const videoEncodeApi = generateApi<VideoEncodeParams, any>(({ videoId, ...data }) => ({
  url: `/api/v1/videos/${videoId}/manage/encode`,
  method: 'POST',
  data,
}));

export default videoEncodeApi;
