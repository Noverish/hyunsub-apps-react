import { t } from 'i18next';

import DiarySearchHooks from './DiarySearchHooks';
import diarySearchApi from 'src/api/diary/diary-search';
import CommonContainer from 'src/components/common/header/CommonContainer';
import MobileHeader from 'src/components/common/header/MobileHeader';
import DiaryListView from 'src/components/diary/DiaryListView';
import { setDocumentTitle } from 'src/utils/services';

export default function DiarySearchPage() {
  const { page, query, setPage } = DiarySearchHooks.usePageData();
  const { total, data, pageSize } = diarySearchApi.useApi({ page, query });

  setDocumentTitle(t('DiarySearchPage.title', [total, query]));

  const totalPage = Math.floor((total - 1) / pageSize) + 1;

  return (
    <div className="DiarySearchPage">
      <MobileHeader title={t('DiarySearchPage.title', [total, query])} back />
      <CommonContainer>
        <DiaryListView page={page} total={totalPage} data={data} setPage={setPage} query={query} />
      </CommonContainer>
    </div>
  );
}
