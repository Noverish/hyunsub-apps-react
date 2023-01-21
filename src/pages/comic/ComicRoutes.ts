const ComicRoutes = {
  list: '/',

  detail: '/comics/:comicId',
  detailRoute: (comicId: string) => `/comics/${comicId}`,

  viewer: '/comics/:comicId/:order',
  viewerRoute: (comicId: string, order: number) => `/comics/${comicId}/${order}`,
}

export default ComicRoutes;
