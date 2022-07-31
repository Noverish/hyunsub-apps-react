const routes = {
  list: '/:category',
  getListRoute: (category: string) => `/${category}`,
  detail: '/video/:entryId',
  getDetailRoute: (entryId: string) => `/video/${entryId}`,
}

export default routes;
