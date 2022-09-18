import { VideoEntryDetail } from "src/model/video";
import { generateQuery } from "src/api/generate-api";

export interface GetVideoDetailParams {
  entryId: string;
  videoId?: string;
}

const getVideoDetail = generateQuery<GetVideoDetailParams, VideoEntryDetail>({
  api: (params) => ({
    url: `/api/v1/entry/${params.entryId}`,
    method: 'GET',
    params: { videoId: params.videoId },
  }),
  key: () => 'videoDetail',
});

export default getVideoDetail;
