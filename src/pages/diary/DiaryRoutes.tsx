const DiaryRoutes = {
  home: '/home',

  detailRoute: '/detail/:date',
  detail: (date: string) => `/detail/${date}`,
};

export default DiaryRoutes;
