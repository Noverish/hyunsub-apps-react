import { t } from 'i18next';

import DiarySearchResult from './components/DiarySearchResult';
import SearchInput from 'src/components/common/SearchInput';
import CommonLayout from 'src/components/common/layout/CommonLayout';
import CommonPageHooks from 'src/hooks/common/CommonPageHooks';

export default function DiarySearchPage() {
  const { query, setQuery } = CommonPageHooks.useQuery();

  return (
    <CommonLayout className="DiarySearchPage" title={t('DiarySearchPage.title')}>
      <SearchInput className="mb-3" defaultQuery={query} onSubmit={setQuery} />
      {query && <DiarySearchResult />}
    </CommonLayout>
  );
}
