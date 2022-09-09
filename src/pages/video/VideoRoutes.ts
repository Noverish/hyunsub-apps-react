const VideoRoutes = {
  list: '/:category',
  getListRoute: (category: string) => `/${category}`,

  detail: '/video/:entryId',
  getDetailRoute: (entryId: string, videoId?: string) => {
    const query = (videoId) ? `?videoId=${videoId}` : ''
    return `/video/${entryId}${query}`;
  },

  upload: '/upload',

  my: '/my',

  search: '/search',
  getSearchRoute: (query: string) => {
    return `/search?q=${encodeURIComponent(query)}`
  },
}

export default VideoRoutes;
