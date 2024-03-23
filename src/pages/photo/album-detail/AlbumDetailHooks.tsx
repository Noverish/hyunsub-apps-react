import { t } from 'i18next';
import { useContext } from 'react';

import { AlbumDetailContext } from './AlbumDetailContext';
import albumDeleteApi from 'src/api/photo/album-delete';
import albumPhotoDeleteApi from 'src/api/photo/album-photo-delete';
import albumThumbnailApi from 'src/api/photo/album-thumbnail';
import { PhotoSelectContext } from 'src/components/photo/photo-list/PhotoSelectContext';
import PhotoSelectHeaderHooks from 'src/components/photo/photo-list/PhotoSelectHeaderHooks';
import PhotoSelectHooks from 'src/components/photo/photo-list/PhotoSelectHooks';
import PhotoHooks from 'src/hooks/photo';
import { useUrlParams } from 'src/hooks/url-params';
import { HeaderMoreButton, HeaderProps } from 'src/model/component';
import { Album } from 'src/model/photo';
import router from 'src/pages/router';
import { dispatch } from 'src/redux';
import { GlobalActions } from 'src/redux/global';
import { useContextSetter } from 'src/utils/context';

export interface AlbumDetailPageParams {
  albumId: string;
}

function usePageParams(): AlbumDetailPageParams {
  const [albumId] = useUrlParams('albumId');
  return { albumId };
}

function useDeleteAlbum() {
  const { albumId } = usePageParams();

  return async () => {
    if (!window.confirm(t('photo.album-delete-confirm'))) {
      return;
    }

    dispatch(GlobalActions.update({ loading: true }));

    await albumDeleteApi({ albumId });

    dispatch(GlobalActions.update({ loading: false }));

    router.navigate(-1);
  };
}

function useDeletePhoto() {
  const { albumId } = usePageParams();
  const setPageState = useContextSetter(AlbumDetailContext);
  const [{ selects }] = useContext(PhotoSelectContext);
  const clear = PhotoSelectHooks.useClear();

  return async () => {
    const cnt = selects.length;
    if (!window.confirm(t('photo.msg.photo-delete-from-album-confirm', { cnt }))) {
      return;
    }

    const photoIds = selects.map((v) => v.id);

    dispatch(GlobalActions.update({ loading: true }));

    await albumPhotoDeleteApi({ albumId, photoIds });

    dispatch(GlobalActions.update({ loading: false }));

    setPageState({ selectMode: undefined });
    clear();
  };
}

function useRegisterThumbnail() {
  const { albumId } = usePageParams();
  const setPageState = useContextSetter(AlbumDetailContext);
  const [{ selects }] = useContext(PhotoSelectContext);
  const clear = PhotoSelectHooks.useClear();

  return async () => {
    const photoId = selects[0].id;

    dispatch(GlobalActions.update({ loading: true }));

    await albumThumbnailApi({ albumId, photoId });

    dispatch(GlobalActions.update({ loading: false }));

    setPageState({ selectMode: undefined });
    clear();
  };
}

function useDownlaod() {
  const { albumId } = usePageParams();
  const setPageState = useContextSetter(AlbumDetailContext);
  const [{ selects }] = useContext(PhotoSelectContext);
  const clear = PhotoSelectHooks.useClear();

  return async () => {
    for (const select of selects) {
      await PhotoHooks.downloadPhoto(select.id, albumId);
    }

    setPageState({ selectMode: undefined });
    clear();
  };
}

function useSelectComplete() {
  const [{ selectMode }] = useContext(AlbumDetailContext);

  const deletePhoto = useDeletePhoto();
  const registerThumbnail = useRegisterThumbnail();
  const download = useDownlaod();

  switch (selectMode) {
    case 'delete':
      return deletePhoto;
    case 'thumbnail':
      return registerThumbnail;
    case 'download':
      return download;
    default:
      return undefined;
  }
}

function useHeaderProps(album?: Album): HeaderProps {
  const setPageState = useContextSetter(AlbumDetailContext);
  const [{ selectMode }, setSelectState] = useContext(PhotoSelectContext);

  const deleteAlbum = useDeleteAlbum();
  const onComplete = useSelectComplete();
  const headerPropsOnSelect = PhotoSelectHeaderHooks.useHeaderProps(onComplete);

  if (selectMode) {
    return headerPropsOnSelect;
  }

  const title = album?.name ?? '';

  const menus: HeaderMoreButton[] = [
    {
      icon: 'fas fa-search',
      name: t('search'),
      onClick: () => setPageState({ showSearchModal: true }),
    },
    {
      icon: 'fas fa-trash',
      name: t('PhotoListView.delete-from-album'),
      onClick: () => {
        setPageState({ selectMode: 'delete' });
        setSelectState({ selectMode: true });
      },
    },
    {
      icon: 'fas fa-plus',
      name: t('photo.register-thumbnail'),
      onClick: () => {
        setPageState({ selectMode: 'thumbnail' });
        setSelectState({ selectMode: true });
      },
    },
    {
      icon: 'fas fa-download',
      name: t('download'),
      onClick: () => {
        setPageState({ selectMode: 'download' });
        setSelectState({ selectMode: true });
      },
    },
    {
      icon: 'fas fa-trash',
      name: t('AlbumDetailPage.delete-album'),
      onClick: deleteAlbum,
    },
  ];

  return {
    title,
    menus,
  };
}

const AlbumDetailHooks = {
  usePageParams,
  useAlbumDelete: useDeleteAlbum,
  useHeaderProps,
};

export default AlbumDetailHooks;
