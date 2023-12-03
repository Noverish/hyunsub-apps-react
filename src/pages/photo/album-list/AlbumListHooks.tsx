import PhotoRoutes from '../PhotoRoutes';
import albumCreateApi, { AlbumCreateParams } from 'src/api/photo/album-create';
import router from 'src/pages/router';
import { dispatch } from 'src/redux';
import { GlobalActions } from 'src/redux/global';

export function useAlbumCreate() {
  return async (params: AlbumCreateParams) => {
    dispatch(GlobalActions.update({ loading: true }));

    const album = await albumCreateApi(params);

    dispatch(GlobalActions.update({ loading: false }));

    router.navigate(PhotoRoutes.albumDetail(album.id));
  };
}
