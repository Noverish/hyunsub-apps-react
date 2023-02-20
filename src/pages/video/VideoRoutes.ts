const VideoRoutes = {
  home: '/home',
  history: '/history',

  list: '/list/:category',
  listRoute: (category: string) => `/list/${category}`,

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
