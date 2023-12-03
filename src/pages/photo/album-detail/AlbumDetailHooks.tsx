import { t } from 'i18next';

import albumDeleteApi from 'src/api/photo/album-delete';
import { useUrlParams } from 'src/hooks/url-params';
import router from 'src/pages/router';
import { dispatch } from 'src/redux';
import { GlobalActions } from 'src/redux/global';

export interface AlbumDetailPageParams {
  albumId: string;
}

function usePageParams(): AlbumDetailPageParams {
  const [albumId] = useUrlParams('albumId');
  return { albumId };
}

function useAlbumDelete() {
  return async (albumId: string) => {
    if (!window.confirm(t('photo.album-delete-confirm'))) {
      return;
    }

    dispatch(GlobalActions.update({ loading: true }));

    await albumDeleteApi({ albumId });

    dispatch(GlobalActions.update({ loading: false }));

    router.navigate(-1);
  };
}

const AlbumDetailHooks = {
  usePageParams,
  useAlbumDelete,
};

export default AlbumDetailHooks;
