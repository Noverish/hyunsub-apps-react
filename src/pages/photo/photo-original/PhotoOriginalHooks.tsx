import { useUrlParams } from 'src/hooks/url-params';

export interface PhotoOriginalPageParams {
  photoId: string;
}

function usePageParams(): PhotoOriginalPageParams {
  const [photoId] = useUrlParams('photoId');

  return { photoId };
}

const PhotoOriginalHooks = {
  usePageParams,
};

export default PhotoOriginalHooks;
