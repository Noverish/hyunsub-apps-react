import { useUrlParams } from 'src/hooks/url-params';

export interface ComicViewerPageParams {
  comicId: string;
  order: number;
}

function usePageParams(): ComicViewerPageParams {
  const [comicId, order] = useUrlParams('comicId', 'order');

  return {
    comicId,
    order: parseInt(order),
  };
}

const ComicViewerHooks = {
  usePageParams,
};

export default ComicViewerHooks;
