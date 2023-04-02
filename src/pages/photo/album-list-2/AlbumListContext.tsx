import { generateContext } from 'src/utils/context';

export interface State {
  showAlbumCreateModal: boolean;
}

const initialState: State = {
  showAlbumCreateModal: false,
}

export const [AlbumListContext, AlbumListProvider] = generateContext(initialState);
