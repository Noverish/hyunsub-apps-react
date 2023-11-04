import { t } from 'i18next';

import DiaryRoutes from '../DiaryRoutes';
import DiaryListHooks from './DiaryListHooks';
import diarySearchApi from 'src/api/diary/diary-search';
import { MobileHeaderButton } from 'src/components/common/header/MobileHeader';
import CommonLayout from 'src/components/common/layout/CommonLayout';
import DiaryListView from 'src/components/diary/DiaryListView';
import router from 'src/pages/router';

export default function DiaryListPage() {
  const { page, setPage } = DiaryListHooks.usePageParams();
  const pageData = diarySearchApi.useApi({ page });

  const headerBtns: MobileHeaderButton[] = [
    {
      icon: 'fas fa-plus',
      name: t('add'),
      onClick: () => router.navigate(DiaryRoutes.createRoute),
    },
  ];

  return (
    <CommonLayout className="DiaryListPage" title={t('DiaryListPage.title')} btns={headerBtns}>
      <DiaryListView pageData={pageData} setPage={setPage} />
    </CommonLayout>
  );
}
