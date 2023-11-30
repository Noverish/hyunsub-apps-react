import queryString from 'query-string';

import { ComicDetailPageParams } from './detail/ComicDetailHooks';
import { ComicViewerPageParams } from './viewer/ComicViewerHooks';

const { stringifyUrl } = queryString;

const ComicRoutes = {
  list: '/',

  history: '/history',

  detail: '/comics/:comicId',
  detailRoute: ({ comicId }: ComicDetailPageParams) => `/comics/${comicId}`,

  viewer: '/comics/:comicId/:order',
  viewerRoute: ({ comicId, order, ...query }: ComicViewerPageParams) =>
    stringifyUrl({ url: `/comics/${comicId}/${order}`, query }),
};

export default ComicRoutes;
