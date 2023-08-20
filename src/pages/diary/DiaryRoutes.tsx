const DiaryRoutes = {
  listRoute: '/list',
  list: (query: string) => `/list?query=${query}`,

  detailRoute: '/detail/:date',
  detail: (date: string) => `/detail/${date}`,
};

export default DiaryRoutes;
