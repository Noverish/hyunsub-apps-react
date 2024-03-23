import { generateStateContext } from 'src/utils/context';

interface State {
  showSearchModal: boolean;
  showAlbumSelectModal: boolean;
  selectMode?: 'delete' | 'album' | 'download';
}

const initialState: State = {
  showSearchModal: false,
  showAlbumSelectModal: false,
};

export const [PhotoListContext, PhotoListProvider] = generateStateContext<State>(initialState);
