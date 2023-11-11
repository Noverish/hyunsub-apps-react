import { t } from 'i18next';

import FriendSearchResult from './components/FriendSearchResult';
import SearchInput from 'src/components/common/SearchInput';
import CommonLayout from 'src/components/common/layout/CommonLayout';
import CommonPageHooks from 'src/hooks/common/CommonPageHooks';

export default function FriendSearchPage() {
  const { query, setQuery } = CommonPageHooks.useQuery();

  return (
    <CommonLayout className="FriendSearchPage" title={t('FriendSearchPage.title')}>
      <SearchInput className="mb-3" defaultQuery={query} onSubmit={setQuery} />
      {query && <FriendSearchResult />}
    </CommonLayout>
  );
}
