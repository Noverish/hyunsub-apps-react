import DutchRecordItem from './DutchRecordItem';
import { DutchRecord } from 'src/model/dutch';

interface Props {
  tripId: string;
  records: DutchRecord[];
}

export default function DutchRecordList({ tripId, records }: Props) {
  const elements = records.map((v) => <DutchRecordItem key={v.id} tripId={tripId} record={v} />);

  return <div className="DutchRecordList">{elements}</div>;
}
