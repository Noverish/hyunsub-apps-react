import { generateQuery } from 'src/api/generate-api';
import { VideoEntry } from 'src/model/video';

export interface VideoSearchParams {
  query: string;
}

export interface VideoSearchResult {
  entries: { [category: string]: VideoEntry[] };
}

const videoSearchApi = generateQuery<VideoSearchParams, VideoSearchResult>({
  api: (params) => ({
    url: `/api/v1/search`,
    method: 'GET',
    params: {
      q: params.query,
    },
  }),
  key: 'videoSearchApi',
});

export default videoSearchApi;
