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
  
  manageEntryRoute: '/manage/entries/:entryId',
  manageEntry: (entryId: string) => `/manage/entries/${entryId}`,

  search: '/search',

  menu: '/menu',
}

export default VideoRoutes;
