import { generateApi } from 'src/api/generate-api';
import { SimpleResponse } from 'src/model/api';

export interface VideoThumbnailParams {
  videoId: string;
  time?: number;
}

const videoThumbnailApi = generateApi<VideoThumbnailParams, SimpleResponse>({
  api: (params: VideoThumbnailParams) => ({
    url: `/api/v1/videos/${params.videoId}/manage/thumbnail`,
    method: 'POST',
    data: params,
  }),
});

export default videoThumbnailApi;
