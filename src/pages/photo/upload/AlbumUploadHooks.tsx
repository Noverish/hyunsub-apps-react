import { useUrlParams } from 'src/hooks/url-params';

export interface AlbumUploadPageParams {
  albumId: string;
}

function usePageParams(): AlbumUploadPageParams {
  const [albumId] = useUrlParams('albumId');
  return { albumId };
}

const AlbumUploadHooks = {
  usePageParams,
};

export default AlbumUploadHooks;
