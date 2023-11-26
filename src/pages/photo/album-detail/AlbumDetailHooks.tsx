import { t } from 'i18next';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import PhotoRoutes from '../PhotoRoutes';
import albumDeleteApi, { AlbumDeleteParams } from 'src/api/photo/album-delete';
import albumDetailApi from 'src/api/photo/album-detail';
import albumListApi from 'src/api/photo/album-list';
import albumPhotosApi from 'src/api/photo/album-photos';
import useScrollBottom from 'src/hooks/scroll-bottom';
import router from 'src/pages/router';
import { dispatch } from 'src/redux';
import { GlobalActions } from 'src/redux/global';

export function useAlbumDetailPage() {
  const albumId = useParams().albumId!!;

  const album = albumDetailApi.useApi({ albumId });

  const { data, fetchNextPage, isFetching } = albumPhotosApi.useInfiniteApi({ albumId });
  const pages = data?.pages;
  const photos = useMemo(() => pages?.flatMap((v) => v.data) || [], [pages]);

  useScrollBottom(() => {
    if (!isFetching) {
      fetchNextPage();
    }
  });

  return {
    album,
    photos,
    isFetching,
  };
}

export function useAlbumDelete() {
  return async (params: AlbumDeleteParams) => {
    if (!window.confirm(t('photo.album-delete-confirm'))) {
      return;
    }

    const { albumId } = params;
    dispatch(GlobalActions.update({ loading: true }));

    await albumDeleteApi(params);

    albumListApi.deleteCache({}, (v) => v.id === albumId);

    dispatch(GlobalActions.update({ loading: false }));

    router.navigate(PhotoRoutes.albums);
  };
}
