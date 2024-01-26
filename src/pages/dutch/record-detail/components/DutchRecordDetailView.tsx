import { t } from 'i18next';

import CommonDescription from 'src/components/common/description/CommonDescription';
import { DutchRecordDetail, dutchPaymentStr } from 'src/model/dutch';
import DutchRecordMemberList from 'src/pages/dutch/record-detail/components/DutchRecordMemberList';
import { numberWithComma } from 'src/utils';

import './DutchRecordDetailView.scss';

interface Props {
  detail: DutchRecordDetail;
}

export default function DutchRecordDetailView({ detail }: Props) {
  const { record, members } = detail;

  const amountStr = `${record.currency} ${numberWithComma(record.amount)}`;

  return (
    <div className="DutchRecordDetailView">
      <div className="content">{record.content}</div>
      <CommonDescription label={t('DutchRecord.location')} value={record.location} />
      <CommonDescription label={t('DutchRecord.amount')} value={amountStr} />
      <CommonDescription label={t('DutchRecord.payment')} value={dutchPaymentStr(record.payment)} />
      <CommonDescription label={t('DutchRecord.date')} value={record.date} />
      <CommonDescription label={t('DutchRecord.members')}>
        <DutchRecordMemberList members={members} />
      </CommonDescription>
    </div>
  );
}
