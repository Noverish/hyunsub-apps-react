const VideoRoutes = {
  home: '/',

  history: '/history',

  list: '/list/:category',
  listRoute: (category: string) => `/list/${category}`,

  detail: '/video/:entryId',
  detailRoute: (entryId: string, videoId?: string) => {
    const query = (videoId) ? `?videoId=${videoId}` : ''
    return `/video/${entryId}${query}`;
  },

  admin: '/admin',

  search: '/search',

  menu: '/menu',
}

export default VideoRoutes;
