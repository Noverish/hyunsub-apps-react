import DutchSpendItem from './DutchSpendItem';
import { DutchSpend } from 'src/model/dutch';

interface Props {
  spends: DutchSpend[];
}

export default function DutchSpendList({ spends }: Props) {
  const elements = spends.map((v) => <DutchSpendItem key={v.recordId} spend={v} />);

  return <div className="DutchSpendList">{elements}</div>;
}
