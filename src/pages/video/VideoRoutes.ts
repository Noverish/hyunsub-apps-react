const VideoRoutes = {
  list: '/:category',
  getListRoute: (category: string) => `/${category}`,

  detail: '/video/:entryId',
  getDetailRoute: (entryId: string, videoId?: string) => {
    const query = (videoId) ? `?videoId=${videoId}` : ''
    return `/video/${entryId}${query}`;
  },
}

export default VideoRoutes;
