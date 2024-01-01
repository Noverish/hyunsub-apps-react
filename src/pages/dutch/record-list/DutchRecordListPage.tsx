import { t } from 'i18next';

import DutchRoutes from '../DutchRoutes';
import DutchRecordListHooks from './DutchRecordListHooks';
import dutchRecordSearchApi from 'src/api/dutch/dutch-record-search';
import CommonLayout from 'src/components/common/layout/CommonLayout';
import DutchRecordList from 'src/components/dutch/DutchRecordList';
import { HeaderButton } from 'src/model/component';
import router from 'src/pages/router';

export default function DutchRecordListPage() {
  const { tripId } = DutchRecordListHooks.usePageParams();
  const { data } = dutchRecordSearchApi.useApiResult({ tripId });
  const records = data?.data ?? [];

  const headerBtns: HeaderButton[] = [
    {
      icon: 'fas fa-plus',
      name: t('add'),
      onClick: () => router.navigate(DutchRoutes.recordCreate({ tripId })),
    },
  ];

  return (
    <CommonLayout className="DutchRecordListPage" title={t('DutchRecordListPage.title')} btns={headerBtns}>
      <DutchRecordList tripId={tripId} records={records} />
    </CommonLayout>
  );
}
