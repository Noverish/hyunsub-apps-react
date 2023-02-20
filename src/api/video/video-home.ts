import { VideoCategory, VideoEntry } from "src/model/video";
import { generateQuery } from "../generate-api";

export interface VideoHomeResult {
  recents: VideoHomeRecent[];
}

export interface VideoHomeRecent {
  category: VideoCategory;
  list: VideoEntry[];
}

const videoHomeApi = generateQuery<{}, VideoHomeResult>({
  api: () => ({
    url: '/api/v1/home',
    method: 'GET',
  }),
  key: () => 'videoHomeApi',
});

export default videoHomeApi;
