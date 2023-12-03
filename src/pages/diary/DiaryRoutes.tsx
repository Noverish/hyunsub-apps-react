import queryString from 'query-string';

import { DiaryCreatePageParams } from './create/DiaryCreateHooks';
import { DiaryPhotoPageParams } from './photo/DiaryPhotoHooks';
import { DiaryUpdatePageParams } from './update/DiaryUpdateHooks';
import { DiaryDetailPageParams } from 'src/pages/diary/detail/DiaryDetailHooks';

const { stringifyUrl } = queryString;

const DiaryRoutes = {
  listRoute: '/list',

  calendarRoute: '/calendar',

  detailRoute: '/detail/:date',
  detail: ({ date, ...query }: DiaryDetailPageParams) => stringifyUrl({ url: `/detail/${date}`, query }),

  photoRoute: '/detail/:date/photos',
  photo: ({ date, ...query }: DiaryPhotoPageParams) => stringifyUrl({ url: `/detail/${date}/photos`, query }),

  updateRoute: '/detail/:date/edit',
  update: ({ date }: DiaryUpdatePageParams) => `/detail/${date}/edit`,

  createRoute: '/create',
  create: ({ ...query }: DiaryCreatePageParams) => stringifyUrl({ url: `/create`, query }),

  searchRoute: '/search',
  search: (query: string) => `/search?query=${query}`,
};

export default DiaryRoutes;
