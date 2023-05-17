import { generateStateContext } from 'src/utils/context';

interface State {
  url: string;
  nonce?: string;
  loading: boolean;
}

export const initialState: State = {
  url: '',
  loading: false,
};

export const [YoutubeDownloadContext, YoutubeDownloadProvider] = generateStateContext(initialState);
