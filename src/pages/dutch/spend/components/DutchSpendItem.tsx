import DutchRoutes from '../../DutchRoutes';
import DutchSpendHooks from '../DutchSpendHooks';
import { DutchSpend } from 'src/model/dutch';
import router from 'src/pages/router';
import { numberWithComma } from 'src/utils';

import './DutchSpendItem.scss';

interface Props {
  spend: DutchSpend;
}

export default function DutchSpendItem({ spend }: Props) {
  const { tripId } = DutchSpendHooks.usePageParams();
  const { recordId } = spend;

  const onClick = () => {
    router.navigate(DutchRoutes.recordDetail({ tripId, recordId }));
  };

  return (
    <div className="DutchSpendItem hyunsub_border gray_bg_hover" onClick={onClick}>
      <div className="section_1">
        <div className="content">{spend.content}</div>
        <div className="amount">
          {spend.currency} {numberWithComma(spend.actual)}
        </div>
      </div>
      <div className="section_2">
        <div className="location">{spend.location}</div>
        <div className="date">{spend.date}</div>
      </div>
    </div>
  );
}
