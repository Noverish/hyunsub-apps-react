import { generateStateContext } from 'src/utils/context';

interface State {
  currPhotoId?: string;
}

const initialState: State = {};

export const [AlbumViewerContext, AlbumViewerProvider] = generateStateContext<State>(initialState);
