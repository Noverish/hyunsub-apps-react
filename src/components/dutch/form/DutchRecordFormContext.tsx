import { generateStateContext } from 'src/utils/context';

interface State {
  error?: string;
}

const initialState: State = {};

export const [DutchRecordFormContext, DutchRecordFormProvider] = generateStateContext<State>(initialState);
