import { generateStateContext } from 'src/utils/context';

interface State {
  showDateModal: boolean;
}

const initialState: State = {
  showDateModal: false,
};

export const [PhotoDetailContext, PhotoDetailProvider] = generateStateContext<State>(initialState);
