import { t } from 'i18next';
import { Card } from 'react-bootstrap';

import { DutchSpendSum } from 'src/model/dutch';
import { numberWithComma } from 'src/utils';

import './DutchSpendSumView.scss';

interface Props {
  sums: DutchSpendSum[];
}

export default function DutchSpendSumView({ sums }: Props) {
  const rows = sums.map((v) => (
    <tr key={v.currency}>
      <td>{v.currency}</td>
      <td>{numberWithComma(v.should)}</td>
      <td>{numberWithComma(v.actual)}</td>
    </tr>
  ));

  return (
    <Card className="DutchSpendSumView">
      <Card.Body>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>{t('Dutch.should')}</th>
              <th>{t('Dutch.actual')}</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </Card.Body>
    </Card>
  );
}
