import { t } from 'i18next';

import { DutchRecord, DutchRecordMember } from 'src/model/dutch';
import DutchRecordMemberList from 'src/pages/dutch/record-detail/components/DutchRecordMemberList';

import './DutchRecordDetailView.scss';

interface Props {
  record: DutchRecord;
  members: DutchRecordMember[];
}

export default function DutchRecordDetailView({ record, members }: Props) {
  return (
    <div className="DutchRecordDetailView">
      <div className="content">{record.content}</div>
      <div className="label">{t('DutchRecord.location')}</div>
      <div className="value">{record.location}</div>
      <div className="label">{t('DutchRecord.amount')}</div>
      <div className="value">
        {record.currency} {record.amount}
      </div>
      <div className="label">{t('DutchRecord.date')}</div>
      <div className="value">{record.date}</div>
      <div className="label">{t('DutchRecord.members')}</div>
      <DutchRecordMemberList members={members} />
    </div>
  );
}
