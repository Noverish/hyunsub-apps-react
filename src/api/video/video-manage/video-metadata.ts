import { generateApi } from 'src/api/generate-api';
import { SimpleResponse } from 'src/model/api';

export interface VideoMetadataParams {
  videoId: string;
}

const videoMetadataApi = generateApi<VideoMetadataParams, SimpleResponse>({
  api: ({ videoId }) => ({
    url: `/api/v1/videos/${videoId}/manage/metadata`,
    method: 'POST',
  }),
});

export default videoMetadataApi;
