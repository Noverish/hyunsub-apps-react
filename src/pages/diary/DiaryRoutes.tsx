import { stringify } from 'query-string';

import { DiaryDetailPageData } from 'src/pages/diary/detail/DiaryDetailHooks';

const DiaryRoutes = {
  listRoute: '/list',

  calendarRoute: '/calendar',

  detailRoute: '/detail/:date',
  detail: ({ date, ...query }: DiaryDetailPageData) => `/detail/${date}?${stringify(query)}`,

  modifyRoute: '/detail/:date/modify',
  modify: (date: string) => `/detail/${date}/modify`,

  createRoute: '/create',
  create: (date: string) => `/create?date=${date}`,

  searchRoute: '/search',
  search: (query: string) => `/search?query=${query}`,

  menuRoute: '/menu',
};

export default DiaryRoutes;
