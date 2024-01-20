import { DutchSettleResult } from 'src/model/dutch';
import DutchSettleResultShareView from 'src/pages/dutch/settle/components/DutchSettleResultShareView';

interface Props {
  result: DutchSettleResult;
}

export default function DutchSettleResultView({ result }: Props) {
  const elements = result.shares.map((v) => <DutchSettleResultShareView key={v.memberId} share={v} />);

  return (
    <div className="DutchSettleResultView">
      <h5>{result.currency}</h5>
      {elements}
    </div>
  );
}
