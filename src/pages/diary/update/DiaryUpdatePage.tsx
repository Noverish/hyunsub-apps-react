import { t } from 'i18next';
import { Navigate } from 'react-router-dom';

import diaryDetailApi from 'src/api/diary/diary-detail';
import { Loading } from 'src/components/common/LoadingSuspense';
import CommonLayout from 'src/components/common/layout/CommonLayout';
import DiaryForm from 'src/components/diary/DiaryForm';
import CommonRoutes from 'src/pages/common/CommonRoutes';
import DiaryUpdateHooks from 'src/pages/diary/update/DiaryUpdateHooks';

export default function DiaryUpdatePage() {
  const { date } = DiaryUpdateHooks.usePageParams();
  const { data, isLoading } = diaryDetailApi.useApiResult({ date });
  const update = DiaryUpdateHooks.useUpdate();

  let content = <></>;
  if (isLoading) {
    content = <Loading />;
  } else if (data) {
    content = <DiaryForm diary={data} onComplete={update} />;
  } else {
    content = <Navigate to={CommonRoutes.notFound} replace />;
  }

  return (
    <CommonLayout className="DiaryUpdatePage" title={t('DiaryUpdatePage.title')} back>
      {content}
    </CommonLayout>
  );
}
