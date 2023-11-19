import { ComicDetailPageParams } from './detail/ComicDetailHooks';
import { ComicViewerPageParams } from './viewer/ComicViewerHooks';

const ComicRoutes = {
  list: '/',

  detail: '/comics/:comicId',
  detailRoute: ({ comicId }: ComicDetailPageParams) => `/comics/${comicId}`,

  viewer: '/comics/:comicId/:order',
  viewerRoute: ({ comicId, order }: ComicViewerPageParams) => `/comics/${comicId}/${order}`,
};

export default ComicRoutes;
