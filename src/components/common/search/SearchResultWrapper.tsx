import { UseInfiniteQueryResult } from '@tanstack/react-query';
import { t } from 'i18next';

import ListLoadingIndicator from '../ListLoadingIndicator';
import { useTotal } from 'src/api/generate-infinite-query';
import useScrollBottom from 'src/hooks/scroll-bottom';
import { PageData } from 'src/model/api';

interface Props<T> {
  query?: string;
  result: UseInfiniteQueryResult<PageData<T>>;
  children: React.ReactNode;
}

export default function SearchResultWrapper<T>(props: Props<T>) {
  const { query, result, children } = props;
  const { data, isFetching, fetchNextPage } = result;
  const total = useTotal(data);

  useScrollBottom(() => {
    if (!isFetching) {
      fetchNextPage();
    }
  });

  const emptyResult = <h3>{t('CommonSearchResult.empty-result')}</h3>;

  const queryText = query ? (
    <h3>{t('CommonSearchResult.search-status', { query, total })}</h3>
  ) : (
    <h3>{t('CommonSearchResult.result-num', { total })}</h3>
  );

  return (
    <>
      {!isFetching && total === 0 && emptyResult}
      {total > 0 && queryText}
      {total > 0 && children}
      <ListLoadingIndicator isFetching={isFetching} />
    </>
  );
}
