import { generateStateContext } from 'src/utils/context';

interface State {
  showSetting: boolean;
  showAdmin: boolean;
  subtitleSync: { [subtitleUrl: string]: number };
  season: string | null;
  page: number;
};

const initialState: State = {
  showSetting: false,
  showAdmin: false,
  subtitleSync: {},
  season: null,
  page: 0,
};

export const [VideoDetailContext, VideoDetailProvider] = generateStateContext(initialState);
