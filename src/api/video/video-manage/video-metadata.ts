import { generateApi } from 'src/api/generate-api';

export interface VideoMetadataParams {
  videoId: string;
}

const videoMetadataApi = generateApi<VideoMetadataParams, any>(({ videoId }) => ({
  url: `/api/v1/videos/${videoId}/manage/metadata`,
  method: 'POST',
}));

export default videoMetadataApi;
