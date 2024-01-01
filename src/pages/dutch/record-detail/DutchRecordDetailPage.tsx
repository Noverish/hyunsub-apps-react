import { t } from 'i18next';
import { Navigate } from 'react-router-dom';

import DutchRecordDetailHooks from './DutchRecordDetailHooks';
import DutchRecordDetailView from './components/DutchRecordDetailView';
import dutchRecordDetailApi from 'src/api/dutch/dutch-record-detail';
import { Loading } from 'src/components/common/LoadingSuspense';
import CommonLayout from 'src/components/common/layout/CommonLayout';
import { HeaderButton } from 'src/model/component';
import CommonRoutes from 'src/pages/common/CommonRoutes';

export default function DutchRecordDetailPage() {
  const { tripId, recordId } = DutchRecordDetailHooks.usePageParams();

  const { data, isLoading } = dutchRecordDetailApi.useApiResult({ tripId, recordId });

  const remove = DutchRecordDetailHooks.useDelete();

  const headerBtns: HeaderButton[] = [
    {
      icon: 'fas fa-trash-alt',
      name: t('delete'),
      onClick: () => remove(),
    },
  ];

  let content = <></>;
  if (isLoading) {
    content = <Loading />;
  } else if (data) {
    content = <DutchRecordDetailView detail={data} />;
  } else {
    content = <Navigate to={CommonRoutes.notFound} replace />;
  }

  return (
    <CommonLayout
      className="DutchRecordDetailPage"
      title={t('DutchRecordDetailPage.title')}
      btns={data ? headerBtns : undefined}
      back
    >
      {content}
    </CommonLayout>
  );
}
