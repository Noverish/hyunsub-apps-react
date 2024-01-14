import queryString from 'query-string';

import { FriendDetailPageParams } from './detail/FriendDetailHooks';
import { FriendListPageParams } from './list/FriendListHooks';
import { FriendUpdatePageParams } from './update/FriendUpdateHooks';

const { stringifyUrl } = queryString;

const FriendRoutes = {
  listRoute: '/list',
  list: ({ ...query }: FriendListPageParams) => stringifyUrl({ url: `/list`, query }),

  createRoute: '/create',

  detailRoute: '/detail/:friendId',
  detail: ({ friendId }: FriendDetailPageParams) => `/detail/${friendId}`,

  updateRoute: '/detail/:friendId/edit',
  update: ({ friendId }: FriendUpdatePageParams) => `/detail/${friendId}/edit`,

  tagListRoute: '/tags',

  tagDetailRoute: '/tags/:tag',
  tagDetail: (tag: string) => `/tags/${tag}`,
};

export default FriendRoutes;
