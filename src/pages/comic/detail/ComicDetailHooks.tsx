import { useUrlParams } from 'src/hooks/url-params';

export interface ComicDetailPageParams {
  comicId: string;
}

function usePageParams(): ComicDetailPageParams {
  const [comicId] = useUrlParams('comicId');

  return { comicId };
}

const ComicDetailHooks = {
  usePageParams,
};

export default ComicDetailHooks;
