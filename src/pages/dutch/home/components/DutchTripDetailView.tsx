import { t } from 'i18next';
import { useContext } from 'react';

import CommonDescription from 'src/components/common/description/CommonDescription';
import { DutchContext } from 'src/context/dutch/DutchContext';
import { DutchTripDetail } from 'src/model/dutch';

interface Props {
  trip?: DutchTripDetail | null;
}

export default function DutchTripDetailView({ trip }: Props) {
  const { members } = useContext(DutchContext);

  const memberNames = members.map((v) => v.name).join(', ');

  return (
    <div className="DutchTripDetailView">
      <div className="d-grid row-col-2">
        <CommonDescription label={t('Dutch.tripCurrency')} value={trip?.tripCurrency} noTopMargin />
        <CommonDescription label={t('Dutch.settleCurrency')} value={trip?.settleCurrency} noTopMargin />
      </div>
      <CommonDescription label={t('Dutch.members')} value={memberNames} />
      <hr />
    </div>
  );
}
