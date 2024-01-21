import { useContext } from 'react';

import { DutchSettleContext } from '../DutchSettleContext';
import DutchSettleHooks from '../DutchSettleHooks';
import dutchTripCurrencyListApi from 'src/api/dutch/dutch-trip-currency-list';
import CommonDescription from 'src/components/common/description/CommonDescription';
import { DutchTripCurrency } from 'src/model/dutch';
import DutchTripCurrencyModal from 'src/pages/dutch/settle/components/DutchTripCurrencyModal';

export default function DutchTripCurrencyList() {
  const { tripId } = DutchSettleHooks.usePageParams();
  const [{ currencyInModal }, setState] = useContext(DutchSettleContext);

  const { data: currencies } = dutchTripCurrencyListApi.useApiResult({ tripId });

  const generateOnEdit = (currency: DutchTripCurrency) => () => {
    setState({
      showCurrencyModal: true,
      currencyInModal: currency,
    });
  };

  const elements = (currencies ?? []).map((v) => {
    const onEdit = generateOnEdit(v);
    const value = v.rate?.toString() ?? 'N/A';

    return <CommonDescription key={v.currency} label={v.currency} value={value} onEdit={onEdit} noTopMargin />;
  });

  return (
    <div className="DutchTripCurrencyList">
      {elements}
      {currencyInModal && <DutchTripCurrencyModal />}
    </div>
  );
}
