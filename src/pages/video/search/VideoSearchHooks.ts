import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import videoSearchApi, { VideoSearchParams } from "src/api/video/video-search";

export function useVideoSearchApi() {
  const [params, setParams] = useState<VideoSearchParams>();

  const { data, isLoading, isFetching } = useQuery({
    queryKey: params ? videoSearchApi.key(params) : [''],
    queryFn: params ? () => videoSearchApi.api(params) : () => Promise.resolve(undefined),
    enabled: !!params,
    suspense: false,
    staleTime: Infinity,
  });

  return {
    data,
    isLoading: isLoading && isFetching,
    search: setParams,
  };
}
