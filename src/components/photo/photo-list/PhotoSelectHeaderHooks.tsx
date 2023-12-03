import { t } from 'i18next';
import { useContext } from 'react';

import PhotoActionHooks from './PhotoActionHooks';
import PhotoSelectHooks from './PhotoSelectHooks';
import { PhotoSelectContext } from 'src/components/photo/photo-list/PhotoSelectContext';
import { useOptionalUrlParams } from 'src/hooks/url-params';
import { HeaderButton, HeaderMoreButton, HeaderProps } from 'src/model/component';
import { Album, PhotoPreview } from 'src/model/photo';
import PhotoRoutes from 'src/pages/photo/PhotoRoutes';
import AlbumDetailHooks from 'src/pages/photo/album-detail/AlbumDetailHooks';
import router from 'src/pages/router';

function useTitle(albumName: string) {
  const [albumId] = useOptionalUrlParams('albumId');
  const [{ selectMode, selects }] = useContext(PhotoSelectContext);

  if (selectMode) {
    return t('n-selected', [selects.length]);
  }

  if (albumId) {
    return albumName;
  } else {
    return t('photo.page.photo-list.title');
  }
}

function useSelectMenus(photos: PhotoPreview[]): HeaderMoreButton[] {
  const [albumId] = useOptionalUrlParams('albumId');
  const [{ selects }, setState] = useContext(PhotoSelectContext);

  const photoDownload = PhotoActionHooks.usePhotoDownload();
  const photoDelete = PhotoActionHooks.usePhotoDelete();
  const albumPhotoDelete = PhotoActionHooks.useAlbumPhotoDelete();
  const albumThumbnailRegister = PhotoActionHooks.useAlbumThumbnailRegister();

  const selectAll = () => {
    setState({
      selects: [...photos],
    });
  };

  const unselectAll = () => {
    setState({
      selects: [],
      lastSelected: undefined,
    });
  };

  const result: HeaderMoreButton[] = [];

  if (albumId) {
    if (selects.length === 0) {
      result.push({
        name: t('PhotoListView.select-all'),
        onClick: () => selectAll(),
      });
    } else {
      result.push({
        name: t('PhotoListView.unselect-all'),
        onClick: () => unselectAll(),
      });
    }
  }

  result.push({
    icon: 'fas fa-download',
    name: t('download'),
    onClick: () => photoDownload(albumId),
  });

  result.push({
    icon: 'fas fa-plus',
    name: t('PhotoListView.add-to-album'),
    onClick: () => setState({ showAlbumSelectModal: true }),
  });

  result.push({
    icon: 'fas fa-trash-alt',
    name: t('PhotoListView.delete-photo'),
    onClick: () => photoDelete(),
  });

  if (albumId) {
    result.push({
      icon: 'fas fa-trash-alt',
      name: t('PhotoListView.delete-from-album'),
      onClick: () => albumPhotoDelete(albumId),
    });
  }

  if (albumId && selects.length === 1) {
    result.push({
      name: t('photo.register-thumbnail'),
      onClick: () => albumThumbnailRegister(albumId),
    });
  }

  return result;
}

function useHeaderProps(photos: PhotoPreview[], album?: Album): HeaderProps {
  const [albumId] = useOptionalUrlParams('albumId');

  // hooks
  const [{ selectMode }] = useContext(PhotoSelectContext);
  const toggleSelectMode = PhotoSelectHooks.useToggle();
  const albumDelete = AlbumDetailHooks.useAlbumDelete();

  // elements
  const normalBtns: HeaderButton[] = [
    {
      icon: 'far fa-check-circle',
      name: t('select'),
      onClick: toggleSelectMode,
    },
  ];

  const normalMenus: HeaderMoreButton[] = [
    {
      icon: 'fas fa-upload',
      name: t('upload'),
      onClick: () => {
        if (albumId) {
          router.navigate(PhotoRoutes.albumUpload(albumId));
        } else {
          router.navigate(PhotoRoutes.photoUpload);
        }
      },
    },
  ];

  if (albumId) {
    normalMenus.push({
      icon: 'fas fa-trash-alt',
      name: t('AlbumDetailPage.delete-album'),
      onClick: () => albumDelete(albumId),
    });
  }

  const selectMenus = useSelectMenus(photos);

  const title = useTitle(album?.name ?? '');

  const back = selectMode ? false : !!album;

  return {
    title,
    back,
    onClose: selectMode ? toggleSelectMode : undefined,
    btns: selectMode ? undefined : normalBtns,
    menus: selectMode ? selectMenus : normalMenus,
  };
}

const PhotoSelectHeaderHooks = {
  useHeaderProps,
};

export default PhotoSelectHeaderHooks;
