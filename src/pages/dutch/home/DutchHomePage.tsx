import { t } from 'i18next';
import { useContext } from 'react';

import DutchHomeHooks from './DutchHomeHooks';
import dutchTripDetailApi from 'src/api/dutch/dutch-trip-detail';
import CommonDescription from 'src/components/common/description/CommonDescription';
import CommonLayout from 'src/components/common/layout/CommonLayout';
import { DutchContext } from 'src/context/dutch/DutchContext';

export default function DutchHomePage() {
  const { tripId } = DutchHomeHooks.usePageParams();
  const { members } = useContext(DutchContext);

  const { data: trip } = dutchTripDetailApi.useApiResult({ tripId });

  const memberNames = members.map((v) => v.name).join(', ');

  return (
    <CommonLayout className="DutchHomePage" title={trip?.name ?? ''}>
      <div className="d-grid row-col-2">
        <CommonDescription label={t('Dutch.tripCurrency')} value={trip?.tripCurrency} noTopMargin />
        <CommonDescription label={t('Dutch.settleCurrency')} value={trip?.settleCurrency} noTopMargin />
      </div>
      <CommonDescription label={t('Dutch.members')} value={memberNames} />
    </CommonLayout>
  );
}
