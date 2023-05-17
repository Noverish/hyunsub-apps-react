import { generateStateContext } from 'src/utils/context';

interface State {
  showSetting: boolean;
  subtitleSync: { [subtitleUrl: string]: number };
  season: string | null;
  page: number;
}

const initialState: State = {
  showSetting: false,
  subtitleSync: {},
  season: null,
  page: 0,
};

export const [VideoDetailContext, VideoDetailProvider] = generateStateContext(initialState);
