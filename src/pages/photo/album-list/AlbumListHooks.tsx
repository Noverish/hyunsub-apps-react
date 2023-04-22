import albumListApi from 'src/api/photo/album-list';
import { dispatch } from 'src/redux';
import { GlobalActions } from 'src/redux/global';
import { AlbumCreateParams } from 'src/api/photo/album-create';
import albumCreateApi from 'src/api/photo/album-create';

export function useAlbumCreate() {
  return async (params: AlbumCreateParams) => {
    dispatch(GlobalActions.update({ loading: true }));

    const album = await albumCreateApi(params);

    albumListApi.insertToCache({}, album);

    dispatch(GlobalActions.update({ loading: false }));
  }
}
