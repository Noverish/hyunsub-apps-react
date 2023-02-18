const VideoRoutes = {
  list: '/:category',
  listRoute: (category: string) => `/${category}`,

  detail: '/video/:entryId',
  detailRoute: (entryId: string, videoId?: string) => {
    const query = (videoId) ? `?videoId=${videoId}` : ''
    return `/video/${entryId}${query}`;
  },

  admin: '/admin',

  my: '/my',

  search: '/search',

  searchResult: '/search/result',
  searchResultRoute: (query: string) => `/search/result?q=${encodeURIComponent(query)}`,

  menu: '/menu',
}

export default VideoRoutes;
