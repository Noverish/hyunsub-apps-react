import { t } from 'i18next';
import { Card } from 'react-bootstrap';

import DutchRoutes from '../../DutchRoutes';
import DutchSpendHooks from '../DutchSpendHooks';
import DutchBalanceItem from './DutchBalanceItem';
import dutchBalanceListApi from 'src/api/dutch/dutch-balance-list';
import router from 'src/pages/router';

import './DutchBalanceList.scss';

export default function DutchBalanceList() {
  const { tripId } = DutchSpendHooks.usePageParams();

  const { data } = dutchBalanceListApi.useApiResult({ tripId });
  const list = data ?? [];
  const elements = list.map((v) => <DutchBalanceItem key={v.currency} balance={v} />);

  const onEdit = () => {
    router.navigate(DutchRoutes.balanceUpdate({ tripId }));
  };

  return (
    <Card className="DutchBalanceList">
      <Card.Header>
        <span>{t('Dutch.cash-status')}</span>
        <span className="gray_on_hover" onClick={onEdit}>
          <i className="fas fa-pen" />
        </span>
      </Card.Header>
      <Card.Body>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>{t('Dutch.initial-balance')}</th>
              <th>{t('Dutch.spended-balance')}</th>
              <th>{t('Dutch.remaining-balance')}</th>
            </tr>
          </thead>
          <tbody>{elements}</tbody>
        </table>
      </Card.Body>
    </Card>
  );
}
