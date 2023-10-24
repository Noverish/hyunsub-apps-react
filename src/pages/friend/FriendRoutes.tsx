const FriendRoutes = {
  listRoute: '/list',

  createRoute: '/create',

  detailRoute: '/detail/:friendId',
  detail: (friendId: string) => `/detail/${friendId}`,
}

export default FriendRoutes;
