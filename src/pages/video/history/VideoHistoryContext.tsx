import { generateStateContext } from 'src/utils/context';

interface State {
  category: string;
}

const initialState: State = {
  category: '',
};

export const [VideoHistoryContext, VideoHistoryProvider] = generateStateContext(initialState);
