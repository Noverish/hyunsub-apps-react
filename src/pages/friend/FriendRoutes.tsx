const FriendRoutes = {
  listRoute: '/list',

  createRoute: '/create',

  detailRoute: '/detail/:friendId',
  detail: (friendId: string) => `/detail/${friendId}`,

  updateRoute: '/detail/:friendId/edit',
  update: (friendId: string) => `/detail/${friendId}/edit`,
};

export default FriendRoutes;
