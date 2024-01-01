import { t } from 'i18next';

import DutchRecordDetailHooks from './DutchRecordDetailHooks';
import DutchRecordDetailView from './components/DutchRecordDetailView';
import dutchRecordDetailApi from 'src/api/dutch/dutch-record-detail';
import dutchRecordMembersApi from 'src/api/dutch/dutch-record-members';
import CommonLayout from 'src/components/common/layout/CommonLayout';
import { HeaderButton } from 'src/model/component';

export default function DutchRecordDetailPage() {
  const { tripId, recordId } = DutchRecordDetailHooks.usePageParams();

  const { data: record } = dutchRecordDetailApi.useApiResult({ tripId, recordId });
  const { data: members } = dutchRecordMembersApi.useApiResult({ recordId });

  const remove = DutchRecordDetailHooks.useDelete();

  const headerBtns: HeaderButton[] = [
    {
      icon: 'fas fa-trash-alt',
      name: t('delete'),
      onClick: () => remove(),
    },
  ];

  return (
    <CommonLayout
      className="DutchRecordDetailPage"
      title={t('DutchRecordDetailPage.title')}
      btns={record ? headerBtns : undefined}
      back
    >
      {record && members && <DutchRecordDetailView record={record} members={members} />}
    </CommonLayout>
  );
}
