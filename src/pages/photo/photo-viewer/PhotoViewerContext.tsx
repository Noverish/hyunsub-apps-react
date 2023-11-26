import { generateStateContext } from 'src/utils/context';

interface State {
  currPhotoId?: string;
}

const initialState: State = {};

export const [PhotoViewerContext, PhotoViewerProvider] = generateStateContext<State>(initialState);
