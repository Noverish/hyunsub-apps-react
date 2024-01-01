import DutchRecordItem from './DutchRecordItem';
import { DutchRecord } from 'src/model/dutch';

interface Props {
  records: DutchRecord[];
}

export default function DutchRecordList({ records }: Props) {
  const elements = records.map((v) => <DutchRecordItem key={v.id} record={v} />);

  return <div className="DutchRecordList">{elements}</div>;
}
