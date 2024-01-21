import { t } from 'i18next';

import DutchSettleEachItem from './DutchSettleEachItem';
import dutchSettleEachApi from 'src/api/dutch/dutch-settle-each';
import DutchHomeHooks from 'src/pages/dutch/home/DutchHomeHooks';

import './DutchSettleEachList.scss';

export default function DutchSettleEachList() {
  const { tripId } = DutchHomeHooks.usePageParams();

  const { data } = dutchSettleEachApi.useApiResult({ tripId });

  const elements = (data ?? []).map((v) => <DutchSettleEachItem key={v.currency} result={v} />);

  return (
    <div className="DutchSettleEachList">
      <h4>{t('DutchHomePage.status')}</h4>
      <div className="d-grid gap-3">{elements}</div>
      <hr />
    </div>
  );
}
