import { VideoHistory } from 'src/model/video';
import { generateInfiniteQuery } from '../generate-infinite-query';

export interface VideoHistoryListParams {
  category: string;
}

const videoHistoryListApi = generateInfiniteQuery<VideoHistoryListParams, VideoHistory>({
  api: (params) => ({
    url: '/api/v1/histories',
    method: 'GET',
    params: {
      p: params.page,
      category: params.category,
    },
  }),
  key: 'videoHistoryListApi',
});

export default videoHistoryListApi;
