import { generateApi } from 'src/api/generate-api';

export interface VideoThumbnailParams {
  videoId: string;
  time?: number;
}

const videoThumbnailApi = generateApi<VideoThumbnailParams, any>(({ videoId, ...data }) => ({
  url: `/api/v1/videos/${videoId}/manage/thumbnail`,
  method: 'POST',
  data,
}));

export default videoThumbnailApi;
