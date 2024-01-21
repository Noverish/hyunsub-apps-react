import { useContext } from 'react';

import dutchTripCurrencySetApi from 'src/api/dutch/dutch-trip-currency-set';
import { useUrlParams } from 'src/hooks/url-params';
import { DutchHomeContext } from 'src/pages/dutch/home/DutchHomeContext';
import { dispatch } from 'src/redux';
import { GlobalActions } from 'src/redux/global';

export interface DutchHomePageParams {
  tripId: string;
}

function usePageParams(): DutchHomePageParams {
  const [tripId] = useUrlParams('tripId');
  return { tripId };
}

function useSetTripCurrency() {
  const { tripId } = usePageParams();
  const [{ currencyInModal }, setState] = useContext(DutchHomeContext);

  return async (rate: number) => {
    const currency = currencyInModal?.currency;
    if (!currency) {
      return;
    }

    dispatch(GlobalActions.update({ loading: true }));

    await dutchTripCurrencySetApi({ tripId, currency, rate });

    dispatch(GlobalActions.update({ loading: false }));

    setState({
      showCurrencyModal: false,
    });
  };
}

const DutchHomeHooks = {
  usePageParams,
  useSetTripCurrency,
};

export default DutchHomeHooks;
