import { t } from 'i18next';
import { Navigate } from 'react-router-dom';

import DiaryRoutes from '../DiaryRoutes';
import CommonLayout from 'src/components/common/layout/CommonLayout';
import DiaryForm from 'src/components/diary/DiaryForm';
import DiaryUpdateHooks from 'src/pages/diary/update/DiaryUpdateHooks';

export default function DiaryUpdatePage() {
  const { diary, date } = DiaryUpdateHooks.usePageData();
  const update = DiaryUpdateHooks.useUpdate();

  if (!diary) {
    return <Navigate to={DiaryRoutes.create(date)} replace />;
  }

  return (
    <CommonLayout className="DiaryUpdatePage" title={t('DiaryUpdatePage.title')} back>
      <DiaryForm diary={diary} onComplete={update} />
    </CommonLayout>
  );
}
