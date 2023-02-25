import { generateApi } from "src/api/generate-api";

export interface VideoThumbnailParams {
  videoId: string;
  time?: number;
}

const videoThumbnail = generateApi<VideoThumbnailParams, any>(data => ({
  url: `/api/v1/admin/video-thumbnail`,
  method: 'POST',
  data,
}));

export default videoThumbnail;
