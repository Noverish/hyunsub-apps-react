import { t } from 'i18next';
import { useContext } from 'react';

import { DiaryListContext, DiaryListProvider } from './DiaryListContext';
import DiaryListHooks from './DiaryListHooks';
import DiarySearchModal from './elements/DiarySearchModal';
import diarySearchApi from 'src/api/diary/diary-search';
import CommonContainer from 'src/components/common/header/CommonContainer';
import MobileHeader, { MobileHeaderButton } from 'src/components/common/header/MobileHeader';
import DiaryListView from 'src/components/diary/DiaryListView';
import { setDocumentTitle } from 'src/utils/services';

function DiaryListPage() {
  setDocumentTitle(t('DiaryListPage.title'));

  // hooks
  const { page, setPage } = DiaryListHooks.usePageData();
  const { total, data } = diarySearchApi.useApi({ page });
  const setState = useContext(DiaryListContext)[1];

  // elements
  const headerBtns: MobileHeaderButton[] = [
    {
      icon: 'fas fa-search',
      onClick: () => setState({ showSearchModal: true }),
    },
  ];

  return (
    <div className="DiaryListPage">
      <MobileHeader title={t('DiaryListPage.title')} btns={headerBtns} />
      <CommonContainer>
        <DiaryListView page={page} total={total} data={data} setPage={setPage} />
      </CommonContainer>
    </div>
  );
}

export default function DiaryListIndex() {
  return (
    <DiaryListProvider>
      <DiaryListPage />
      <DiarySearchModal />
    </DiaryListProvider>
  );
}
