import { generateStateContext } from 'src/utils/context';

interface State {
  showSearch: boolean;
}

const initialState: State = {
  showSearch: false,
};

export const [DutchRecordListContext, DutchRecordListProvider] = generateStateContext<State>(initialState);
