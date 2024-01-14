import { t } from 'i18next';

import DiaryRoutes from '../DiaryRoutes';
import { DiaryListProvider } from './DiaryListContext';
import CommonLayout from 'src/components/common/layout/CommonLayout';
import { HeaderButton } from 'src/model/component';
import DiarySearchResult from 'src/pages/diary/search/components/DiarySearchResult';
import router from 'src/pages/router';

function DiaryListPage() {
  const headerBtns: HeaderButton[] = [
    {
      icon: 'fas fa-plus',
      name: t('add'),
      onClick: () => router.navigate(DiaryRoutes.createRoute),
    },
  ];

  return (
    <CommonLayout className="DiaryListPage" title={t('DiaryListPage.title')} btns={headerBtns}>
      <DiarySearchResult ignoreQuery />
    </CommonLayout>
  );
}

export default function DiaryListIndex() {
  return (
    <DiaryListProvider>
      <DiaryListPage />
    </DiaryListProvider>
  );
}
