import { generateApi } from 'src/api/generate-api';

export interface VideoHistoryDeleteParams {
  videoId: string;
}

const videoHistoryDeleteApi = generateApi<VideoHistoryDeleteParams, any>((params) => ({
  url: `/api/v1/histories/${params.videoId}`,
  method: 'DELETE',
}))

export default videoHistoryDeleteApi;
