import { generateContext } from 'src/utils/context';

export interface State {
  albumId: string;
}

const initialState: State = {
  albumId: '',
}

export const [AlbumDetailContext, AlbumDetailProvider] = generateContext(initialState);
