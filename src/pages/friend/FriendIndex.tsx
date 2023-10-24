import { Navigate, Outlet, RouteObject } from 'react-router-dom';

import routes from './FriendRoutes';
import FriendCreatePage from './create/FriendCreatePage';
import FriendDetailPage from './detail/FriendDetailPage';
import FriendListPage from './list/FriendListPage';
import FriendTabBar from 'src/components/friend/header/FriendTabBar';

export const FriendRouteObjects: RouteObject[] = [
  {
    path: '/',
    element: (
      <>
        <FriendTabBar />
        <Outlet />
      </>
    ),
    children: [
      { path: '/', element: <Navigate to={routes.listRoute} /> },
      { path: routes.listRoute, element: <FriendListPage /> },
      { path: routes.detailRoute, element: <FriendDetailPage /> },
      { path: routes.createRoute, element: <FriendCreatePage /> },
    ],
  },
];
