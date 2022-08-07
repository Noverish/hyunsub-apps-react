import { VideoEntry, VideoSort } from "src/model/video";
import AppConstant from "src/utils/constants";
import { generateApi } from "../generate-api";

export interface GetVideoEntriesParams {
  category: string;
  page: number;
  sort?: VideoSort;
  seed?: number;
}

const getVideoEntries = generateApi<GetVideoEntriesParams, VideoEntry[]>(params => ({
  url: '/api/v1/entry',
  method: 'GET',
  params: {
    category: params.category,
    p: params.page,
    sort: params.sort,
    seed: params.seed,
    ps: AppConstant.video.ENTRY_PAGE_SIZE,
  }
}));

export default getVideoEntries;
