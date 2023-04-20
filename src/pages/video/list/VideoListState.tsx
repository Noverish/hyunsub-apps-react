import { generateStateContext } from 'src/utils/context';

interface State {
  seed: number;
  showSortModal: boolean;
};

const initialState: State = {
  seed: Math.floor(new Date().getTime() / 1000),
  showSortModal: false,
};

export const [VideoListContext, VideoListProvider] = generateStateContext(initialState);
