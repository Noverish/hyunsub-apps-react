import { t } from 'i18next';
import { useContext } from 'react';

import { DutchHomeContext } from '../DutchHomeContext';
import DutchHomeHooks from '../DutchHomeHooks';
import DutchTripCurrencyModal from './DutchTripCurrencyModal';
import dutchTripCurrencyListApi from 'src/api/dutch/dutch-trip-currency-list';
import CommonDescription from 'src/components/common/description/CommonDescription';
import { DutchTripCurrency } from 'src/model/dutch';

export default function DutchTripCurrencyView() {
  const { tripId } = DutchHomeHooks.usePageParams();

  const { data: currencies } = dutchTripCurrencyListApi.useApiResult({ tripId });
  const [{ currencyInModal }, setState] = useContext(DutchHomeContext);

  const generateOnEdit = (currency: DutchTripCurrency) => () => {
    setState({
      showCurrencyModal: true,
      currencyInModal: currency,
    });
  };

  const elements = (currencies ?? []).map((v) => {
    const onEdit = generateOnEdit(v);
    const value = v.rate?.toString() ?? 'N/A';

    return <CommonDescription key={v.currency} label={v.currency} value={value} onEdit={onEdit} />;
  });

  return (
    <div className="DutchTripCurrencyView">
      <h4>{t('Dutch.settle-currency-rate')}</h4>
      {elements}
      <hr />
      {currencyInModal && <DutchTripCurrencyModal />}
    </div>
  );
}
