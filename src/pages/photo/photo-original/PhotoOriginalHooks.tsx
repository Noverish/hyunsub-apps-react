import { useOptionalUrlParams, useUrlParams } from 'src/hooks/url-params';

export interface PhotoOriginalPageParams {
  photoId: string;
  albumId?: string;
}

function usePageParams(): PhotoOriginalPageParams {
  const [photoId] = useUrlParams('photoId');
  const [albumId] = useOptionalUrlParams('albumId');

  return { albumId, photoId };
}

const PhotoOriginalHooks = {
  usePageParams,
};

export default PhotoOriginalHooks;
