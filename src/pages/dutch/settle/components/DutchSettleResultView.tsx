import { DutchSettleResult } from 'src/model/dutch';
import DutchSettleResultShareView from 'src/pages/dutch/settle/components/DutchSettleResultShareView';

interface Props {
  result: DutchSettleResult;
}

export default function DutchSettleResultView({ result }: Props) {
  const elements = Object.entries(result).map(([k, v]) => (
    <DutchSettleResultShareView key={k} memberId={k} amount={v} />
  ));

  return <div className="DutchSettleResultView">{elements}</div>;
}
