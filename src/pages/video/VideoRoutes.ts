const VideoRoutes = {
  home: '/',

  history: '/history',

  listRoute: '/list/:category',
  list: (category: string) => `/list/${category}`,

  detailRoute: '/entry/:entryId',
  detail: (entryId: string, videoId?: string) => {
    const query = videoId ? `?videoId=${videoId}` : '';
    return `/entry/${entryId}${query}`;
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
