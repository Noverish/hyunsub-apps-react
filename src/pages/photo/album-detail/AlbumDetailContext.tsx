import { AlbumPhotosParams } from 'src/api/photo/album-photos';
import { generateStateContext } from 'src/utils/context';

export interface AlbumDetailState {
  showSearchModal: boolean;
  photoSearchParams: Omit<AlbumPhotosParams, 'albumId'>;
}

const initialState: AlbumDetailState = {
  showSearchModal: false,
  photoSearchParams: {},
};

export const [AlbumDetailContext, AlbumDetailProvider] = generateStateContext<AlbumDetailState>(initialState);
