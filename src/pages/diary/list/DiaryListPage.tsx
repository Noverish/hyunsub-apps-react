import { t } from 'i18next';
import { useContext } from 'react';

import DiaryRoutes from '../DiaryRoutes';
import { DiaryListContext, DiaryListProvider } from './DiaryListContext';
import DiaryListHooks from './DiaryListHooks';
import DiarySearchModal from './elements/DiarySearchModal';
import diarySearchApi from 'src/api/diary/diary-search';
import CommonContainer from 'src/components/common/header/CommonContainer';
import MobileHeader, { MobileHeaderButton } from 'src/components/common/header/MobileHeader';
import DiaryListView from 'src/components/diary/DiaryListView';
import router from 'src/pages/router';
import { setDocumentTitle } from 'src/utils/services';

function DiaryListPage() {
  setDocumentTitle(t('DiaryListPage.title'));

  // hooks
  const { page, setPage } = DiaryListHooks.usePageData();
  const { total, data, pageSize } = diarySearchApi.useApi({ page });
  const setState = useContext(DiaryListContext)[1];

  // elements
  const totalPage = Math.floor((total - 1) / pageSize) + 1;

  const headerBtns: MobileHeaderButton[] = [
    {
      icon: 'fas fa-search',
      onClick: () => setState({ showSearchModal: true }),
    },
    {
      icon: 'fas fa-plus',
      onClick: () => router.navigate(DiaryRoutes.createRoute),
    },
  ];

  return (
    <div className="DiaryListPage">
      <MobileHeader title={t('DiaryListPage.title')} btns={headerBtns} />
      <CommonContainer>
        <DiaryListView page={page} total={totalPage} data={data} setPage={setPage} />
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
