import { VideoEntry, VideoSort } from "src/model/video";
import AppConstant from "src/utils/constants";
import { generateQuery } from "src/api/generate-api";

export interface GetVideoEntriesParams {
  category: string;
  page: number;
  sort?: VideoSort;
  seed?: number;
}

const getVideoEntries = generateQuery<GetVideoEntriesParams, VideoEntry[]>({
  api: (params) => ({
    url: '/api/v1/entry',
    method: 'GET',
    params: {
      category: params.category,
      p: params.page,
      sort: params.sort,
      seed: params.seed,
      ps: AppConstant.video.ENTRY_PAGE_SIZE,
    }
  }),
  key: (params) => ['videoEntries', JSON.stringify(params)],
});

export default getVideoEntries;
