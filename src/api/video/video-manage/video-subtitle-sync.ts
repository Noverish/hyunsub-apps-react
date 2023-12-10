import { generateApi } from 'src/api/generate-api';
import { VideoSubtitle } from 'src/model/video';

export interface VideoSubtitleSyncParams {
  videoId: string;
  subtitleId: string;
  ms: number;
}

const videoSubtitleSyncApi = generateApi<VideoSubtitleSyncParams, VideoSubtitle>({
  api: (data) => ({
    url: `/api/v1/videos/${data.videoId}/subtitles/${data.subtitleId}/sync`,
    method: 'POST',
    data,
  }),
});

export default videoSubtitleSyncApi;
