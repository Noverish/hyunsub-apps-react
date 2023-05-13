import { generateStateContext } from 'src/utils/context';

interface State {
  nonce?: string;
  loading: boolean;
}

const initialState: State = {
  loading: false,
};

export const [YoutubeDownloadContext, YoutubeDownloadProvider] = generateStateContext(initialState);
