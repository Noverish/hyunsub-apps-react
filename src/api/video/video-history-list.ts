import { generateInfiniteQuery } from "src/api/generate-api";
import { VideoHistory } from "src/model/video";

export interface VideoHistoryListParams {

}

const videoHistoryListApi = generateInfiniteQuery<VideoHistoryListParams, VideoHistory>({
  api: (params) => ({
    url: '/api/v1/histories',
    method: 'GET',
    params: {
      p: params.page,
    }
  }),
  key: () => 'videoHistoryListApi',
});

export default videoHistoryListApi;