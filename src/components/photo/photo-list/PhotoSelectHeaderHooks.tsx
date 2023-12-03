import { t } from 'i18next';
import { useContext } from 'react';

import PhotoListHooks, {
  useAlbumThumbnailRegister,
  useToggleSelectMode,
} from 'src/components/photo/photo-list/PhotoListHooks';
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

function useHeaderProps(photos: PhotoPreview[], album?: Album): HeaderProps {
  const [albumId] = useOptionalUrlParams('albumId');

  // hooks
  const [{ selectMode, selects }, setState] = useContext(PhotoSelectContext);
  const toggleSelectMode = useToggleSelectMode();
  const registerThumbnail = useAlbumThumbnailRegister(album?.id);
  const albumDelete = AlbumDetailHooks.useAlbumDelete();
  const photoDeleteBulk = PhotoListHooks.usePhotoDeleteBulk();

  // functions
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
    // {
    //   name: t('filter'),
    //   onClick: () => {
    //     alert('Not yet supported!');
    //   },
    // },
    // {
    //   name: t('sort'),
    //   onClick: () => {
    //     alert('Not yet supported!');
    //   },
    // },
    // {
    //   name: t('view'),
    //   onClick: () => {
    //     alert('Not yet supported!');
    //   },
    // },
  ];

  if (albumId) {
    normalMenus.push({
      icon: 'fas fa-trash-alt',
      name: t('AlbumDetailPage.delete-album'),
      onClick: () => albumDelete(albumId),
    });
  }

  const selectMenus: HeaderMoreButton[] = [
    {
      name: selects.length === 0 ? t('PhotoListView.select-all') : t('PhotoListView.unselect-all'),
      onClick: () => {
        if (selects.length === 0) {
          selectAll();
        } else {
          unselectAll();
        }
      },
    },
    {
      name: t('PhotoListView.add-to-album'),
      onClick: () => setState({ showAlbumSelectModal: true }),
    },
    {
      icon: 'fas fa-trash-alt',
      name: t('PhotoListView.delete-photo'),
      onClick: () => photoDeleteBulk(),
    },
  ];

  if (albumId) {
    selectMenus.push({
      name: t('PhotoListView.delete-from-album'),
      onClick: () => {
        alert('Not yet supported!');
      },
    });
  }

  if (registerThumbnail) {
    selectMenus.push({
      name: t('photo.register-thumbnail'),
      onClick: registerThumbnail,
    });
  }

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
