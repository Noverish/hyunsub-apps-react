import { VideoEntry, VideoSort } from "src/model/video";
import AppConstant from "src/utils/constants";
import { generateApi } from "../generate-api";
import queryClient from '../query-client';
import { useQuery } from "react-query";

export interface GetVideoEntriesParams {
  category: string;
  page: number;
  sort?: VideoSort;
  seed?: number;
}

const request = generateApi<GetVideoEntriesParams, VideoEntry[]>(params => ({
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

const getQueryKey = (params: GetVideoEntriesParams) => `list|${JSON.stringify(params)}`;

// TODO 이거 파일마다 만들지 말고 어떻게 잘 하기

export function useVideoEntriesQuery(params: GetVideoEntriesParams): VideoEntry[] {
  return useQuery(getQueryKey(params), () => request(params)).data!!;
}

export async function prefetchVideoEntries(params: GetVideoEntriesParams) {
  await queryClient.prefetchQuery(getQueryKey(params), () => request(params))
}

export async function fetchVideoEntries(params: GetVideoEntriesParams): Promise<VideoEntry[]> {
  return await queryClient.fetchQuery(getQueryKey(params), () => request(params), { staleTime: new Date().getTime() });
}

export function getVideoEntriesCache(params: GetVideoEntriesParams): VideoEntry[] | undefined {
  return queryClient.getQueryData<VideoEntry[]>(getQueryKey(params));
}
