import { DutchRecord } from 'src/model/dutch';

import './DutchRecordItem.scss';

interface Props {
  record: DutchRecord;
}

export default function DutchRecordItem({ record }: Props) {
  const members = record.members.map((v) => (
    <div key={v} className="member">
      {v}
    </div>
  ));

  return (
    <div className="DutchRecordItem hyunsub_border">
      <div className="section_1">
        <div className="content">{record.content}</div>
        <div className="section_1_1">
          <div className="currency">{record.currency}</div>
          <div className="amount">{record.amount}</div>
        </div>
      </div>
      <div className="location">{record.location}</div>
      <div className="section_2">
        <div className="members">{members}</div>
        <div className="date">{record.date}</div>
      </div>
    </div>
  );
}
