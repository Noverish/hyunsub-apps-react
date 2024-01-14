import queryString from 'query-string';

import { DiaryCreatePageParams } from './create/DiaryCreateHooks';
import { DiaryListPageParams } from './list/DiaryListHooks';
import { DiaryPhotoPageParams } from './photo/DiaryPhotoHooks';
import { DiaryUpdatePageParams } from './update/DiaryUpdateHooks';
import { DiaryViewerPageParams } from './viewer/DiaryViewerHooks';
import { DiaryDetailPageParams } from 'src/pages/diary/detail/DiaryDetailHooks';

const { stringifyUrl } = queryString;

const DiaryRoutes = {
  listRoute: '/list',
  list: ({ ...query }: DiaryListPageParams) => stringifyUrl({ url: `/list`, query }),

  calendarRoute: '/calendar',

  detailRoute: '/detail/:date',
  detail: ({ date, ...query }: DiaryDetailPageParams) => stringifyUrl({ url: `/detail/${date}`, query }),

  photoRoute: '/detail/:date/photos',
  photo: ({ date, ...query }: DiaryPhotoPageParams) => stringifyUrl({ url: `/detail/${date}/photos`, query }),

  viewerRoute: '/detail/:date/viewer',
  viewer: ({ date, ...query }: DiaryViewerPageParams) => stringifyUrl({ url: `/detail/${date}/viewer`, query }),

  updateRoute: '/detail/:date/edit',
  update: ({ date, ...query }: DiaryUpdatePageParams) => stringifyUrl({ url: `/detail/${date}/edit`, query }),

  createRoute: '/create',
  create: ({ ...query }: DiaryCreatePageParams) => stringifyUrl({ url: `/create`, query }),
};

export default DiaryRoutes;
