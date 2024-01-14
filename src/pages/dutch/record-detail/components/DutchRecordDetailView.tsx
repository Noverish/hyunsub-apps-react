import { t } from 'i18next';

import { DutchRecordDetail } from 'src/model/dutch';
import DutchRecordMemberList from 'src/pages/dutch/record-detail/components/DutchRecordMemberList';
import { numberWithComma } from 'src/utils';

import './DutchRecordDetailView.scss';

interface Props {
  detail: DutchRecordDetail;
}

export default function DutchRecordDetailView({ detail }: Props) {
  const { record, members } = detail;
  return (
    <div className="DutchRecordDetailView">
      <div className="content">{record.content}</div>
      <div className="label">{t('DutchRecord.location')}</div>
      <div className="value">{record.location}</div>
      <div className="label">{t('DutchRecord.amount')}</div>
      <div className="value">
        {record.currency} {numberWithComma(record.amount)}
      </div>
      <div className="label">{t('DutchRecord.date')}</div>
      <div className="value">{record.date}</div>
      <div className="label">{t('DutchRecord.members')}</div>
      <DutchRecordMemberList members={members} />
    </div>
  );
}
