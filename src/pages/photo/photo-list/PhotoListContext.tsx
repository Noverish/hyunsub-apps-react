import { generateStateContext } from 'src/utils/context';

interface State {
  showSearchModal: boolean;
}

const initialState: State = {
  showSearchModal: false,
};

export const [PhotoListContext, PhotoListProvider] = generateStateContext<State>(initialState);
