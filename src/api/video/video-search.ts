import { VideoSearchResult } from "src/model/video";
import { generateQuery } from "src/api/generate-api";

export interface VideoSearchParams {
  query: string;
}

const searchVideo = generateQuery<VideoSearchParams, VideoSearchResult>({
  api: (params) => ({
    url: `/api/v1/search`,
    method: 'GET',
    params: {
      q: params.query,
    },
  }),
  key: (params) => ['searchVideo', params.query],
});

export default searchVideo;
