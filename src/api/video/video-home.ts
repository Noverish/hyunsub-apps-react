import { generateQuery } from '../generate-api';
import { VideoCategory, VideoEntry, VideoEntryHistory } from 'src/model/video';

export interface VideoHomeResult {
  recents: VideoHomeRecent[];
  histories: VideoEntryHistory[];
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
  key: 'videoHomeApi',
});

export default videoHomeApi;
