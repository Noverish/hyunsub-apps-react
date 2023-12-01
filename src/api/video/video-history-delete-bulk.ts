import videoHistoryListApi from './video-history-list';
import { generateApi } from 'src/api/generate-api';
import { SimpleResponse } from 'src/model/api';

export interface VideoHistoryDeleteBulkParams {
  videoIds: string[];
}

const videoHistoryDeleteBulkApi = generateApi<VideoHistoryDeleteBulkParams, SimpleResponse>({
  api: (params) => ({
    url: `/api/v1/histories/delete-bulk`,
    method: 'POST',
    data: params,
  }),
  postHandle: () => {
    videoHistoryListApi.invalidate();
  },
});

export default videoHistoryDeleteBulkApi;
