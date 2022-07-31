import { VideoEntry, VideoSort } from "src/model/video";
import { generateApi } from "../generate-api";

export interface GetVideoEntriesParams {
  category: string;
  page: number;
  sort?: VideoSort;
}

const getVideoEntries = generateApi<GetVideoEntriesParams, VideoEntry[]>(params => ({
  url: '/api/v1/entry',
  method: 'GET',
  params: {
    category: params.category,
    p: params.page,
    sort: params.sort,
  }
}));

export default getVideoEntries;
