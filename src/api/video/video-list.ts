import { VideoEntry, VideoSort } from "src/model/video";
import { generateInfiniteQuery } from "src/api/generate-api";

export interface VideoListParams {
  category: string;
  sort: VideoSort;
  seed?: number;
}

const videoList = generateInfiniteQuery<VideoListParams, VideoEntry>({
  api: (params) => ({
    url: '/api/v1/entry',
    method: 'GET',
    params: {
      category: params.category,
      p: params.page,
      sort: params.sort,
      seed: (params.sort === VideoSort.random) ? params.seed : undefined,
    }
  }),
  key: () => 'videoList',
});

export default videoList;
