import { generateInfiniteQuery } from 'src/api/generate-api';
import { VideoEntry } from 'src/model/video';

export interface VideoEntryListParams {
  category: string;
  sort: string;
  seed?: number;
}

const videoEntryListApi = generateInfiniteQuery<VideoEntryListParams, VideoEntry>({
  api: (params) => ({
    url: '/api/v1/entries',
    method: 'GET',
    params: {
      category: params.category,
      p: params.page,
      sort: params.sort,
      seed: params.sort === 'RANDOM' ? params.seed : undefined,
    },
  }),
  key: () => 'videoEntryListApi',
});

export default videoEntryListApi;
