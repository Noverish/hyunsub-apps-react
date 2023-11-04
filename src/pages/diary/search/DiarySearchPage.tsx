import { t } from 'i18next';

import DiarySearchHooks from './DiarySearchHooks';
import DiarySearchResult from './components/DiarySearchResult';
import diarySearchApi from 'src/api/diary/diary-search';
import { Loading } from 'src/components/common/LoadingSuspense';
import SearchInput from 'src/components/common/SearchInput';
import CommonLayout from 'src/components/common/layout/CommonLayout';

export default function DiarySearchPage() {
  const { page, query, setQuery } = DiarySearchHooks.usePageParams();

  const { data, isFetching } = diarySearchApi.useApiResult({ page, query }, { enabled: !!query });

  return (
    <CommonLayout className="DiarySearchPage" title={t('DiarySearchPage.title')}>
      <SearchInput className="mb-3" defaultQuery={query} onSubmit={setQuery} />
      {isFetching && <Loading />}
      {data && <DiarySearchResult pageData={data} />}
    </CommonLayout>
  );
}
