import { useUrlParams } from 'src/hooks/url-params';

export interface PhotoDetailPageParams {
  photoId: string;
}

function usePageParams(): PhotoDetailPageParams {
  const [photoId] = useUrlParams('photoId');
  return { photoId };
}

const PhotoDetailHooks = {
  usePageParams,
};

export default PhotoDetailHooks;
