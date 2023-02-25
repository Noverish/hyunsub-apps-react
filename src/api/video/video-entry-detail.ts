import { VideoEntryDetail } from "src/model/video";
import { generateQuery } from "src/api/generate-api";

export interface VideoEntryDetailParams {
  entryId: string;
  videoId?: string;
}

const videoEntryDetailApi = generateQuery<VideoEntryDetailParams, VideoEntryDetail>({
  api: (params) => ({
    url: `/api/v1/entries/${params.entryId}`,
    method: 'GET',
    params: { videoId: params.videoId },
  }),
  key: () => 'videoEntryDetailApi',
});

export default videoEntryDetailApi;
