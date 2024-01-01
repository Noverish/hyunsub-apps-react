import { t } from 'i18next';

import DutchRecordDetailHooks from './DutchRecordDetailHooks';
import DutchRecordDetailView from './components/DutchRecordDetailView';
import dutchRecordDetailApi from 'src/api/dutch/dutch-record-detail';
import dutchRecordMembersApi from 'src/api/dutch/dutch-record-members';
import CommonLayout from 'src/components/common/layout/CommonLayout';

export default function DutchRecordDetailPage() {
  const { tripId, recordId } = DutchRecordDetailHooks.usePageParams();

  const { data: record } = dutchRecordDetailApi.useApiResult({ tripId, recordId });
  const { data: members } = dutchRecordMembersApi.useApiResult({ recordId });

  return (
    <CommonLayout className="DutchRecordDetailPage" title={t('DutchRecordDetailPage.title')} back>
      {record && members && <DutchRecordDetailView record={record} members={members} />}
    </CommonLayout>
  );
}
