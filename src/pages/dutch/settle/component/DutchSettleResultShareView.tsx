import { t } from 'i18next';
import { useContext } from 'react';

import { DutchContext } from 'src/context/dutch/DutchContext';
import { DutchSettleResultShare } from 'src/model/dutch';
import { numberWithComma } from 'src/utils';

interface Props {
  share: DutchSettleResultShare;
}

export default function DutchSettleResultShareView({ share }: Props) {
  const { members } = useContext(DutchContext);
  const member = members.filter((v) => v.id === share.memberId)[0];
  const { name } = member;
  const amount = numberWithComma(Math.abs(share.amount));

  const message =
    share.amount > 0
      ? t('DutchSettleResultView.message.send', { name, amount })
      : t('DutchSettleResultView.message.receive', { name, amount });

  return (
    <div className="DutchSettleResultShareView" style={{ wordSpacing: '.5rem' }}>
      {message}
    </div>
  );
}
