const DiaryRoutes = {
  listRoute: '/list',
  list: (query: string) => `/list?query=${query}`,

  detailRoute: '/detail/:date',
  detail: (date: string) => `/detail/${date}`,

  modifyRoute: '/detail/:date/modify',
  modify: (date: string) => `/detail/${date}/modify`,

  createRoute: '/create',

  menuRoute: '/menu',
};

export default DiaryRoutes;
