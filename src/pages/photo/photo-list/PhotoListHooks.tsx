import { t } from 'i18next';
import { useContext } from 'react';

import PhotoRoutes from '../PhotoRoutes';
import { PhotoListContext } from './PhotoListContext';
import albumPhotoRegisterApi from 'src/api/photo/album-photo-create';
import photoDeleteApi from 'src/api/photo/photo-delete-bulk';
import { PhotoSearchParams } from 'src/api/photo/photo-search';
import { PhotoSelectContext } from 'src/components/photo/photo-list/PhotoSelectContext';
import PhotoSelectHeaderHooks from 'src/components/photo/photo-list/PhotoSelectHeaderHooks';
import PhotoSelectHooks from 'src/components/photo/photo-list/PhotoSelectHooks';
import PhotoHooks from 'src/hooks/photo';
import { useOptionalUrlParams } from 'src/hooks/url-params';
import { HeaderMoreButton, HeaderProps } from 'src/model/component';
import { AlbumPreview } from 'src/model/photo';
import { PhotoSearchFormState } from 'src/pages/photo/photo-list/components/PhotoSearchForm';
import router from 'src/pages/router';
import { dispatch } from 'src/redux';
import { GlobalActions } from 'src/redux/global';
import { useContextSetter } from 'src/utils/context';

export interface PhotoListPageParams extends PhotoSearchFormState {}

function usePageParams(): PhotoListPageParams {
  const [start, end, _orphan] = useOptionalUrlParams('start', 'end', 'orphan');
  const orphan = _orphan === 'true';
  return { start, end, orphan };
}

function useSearchParams(): PhotoSearchParams {
  const { start, end, orphan } = usePageParams();

  return {
    dateRange: start && end ? { start, end } : undefined,
    orphan,
  };
}

function useSearch() {
  const setState = useContextSetter(PhotoListContext);
  const pageParams = usePageParams();

  return (state: PhotoSearchFormState) => {
    const newPageParams = { ...pageParams, ...state };

    setState({ showSearchModal: false });

    router.navigate(PhotoRoutes.photos(newPageParams));
  };
}

function useDelete() {
  const setPageState = useContextSetter(PhotoListContext);
  const [{ selects }] = useContext(PhotoSelectContext);
  const clear = PhotoSelectHooks.useClear();

  return async () => {
    const cnt = selects.length;
    if (!window.confirm(t('photo.msg.photo-delete-confirm', { cnt }))) {
      return;
    }

    const photoIds = selects.map((v) => v.id);

    dispatch(GlobalActions.update({ loading: true }));

    await photoDeleteApi({ photoIds });

    dispatch(GlobalActions.update({ loading: false }));

    setPageState({ selectMode: undefined });
    clear();
  };
}

function useShowAlbumSelectModal() {
  const setPageState = useContextSetter(PhotoListContext);

  return async () => {
    setPageState({ showAlbumSelectModal: true });
  };
}

function useAddToAlbum() {
  const setPageState = useContextSetter(PhotoListContext);
  const [{ selects }] = useContext(PhotoSelectContext);
  const clear = PhotoSelectHooks.useClear();

  return async (album: AlbumPreview) => {
    const photoIds = selects.map((v) => v.id);

    dispatch(GlobalActions.update({ loading: true }));

    await albumPhotoRegisterApi({ albumId: album.id, photoIds });

    dispatch(GlobalActions.update({ loading: false }));

    setPageState({ selectMode: undefined, showAlbumSelectModal: false });
    clear();

    router.navigate(PhotoRoutes.albumDetail(album.id));
  };
}

function useDownload() {
  const setPageState = useContextSetter(PhotoListContext);
  const [{ selects }] = useContext(PhotoSelectContext);
  const clear = PhotoSelectHooks.useClear();

  return async () => {
    for (const select of selects) {
      await PhotoHooks.downloadPhoto(select.id, undefined);
    }

    setPageState({ selectMode: undefined });
    clear();
  };
}

function useSelectComplete() {
  const [{ selectMode }] = useContext(PhotoListContext);

  const deletePhoto = useDelete();
  const showAlbumSelectModal = useShowAlbumSelectModal();
  const download = useDownload();

  switch (selectMode) {
    case 'delete':
      return deletePhoto;
    case 'album':
      return showAlbumSelectModal;
    case 'download':
      return download;
    default:
      return undefined;
  }
}

function useHeaderProps(): HeaderProps {
  const setPageState = useContextSetter(PhotoListContext);
  const [{ selectMode }, setSelectState] = useContext(PhotoSelectContext);

  const onComplete = useSelectComplete();
  const headerPropsOnSelect = PhotoSelectHeaderHooks.useHeaderProps(onComplete);

  if (selectMode) {
    return headerPropsOnSelect;
  }

  const title = t('PhotoListPage.title');

  const menus: HeaderMoreButton[] = [
    {
      icon: 'fas fa-search',
      name: t('search'),
      onClick: () => setPageState({ showSearchModal: true }),
    },
    {
      icon: 'fas fa-trash',
      name: t('delete'),
      onClick: () => {
        setPageState({ selectMode: 'delete' });
        setSelectState({ selectMode: true });
      },
    },
    {
      icon: 'fas fa-plus',
      name: t('PhotoListView.add-to-album'),
      onClick: () => {
        setPageState({ selectMode: 'album' });
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
  ];

  return {
    title,
    menus,
  };
}

const PhotoListHooks = {
  usePageParams,
  useHeaderProps,
  useSearch,
  useSearchParams,
  useAddToAlbum,
};

export default PhotoListHooks;
