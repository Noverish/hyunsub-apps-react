import { generateApi } from 'src/api/generate-api';

export interface VideoRenameParams {
  videoId: string;
  from: string;
  to: string;
}

const videoRenameApi = generateApi<VideoRenameParams, any>({
  api: (params) => ({
    url: `/api/v1/videos/${params.videoId}/manage/rename`,
    method: 'POST',
    data: params,
  }),
});

export default videoRenameApi;
