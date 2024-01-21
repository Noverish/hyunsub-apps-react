import { t } from 'i18next';
import { useContext } from 'react';

import { DutchContext } from 'src/context/dutch/DutchContext';
import { numberWithComma } from 'src/utils';

interface Props {
  memberId: string;
  amount: number;
}

export default function DutchSettleResultShareView(props: Props) {
  const { members } = useContext(DutchContext);
  const member = members.filter((v) => v.id === props.memberId)[0];
  const { name } = member;
  const amount = numberWithComma(Math.abs(props.amount));

  const message =
    props.amount > 0
      ? t('DutchSettleResultView.message.send', { name, amount })
      : t('DutchSettleResultView.message.receive', { name, amount });

  return (
    <div className="DutchSettleResultShareView" style={{ wordSpacing: '.5rem' }}>
      {message}
    </div>
  );
}
