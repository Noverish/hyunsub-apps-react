import { VideoSearchResult } from "src/model/video";
import { generateApi } from "../generate-api";

export interface VideoSearchParams {
  query: string;
}

const searchVideo = generateApi<VideoSearchParams, VideoSearchResult>(params => ({
  url: `/api/v1/search`,
  method: 'GET',
  params: {
    q: params.query,
  },
}));

export default searchVideo;
