import { VideoEntryDetail } from "src/model/video";
import { generateQuery } from "../generate-api-v2";

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
  key: (params) => ['videoDetail', params.entryId, params.videoId || ''],
});

export default getVideoDetail;
