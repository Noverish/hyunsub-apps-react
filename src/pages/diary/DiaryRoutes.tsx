import { stringify } from 'query-string';

import { DiaryDetailPageParams } from 'src/pages/diary/detail/DiaryDetailHooks';

const DiaryRoutes = {
  listRoute: '/list',

  calendarRoute: '/calendar',

  detailRoute: '/detail/:date',
  detail: ({ date, ...query }: DiaryDetailPageParams) => `/detail/${date}?${stringify(query)}`,

  updateRoute: '/detail/:date/edit',
  update: (date: string) => `/detail/${date}/edit`,

  createRoute: '/create',
  create: (date: string) => `/create?date=${date}`,

  searchRoute: '/search',
  search: (query: string) => `/search?query=${query}`,

  menuRoute: '/menu',
};

export default DiaryRoutes;
