const DiaryRoutes = {
  listRoute: '/list',

  calendarRoute: '/calendar',

  detailRoute: '/detail/:date',
  detail: (date: string) => `/detail/${date}`,

  modifyRoute: '/detail/:date/modify',
  modify: (date: string) => `/detail/${date}/modify`,

  createRoute: '/create',
  create: (date: string) => `/create?date=${date}`,

  searchRoute: '/search',
  search: (query: string) => `/search?query=${query}`,

  menuRoute: '/menu',
};

export default DiaryRoutes;
