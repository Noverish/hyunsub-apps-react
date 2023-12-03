import { useContext } from 'react';

import { PhotoSelectContext } from './PhotoSelectContext';
import PhotoSelectHooks from './PhotoSelectHooks';
import albumPhotoDeleteBulkApi from 'src/api/photo/album-photo-delete-bulk';
import albumPhotoRegisterApi from 'src/api/photo/album-photo-register';
import albumThumbnailApi from 'src/api/photo/album-thumbnail';
import photoDeleteBulkApi from 'src/api/photo/photo-delete-bulk';
import photoDetailApi from 'src/api/photo/photo-detail';
import { AlbumPreview } from 'src/model/photo';
import { dispatch } from 'src/redux';
import { GlobalActions } from 'src/redux/global';

function useAlbumThumbnailRegister() {
  const [{ selects }] = useContext(PhotoSelectContext);
  const clear = PhotoSelectHooks.useClear();
  const photoId = selects[0]?.id;

  return async (albumId: string) => {
    dispatch(GlobalActions.update({ loading: true }));

    await albumThumbnailApi({ albumId, photoId });

    clear();

    dispatch(GlobalActions.update({ loading: false }));
  };
}

function useAlbumPhotoRegister() {
  const [{ selects }, setState] = useContext(PhotoSelectContext);
  const clear = PhotoSelectHooks.useClear();
  const photoIds = selects.map((v) => v.id);

  return async (preview: AlbumPreview) => {
    dispatch(GlobalActions.update({ loading: true }));

    setState({ showSelectActionModal: false });

    await albumPhotoRegisterApi({ albumId: preview.id, photoIds });

    clear();

    dispatch(GlobalActions.update({ loading: false }));
  };
}

function usePhotoDownload() {
  const [{ selects }] = useContext(PhotoSelectContext);

  return async (albumId?: string) => {
    for (const select of selects) {
      const photoId = select.id;
      const photo = await photoDetailApi.fetch({ photoId, albumId });

      const url = `${photo.original}?downloadName=${encodeURI(photo.fileName)}`;
      const link = document.createElement('a');
      link.href = url;
      link.download = photo.fileName;
      link.click();
    }
  };
}

function usePhotoDelete() {
  const [{ selects }] = useContext(PhotoSelectContext);
  const clear = PhotoSelectHooks.useClear();
  const photoIds = selects.map((v) => v.id);

  return async () => {
    dispatch(GlobalActions.update({ loading: true }));

    await photoDeleteBulkApi({ photoIds });

    clear();

    dispatch(GlobalActions.update({ loading: false }));
  };
}

function useAlbumPhotoDelete() {
  const [{ selects }] = useContext(PhotoSelectContext);
  const clear = PhotoSelectHooks.useClear();
  const photoIds = selects.map((v) => v.id);

  return async (albumId: string) => {
    dispatch(GlobalActions.update({ loading: true }));

    await albumPhotoDeleteBulkApi({ albumId, photoIds });

    clear();

    dispatch(GlobalActions.update({ loading: false }));
  };
}

const PhotoActionHooks = {
  useAlbumThumbnailRegister,
  useAlbumPhotoRegister,
  usePhotoDelete,
  useAlbumPhotoDelete,
  usePhotoDownload,
};

export default PhotoActionHooks;
