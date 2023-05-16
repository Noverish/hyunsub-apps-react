const VideoRoutes = {
  home: '/',

  history: '/history',

  listRoute: '/list/:category',
  list: (category: string) => `/list/${category}`,

  detailRoute: '/video/:entryId',
  detail: (entryId: string, videoId?: string) => {
    const query = videoId ? `?videoId=${videoId}` : '';
    return `/video/${entryId}${query}`;
  },

  admin: '/admin',

  manageEntryRoute: '/video/:entryId/manage',
  manageEntry: (entryId: string) => `/video/${entryId}/manage`,

  search: '/search',

  menu: '/menu',
};

export default VideoRoutes;
