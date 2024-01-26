import { DutchBalance } from 'src/model/dutch';
import { numberWithComma } from 'src/utils';

interface Props {
  balance: DutchBalance;
}

export default function DutchBalanceItem({ balance }: Props) {
  const { currency, amount, spends } = balance;
  const remains = amount ? amount - spends : undefined;

  return (
    <tr className="DutchBalanceItem">
      <td>{currency}</td>
      <td>{amount ? numberWithComma(amount) : ''}</td>
      <td>{numberWithComma(spends)}</td>
      <td>{remains ? numberWithComma(remains) : ''}</td>
    </tr>
  );
}
