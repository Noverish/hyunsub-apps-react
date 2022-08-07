import { VideoEntryDetail } from "src/model/video";
import { generateApi } from "../generate-api";

export interface GetVideoDetailParams {
  entryId: string;
  videoId?: string;
}

const getVideoEntryDetail = generateApi<GetVideoDetailParams, VideoEntryDetail>(params => ({
  url: `/api/v1/entry/${params.entryId}`,
  method: 'GET',
  params: { videoId: params.videoId },
}));

export default getVideoEntryDetail;
