import { useContext } from 'react';

import PhotoRoutes from '../PhotoRoutes';
import { PhotoDetailContext } from './PhotoDetailContext';
import photoDateUpdateApi, { PhotoDateUpdateParams } from 'src/api/photo/photo-date-update';
import { useUrlParams } from 'src/hooks/url-params';
import router from 'src/pages/router';
import { dispatch } from 'src/redux';
import { GlobalActions } from 'src/redux/global';

export interface PhotoDetailPageParams {
  photoId: string;
}

function usePageParams(): PhotoDetailPageParams {
  const [photoId] = useUrlParams('photoId');
  return { photoId };
}

function useShowDateModal(show: boolean) {
  const setState = useContext(PhotoDetailContext)[1];

  return () => {
    setState({ showDateModal: show });
  };
}

function usePhotoDateUpdate() {
  const hide = useShowDateModal(false);

  return async (params: PhotoDateUpdateParams) => {
    dispatch(GlobalActions.update({ loading: true }));

    const result = await photoDateUpdateApi(params);

    hide();

    dispatch(GlobalActions.update({ loading: false }));

    router.navigate(PhotoRoutes.photoDetail({ photoId: result.id }), { replace: true });
  };
}

const PhotoDetailHooks = {
  usePageParams,
  useShowDateModal,
  usePhotoDateUpdate,
};

export default PhotoDetailHooks;
