import { generateApi } from "../generate-api";

export interface VideoThumbnailParams {
  videoId: string;
  time?: number;
}

export interface VideoThumbnailResult {
  result: string;
}

const videoThumbnail = generateApi<VideoThumbnailParams, VideoThumbnailResult>(data => ({
  url: `/api/v1/admin/video-thumbnail`,
  method: 'POST',
  data,
}));

export default videoThumbnail;
