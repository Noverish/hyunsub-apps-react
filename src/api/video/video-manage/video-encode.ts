import { generateApi } from 'src/api/generate-api';
import { SimpleResponse } from 'src/model/api';

export interface VideoEncodeParams {
  videoId: string;
  options: string;
}

const videoEncodeApi = generateApi<VideoEncodeParams, SimpleResponse>({
  api: (params: VideoEncodeParams) => ({
    url: `/api/v1/videos/${params.videoId}/manage/encode`,
    method: 'POST',
    data: params,
  }),
});

export default videoEncodeApi;
