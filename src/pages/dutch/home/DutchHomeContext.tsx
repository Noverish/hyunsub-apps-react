import { DutchTripCurrency } from 'src/model/dutch';
import { generateStateContext } from 'src/utils/context';

interface State {
  showCurrencyModal: boolean;
  currencyInModal?: DutchTripCurrency;
}

const initialState: State = {
  showCurrencyModal: false,
};

export const [DutchHomeContext, DutchHomeProvider] = generateStateContext<State>(initialState);
