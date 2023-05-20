import { AlbumCreateParams } from 'src/api/photo/album-create';
import albumCreateApi from 'src/api/photo/album-create';
import albumListApi from 'src/api/photo/album-list';
import { dispatch } from 'src/redux';
import { GlobalActions } from 'src/redux/global';

export function useAlbumCreate() {
  return async (params: AlbumCreateParams) => {
    dispatch(GlobalActions.update({ loading: true }));

    const album = await albumCreateApi(params);

    albumListApi.insertCache({}, album);

    dispatch(GlobalActions.update({ loading: false }));
  };
}
