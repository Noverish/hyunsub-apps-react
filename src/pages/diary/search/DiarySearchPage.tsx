import { t } from 'i18next';

import DiarySearchHooks from './DiarySearchHooks';
import diarySearchApi from 'src/api/diary/diary-search';
import CommonContainer from 'src/components/common/header/CommonContainer';
import MobileHeader from 'src/components/common/header/MobileHeader';
import DiaryListView from 'src/components/diary/DiaryListView';
import { setDocumentTitle } from 'src/utils/services';

export default function DiarySearchPage() {
  const { page, query, setPage } = DiarySearchHooks.usePageData();
  const { total, data } = diarySearchApi.useApi({ page, query });

  setDocumentTitle(t('DiarySearchPage.title', [total, query]));

  return (
    <div className="DiarySearchPage">
      <MobileHeader title={t('DiarySearchPage.title', [total, query])} back />
      <CommonContainer>
        <DiaryListView page={page} total={total} data={data} setPage={setPage} />
      </CommonContainer>
    </div>
  );
}
