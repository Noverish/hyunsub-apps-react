import { generateQuery } from 'src/api/generate-api';
import { VideoEntryDetail } from 'src/model/video';

export interface VideoEntryDetailParams {
  entryId: string;
  videoId?: string;
}

const videoEntryDetailApi = generateQuery<VideoEntryDetailParams, VideoEntryDetail>({
  api: ({ entryId, videoId }) => ({
    url: `/api/v1/entries/${entryId}`,
    method: 'GET',
    params: { videoId },
  }),
  key: 'videoEntryDetailApi',
});

export default videoEntryDetailApi;
