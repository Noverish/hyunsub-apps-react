import { DutchSettleResult, DutchTripCurrency } from 'src/model/dutch';
import { generateStateContext } from 'src/utils/context';

interface State {
  showCurrencyModal: boolean;
  currencyInModal?: DutchTripCurrency;
  mainMemberId?: string;
  settleResult?: DutchSettleResult;
}

const initialState: State = {
  showCurrencyModal: false,
};

export const [DutchSettleContext, DutchSettleProvider] = generateStateContext<State>(initialState);
