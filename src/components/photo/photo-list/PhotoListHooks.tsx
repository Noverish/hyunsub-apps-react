import { useContext } from 'react';

import { PhotoSelectContext } from './PhotoSelectContext';
import albumListApi from 'src/api/photo/album-list';
import albumPhotoRegisterApi from 'src/api/photo/album-photo-register';
import albumThumbnailApi from 'src/api/photo/album-thumbnail';
import { AlbumPreview, PhotoPreview } from 'src/model/photo';
import { dispatch } from 'src/redux';
import { GlobalActions } from 'src/redux/global';
import { t } from 'i18next';

export function usePhotoListSelect(previews: PhotoPreview[]) {
  const [state, setState] = useContext(PhotoSelectContext);

  const { selectMode, selects, lastSelected } = state;

  const onSelect = (preview: PhotoPreview, shiftKey: boolean) => {
    const index = selects.indexOf(preview);

    if (index < 0 && shiftKey && lastSelected) {
      const index1 = previews.indexOf(preview);
      const index2 = previews.indexOf(lastSelected);
      const [start, end] = [index1, index2].sort((a, b) => a - b);
      const list = previews.slice(start, end + 1);
      const set = new Set([...selects, ...list]);
      setState({ selects: Array.from(set) });
      return;
    }

    if (index < 0) {
      setState((s) => {
        s.selects.push(preview);
        s.lastSelected = preview;
      });
    } else {
      setState((s) => {
        s.selects.splice(index, 1);
        s.lastSelected = undefined;
      });
    }
  };

  return { selects, onSelect, selectMode };
}

export function useToggleSelectMode() {
  const [{ selectMode }, setState] = useContext(PhotoSelectContext);

  return () => {
    if (selectMode) {
      setState({
        selectMode: false,
        selects: [],
        lastSelected: undefined,
      });
    } else {
      setState({
        selectMode: true,
      });
    }
  };
}

export function useAlbumPhotoRegister() {
  const [state, setState] = useContext(PhotoSelectContext);

  return async (preview: AlbumPreview) => {
    dispatch(GlobalActions.update({ loading: true }));

    await albumPhotoRegisterApi({
      albumId: preview.id,
      photoIds: state.selects.map((v) => v.id),
    });

    setState({
      selectMode: false,
      selects: [],
      lastSelected: undefined,
      showAlbumSelectModal: false,
    });

    dispatch(GlobalActions.update({ loading: false }));
  };
}

export function useAlbumThumbnailRegister(albumId?: string) {
  const [state, setState] = useContext(PhotoSelectContext);
  const toggleSelectMode = useToggleSelectMode();

  if (!albumId) {
    return undefined;
  }

  if (state.selects.length !== 1) {
    return undefined;
  }

  const photo = state.selects[0];

  return async () => {
    dispatch(GlobalActions.update({ loading: true }));

    setState({ showSelectActionModal: false });
    toggleSelectMode();

    const album = await albumThumbnailApi({ albumId, photoId: photo.id });

    albumListApi.updateCache({}, (cache) => {
      if (cache.id === album.id) {
        cache.thumbnail = album.thumbnail;
      }
    });

    alert(t('AlbumDetailPage.msg.register-thumbnail-success'));

    dispatch(GlobalActions.update({ loading: false }));
  };
}
