import { generateContext } from 'src/utils/context';

export interface State {
  mode: 'photo' | 'metadata';
  albumId: string;
}

const initialState: State = {
  mode: 'photo',
  albumId: '',
}

export const [AlbumDetailContext, AlbumDetailProvider] = generateContext(initialState);
