import { VideoDetail } from "src/model/video";
import { generateApi } from "../generate-api";

export interface GetVideoDetailParams {
  entryId: string;
}

const getVideoDetail = generateApi<GetVideoDetailParams, VideoDetail>(params => ({
  url: `/api/v1/detail/${params.entryId}`,
  method: 'GET',
  params: {}
}));

export default getVideoDetail;
