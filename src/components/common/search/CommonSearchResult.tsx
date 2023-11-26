import { t } from 'i18next';

import CommonPagination from '../CommonPagination';
import { Loading } from '../LoadingSuspense';
import useSearchResult, { CommonSearchHooksParams } from 'src/components/common/search/CommonSearchHooks';
import CommonPageHooks from 'src/hooks/common/CommonPageHooks';

interface Props<T> extends CommonSearchHooksParams<T> {
  renderItem: (v: T, query: string) => React.ReactNode;
  renderTotal?: boolean;
}

export default function CommonSearchResult<T>({ searchFn, renderItem, renderTotal }: Props<T>) {
  const { page, setPage } = CommonPageHooks.usePage();
  const { query } = CommonPageHooks.useQuery();

  const { data, status } = useSearchResult({ searchFn });

  if (!status) {
    return <Loading />;
  }
  const { total, totalPage } = status;

  const items = (data ?? []).map((v) => renderItem(v, query));

  const resultEmpty = <h3>{t('CommonSearchResult.empty-result')}</h3>;
  const resultNum = <h3>{t('CommonSearchResult.result-num', { total })}</h3>;
  const resultList = (
    <div className="d-grid gap-3">
      <CommonPagination now={page} total={totalPage} onClick={setPage} />
      {data ? <div className="d-grid gap-3">{items}</div> : <Loading />}
      <CommonPagination now={page} total={totalPage} onClick={setPage} />
    </div>
  );

  return (
    <div className="CommonSearchResult">
      {total === 0 && resultEmpty}
      {total > 0 && renderTotal && resultNum}
      {total > 0 && resultList}
    </div>
  );
}
