import { t } from 'i18next';

import ListLoadingIndicator from '../ListLoadingIndicator';
import useScrollBottom from 'src/hooks/scroll-bottom';

interface Props {
  query?: string;
  total: number;
  isFetching: boolean;
  fetchNextPage: () => {};
  children: React.ReactNode;
}

export default function SearchResultWrapper(props: Props) {
  const { query, total, isFetching, fetchNextPage, children } = props;

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
