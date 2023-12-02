import { FriendDetailPageParams } from './detail/FriendDetailHooks';
import { FriendUpdatePageParams } from './update/FriendUpdateHooks';

const FriendRoutes = {
  listRoute: '/list',

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
