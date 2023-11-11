import { t } from 'i18next';

import DiaryRoutes from '../DiaryRoutes';
import { MobileHeaderButton } from 'src/components/common/header/MobileHeader';
import CommonLayout from 'src/components/common/layout/CommonLayout';
import DiarySearchResult from 'src/pages/diary/search/components/DiarySearchResult';
import router from 'src/pages/router';

export default function DiaryListPage() {
  const headerBtns: MobileHeaderButton[] = [
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
