import { t } from 'i18next';
import { useContext } from 'react';

import { DutchContext } from 'src/context/dutch/DutchContext';
import { DutchSettleEachResult } from 'src/model/dutch';
import { numberWithComma } from 'src/utils';

interface Props {
  result: DutchSettleEachResult;
}

export default function DutchSettleEachItem(props: Props) {
  const { result } = props;
  const { currency, shares } = result;
  const { members } = useContext(DutchContext);

  const rows = shares.map((v) => {
    const memberId = v.memberId;
    const member = members.filter((v) => v.id === memberId)[0];
    const name = member.name;

    return (
      <tr key={memberId}>
        <td>{name}</td>
        <td>{numberWithComma(v.should)}</td>
        <td>{numberWithComma(v.actual)}</td>
      </tr>
    );
  });

  return (
    <table>
      <thead>
        <tr>
          <th className="currency">{currency}</th>
          <th>{t('Dutch.should')}</th>
          <th>{t('Dutch.actual')}</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}
