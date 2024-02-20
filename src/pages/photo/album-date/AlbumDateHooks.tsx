import { useUrlParams } from 'src/hooks/url-params';

export interface AlbumDatePageParams {
  albumId: string;
}

function usePageParams(): AlbumDatePageParams {
  const [albumId] = useUrlParams('albumId');
  return { albumId };
}

const AlbumDateHooks = {
  usePageParams,
};

export default AlbumDateHooks;
