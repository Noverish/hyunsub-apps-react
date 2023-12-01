import { generateApi } from 'src/api/generate-api';
import { VideoEntry } from 'src/model/video';

export interface VideoEntryCreateParams {
  name: string;
  thumbnailUrl?: string;
  category: string;
  videoGroupId?: string;
}

const videoEntryCreateApi = generateApi<VideoEntryCreateParams, VideoEntry>({
  api: (params) => ({
    url: '/api/v1/entries',
    method: 'POST',
    data: params,
  }),
});

export default videoEntryCreateApi;
