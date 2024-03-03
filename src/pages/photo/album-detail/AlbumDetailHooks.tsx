import { t } from 'i18next';

import PhotoRoutes from '../PhotoRoutes';
import albumDeleteApi from 'src/api/photo/album-delete';
import PhotoSelectHeaderHooks from 'src/components/photo/photo-list/PhotoSelectHeaderHooks';
import { useUrlParams } from 'src/hooks/url-params';
import { Album, PhotoPreview } from 'src/model/photo';
import router from 'src/pages/router';
import { dispatch } from 'src/redux';
import { GlobalActions } from 'src/redux/global';
import { useBreakpointMobile } from 'src/utils/breakpoint';

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

function useHeaderProps(photos: PhotoPreview[], album?: Album, onSearch: (() => void) | undefined = undefined) {
  const { albumId } = usePageParams();
  const isMobile = useBreakpointMobile();

  const props = PhotoSelectHeaderHooks.useHeaderProps(photos, album);
  const btns = props.btns ?? [];

  if (onSearch) {
    btns.push({
      icon: 'fas fa-search',
      name: t('search'),
      onClick: onSearch,
    });
  }

  if (!isMobile) {
    btns.unshift({
      icon: 'far fa-calendar-alt',
      name: t('photo.view-as-date'),
      onClick: () => router.navigate(PhotoRoutes.albumDate({ albumId })),
    });
  }

  props.btns = btns;

  return props;
}

const AlbumDetailHooks = {
  usePageParams,
  useAlbumDelete,
  useHeaderProps,
};

export default AlbumDetailHooks;
