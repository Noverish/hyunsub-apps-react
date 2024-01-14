import { t } from 'i18next';
import { Navigate } from 'react-router-dom';

import DutchRecordUpdateHooks from './DutchRecordUpdateHooks';
import dutchRecordDetailApi from 'src/api/dutch/dutch-record-detail';
import { Loading } from 'src/components/common/LoadingSuspense';
import CommonLayout from 'src/components/common/layout/CommonLayout';
import DutchRecordForm from 'src/components/dutch/form/DutchRecordForm';
import CommonRoutes from 'src/pages/common/CommonRoutes';

export default function DutchRecordUpdatePage() {
  const { tripId, recordId } = DutchRecordUpdateHooks.usePageParams();
  const { data, isLoading } = dutchRecordDetailApi.useApiResult({ tripId, recordId });
  const update = DutchRecordUpdateHooks.useUpdate();

  let content = <></>;
  if (isLoading) {
    content = <Loading />;
  } else if (data) {
    content = <DutchRecordForm record={data} onComplete={update} />;
  } else {
    content = <Navigate to={CommonRoutes.notFound} replace />;
  }

  return (
    <CommonLayout className="DutchRecordUpdatePage" title={t('DutchRecordUpdatePage.title')} back>
      {content}
    </CommonLayout>
  );
}
