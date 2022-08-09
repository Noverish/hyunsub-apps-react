import { useQuery } from "react-query";
import { VideoEntryDetail } from "src/model/video";
import { generateApi } from "../generate-api";
import queryClient from '../query-client';

export interface GetVideoDetailParams {
  entryId: string;
  videoId?: string;
}

const request = generateApi<GetVideoDetailParams, VideoEntryDetail>(params => ({
  url: `/api/v1/entry/${params.entryId}`,
  method: 'GET',
  params: { videoId: params.videoId },
}));

const getQueryKey = ({ entryId, videoId }: GetVideoDetailParams) => `entry|${entryId}|${videoId}`;

export function useVideoDetailQuery(params: GetVideoDetailParams): VideoEntryDetail {
  return useQuery(getQueryKey(params), () => request(params)).data!!;
}

export async function prefetchVideoDetail(params: GetVideoDetailParams) {
  await queryClient.prefetchQuery(getQueryKey(params), () => request(params))
}
