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

  // searchFn 이 cache 를 써서 undefined 가 아닌 값이 바로 나오는 경우
  // query 변경 대응 useEffect가 먼저 실행되게 해야 함
  useEffect(() => {
    setStatus(undefined);
  }, [query]);

  useEffect(() => {
    if (data) {
      const { total, page, pageSize } = data;
      const totalPage = Math.floor((total - 1) / pageSize) + 1;
      setStatus({ total, nowPage: page, totalPage });
    }
  }, [data]);

  return {
    data: data?.data,
    status,
  };
}
