import { stringifyUrl } from 'query-string';

interface VideoDetailRouteParams {
  entryId: string;
  videoId?: string;
  autoplay?: boolean;
}

const VideoRoutes = {
  home: '/',

  history: '/history',

  listRoute: '/list/:category',
  list: (category: string) => `/list/${category}`,

  detailRoute: '/entry/:entryId',
  detail: ({ entryId, videoId, autoplay }: VideoDetailRouteParams) => {
    return stringifyUrl({
      url: `/entry/${entryId}`,
      query: { videoId, autoplay },
    });
  },

  admin: '/admin',

  entryManageRoute: '/entry/:entryId/manage',
  entryManage: (entryId: string) => `/entry/${entryId}/manage`,

  videoManageRoute: '/video/:videoId/manage',
  videoManage: (videoId: string) => `/video/${videoId}/manage`,

  search: '/search',

  menu: '/menu',
};

export default VideoRoutes;
