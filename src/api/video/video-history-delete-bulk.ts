import videoHistoryListApi from './video-history-list';
import { generateApi } from 'src/api/generate-api';

export interface VideoHistoryDeleteBulkParams {
  videoIds: string[];
}

const _videoHistoryDeleteBulkApi = generateApi<VideoHistoryDeleteBulkParams, any>((params) => ({
  url: `/api/v1/histories/delete-bulk`,
  method: 'POST',
  data: params,
}));

const videoHistoryDeleteBulkApi = async (params: VideoHistoryDeleteBulkParams): Promise<any> => {
  const result = await _videoHistoryDeleteBulkApi(params);

  videoHistoryListApi.invalidate();

  return result;
};

export default videoHistoryDeleteBulkApi;
