import { t } from 'i18next';

import DiaryRoutes from '../DiaryRoutes';
import DiaryDetailHooks from './DiaryDetailHooks';
import DiaryDetailNavigation from './components/DiaryDetailNavigation';
import DiaryDetailView from './components/DiaryDetailView';
import diaryDetailApi from 'src/api/diary/diary-detail';
import LoadingSuspense, { Loading } from 'src/components/common/LoadingSuspense';
import { MobileHeaderButton } from 'src/components/common/header/MobileHeader';
import CommonLayout from 'src/components/common/layout/CommonLayout';
import DiaryDetailPhotoList from 'src/pages/diary/detail/components/DiaryDetailPhotoList';
import router from 'src/pages/router';

import './DiaryDetailPage.scss';

export default function DiaryDetailPage() {
  const { date } = DiaryDetailHooks.usePageParams();
  const { data, isLoading } = diaryDetailApi.useApiResult({ date });

  // functions
  const remove = DiaryDetailHooks.useDelete();

  // elements
  const mobileHeaderBtns: MobileHeaderButton[] = [
    {
      icon: 'fas fa-edit',
      name: t('edit'),
      onClick: () => router.navigate(DiaryRoutes.update(date)),
    },
    {
      icon: 'fas fa-trash-alt',
      name: t('delete'),
      onClick: () => (data ? remove(date) : undefined),
    },
  ];

  return (
    <CommonLayout
      className="DiaryDetailPage"
      title={t('DiaryDetailPage.title')}
      btns={data ? mobileHeaderBtns : undefined}
      back
    >
      <DiaryDetailNavigation diary={data} />
      {isLoading ? <Loading /> : <DiaryDetailView diary={data} />}
      <LoadingSuspense>
        <DiaryDetailPhotoList />
      </LoadingSuspense>
    </CommonLayout>
  );
}
