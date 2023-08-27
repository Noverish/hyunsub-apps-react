import { generateQuery } from 'src/api/generate-api';
import { Video } from 'src/model/video';

export interface VideoDetailParams {
  videoId: string;
}

const videoDetailApi = generateQuery<VideoDetailParams, Video>({
  api: ({ videoId }) => ({
    url: `/api/v1/videos/${videoId}`,
    method: 'GET',
  }),
  key: 'videoDetailApi',
});

export default videoDetailApi;
