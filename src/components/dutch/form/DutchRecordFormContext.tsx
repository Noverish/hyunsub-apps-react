import { generateStateContext } from 'src/utils/context';

interface State {
  showActualModal: boolean;
  showShouldModal: boolean;
}

const initialState: State = {
  showActualModal: false,
  showShouldModal: false,
};

export const [DutchRecordFormContext, DutchRecordFormProvider] = generateStateContext<State>(initialState);
