import { t } from 'i18next';

import DiaryListHooks from './DiaryListHooks';
import DiaryListView from './elements/DiaryListView';
import DiarySearchInput from './elements/DiarySearchInput';
import LoadingSuspense from 'src/components/common/LoadingSuspense';
import CommonContainer from 'src/components/common/header/CommonContainer';
import MobileHeader from 'src/components/common/header/MobileHeader';
import { setDocumentTitle } from 'src/utils/services';

export default function DiaryListPage() {
  setDocumentTitle(t('DiaryListPage.title'));

  // hooks
  const { query } = DiaryListHooks.usePageData();
  const search = DiaryListHooks.useSearch();

  return (
    <div className="DiaryListPage">
      <MobileHeader title={t('DiaryListPage.title')} />
      <CommonContainer>
        <DiarySearchInput onSearch={search} query={query} />
        <LoadingSuspense>
          <DiaryListView />
        </LoadingSuspense>
      </CommonContainer>
    </div>
  );
}
