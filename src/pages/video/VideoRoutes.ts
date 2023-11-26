import queryString from 'query-string';

const { stringifyUrl } = queryString;

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
  detail: ({ entryId, ...query }: VideoDetailRouteParams) => stringifyUrl({ url: `/entry/${entryId}`, query }),

  admin: '/admin',

  entryManageRoute: '/entry/:entryId/manage',
  entryManage: (entryId: string) => `/entry/${entryId}/manage`,

  videoManageRoute: '/entry/:entryId/video/:videoId/manage',
  videoManage: (entryId: string, videoId: string) => `/entry/${entryId}/video/${videoId}/manage`,

  searchRoute: '/search',
  search: (query: string) => `/search?query=${query}`,
};

export default VideoRoutes;
