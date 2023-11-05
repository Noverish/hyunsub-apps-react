const FriendRoutes = {
  listRoute: '/list',

  createRoute: '/create',

  detailRoute: '/detail/:friendId',
  detail: (friendId: string) => `/detail/${friendId}`,

  updateRoute: '/detail/:friendId/edit',
  update: (friendId: string) => `/detail/${friendId}/edit`,

  tagListRoute: '/tags',

  tagDetailRoute: '/tags/:tag',
  tagDetail: (tag: string) => `/tags/${tag}`,
};

export default FriendRoutes;
