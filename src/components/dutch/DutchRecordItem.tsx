import { DutchRecordPreview, dutchPaymentStr } from 'src/model/dutch';
import DutchRoutes from 'src/pages/dutch/DutchRoutes';
import router from 'src/pages/router';
import { numberWithComma } from 'src/utils';

import './DutchRecordItem.scss';

interface Props {
  tripId: string;
  record: DutchRecordPreview;
}

export default function DutchRecordItem({ tripId, record }: Props) {
  const recordId = record.id;

  const onClick = () => {
    router.navigate(DutchRoutes.recordDetail({ tripId, recordId }));
  };

  const members = record.members.map((v) => (
    <div key={v} className="member">
      {v}
    </div>
  ));

  return (
    <div className="DutchRecordItem hyunsub_border gray_bg_hover" onClick={onClick}>
      <div className="section_1">
        <div className="content">{record.content}</div>
        <div className="amount">
          {record.currency} {numberWithComma(record.amount)}
        </div>
      </div>
      <div className="section_2">
        <div className="section_2_1">
          <div className="location">{record.location}</div>
          <div className="members">{members}</div>
        </div>
        <div className="section_2_2">
          <div className="payment">{dutchPaymentStr(record.payment)}</div>
          <div className="date">{record.date}</div>
        </div>
      </div>
    </div>
  );
}
