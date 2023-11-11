import { UseQueryResult } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import CommonPageHooks from 'src/hooks/common/CommonPageHooks';
import { PageData, SearchResult, SearchStatus } from 'src/model/api';

export interface CommonSearchParams {
  query: string;
  page: number;
}

export interface CommonSearchHooksParams<T> {
  searchFn: (params: CommonSearchParams) => UseQueryResult<PageData<T>, unknown>;
}

export default function useSearchResult<T>({ searchFn }: CommonSearchHooksParams<T>): SearchResult<T> {
  const { query } = CommonPageHooks.useQuery();
  const { page } = CommonPageHooks.usePage();
  const { data } = searchFn({ page, query });
  const [status, setStatus] = useState<SearchStatus>();

  useEffect(() => {
    if (data) {
      const { total, page, pageSize } = data;
      const totalPage = Math.floor((total - 1) / pageSize) + 1;
      setStatus({ total, nowPage: page, totalPage });
    }
  }, [data]);

  useEffect(() => {
    setStatus(undefined);
  }, [query]);

  return {
    data: data?.data,
    status,
  };
}
