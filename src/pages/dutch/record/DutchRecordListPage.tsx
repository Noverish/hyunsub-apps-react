import { t } from 'i18next';

import DutchRecordListHooks from './DutchRecordListHooks';
import dutchRecordSearchApi from 'src/api/dutch/dutch-record-search';
import CommonLayout from 'src/components/common/layout/CommonLayout';
import DutchRecordList from 'src/components/dutch/DutchRecordList';

export default function DutchRecordListPage() {
  const { tripId } = DutchRecordListHooks.usePageParams();
  const { data } = dutchRecordSearchApi.useApiResult({ tripId });
  const records = data?.data ?? [];

  return (
    <CommonLayout className="DutchRecordListPage" title={t('DutchRecordListPage.title')}>
      <DutchRecordList records={records} />
    </CommonLayout>
  );
}
