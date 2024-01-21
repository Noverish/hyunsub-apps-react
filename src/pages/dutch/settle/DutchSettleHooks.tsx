import { useContext } from 'react';

import dutchSettleApi from 'src/api/dutch/dutch-settle';
import dutchTripCurrencySetApi from 'src/api/dutch/dutch-trip-currency-set';
import { useUrlParams } from 'src/hooks/url-params';
import { DutchSettleContext } from 'src/pages/dutch/settle/DutchSettleContext';
import { dispatch } from 'src/redux';
import { GlobalActions } from 'src/redux/global';
import { useContextSetter } from 'src/utils/context';

export interface DutchSettlePageParams {
  tripId: string;
}

function usePageParams(): DutchSettlePageParams {
  const [tripId] = useUrlParams('tripId');
  return { tripId };
}

function useSetTripCurrency() {
  const { tripId } = usePageParams();
  const [{ currencyInModal }, setState] = useContext(DutchSettleContext);

  return async (rate: number) => {
    const currency = currencyInModal?.currency;
    if (!currency) {
      return;
    }

    dispatch(GlobalActions.update({ loading: true }));

    await dutchTripCurrencySetApi({ tripId, currency, rate });

    dispatch(GlobalActions.update({ loading: false }));

    setState({
      settleResult: undefined,
      showCurrencyModal: false,
    });
  };
}

function useSettle() {
  const { tripId } = usePageParams();
  const setState = useContextSetter(DutchSettleContext);

  return async (mainMemberId: string) => {
    dispatch(GlobalActions.update({ loading: true }));

    const settleResult = await dutchSettleApi({ tripId, mainMemberId });

    setState({ settleResult });

    dispatch(GlobalActions.update({ loading: false }));
  };
}

const DutchSettleHooks = {
  usePageParams,
  useSetTripCurrency,
  useSettle,
};

export default DutchSettleHooks;
