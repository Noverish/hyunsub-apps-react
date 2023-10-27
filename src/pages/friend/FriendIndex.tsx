import { Navigate, Outlet, RouteObject } from 'react-router-dom';

import routes from './FriendRoutes';
import FriendCreatePage from './create/FriendCreatePage';
import FriendDetailPage from './detail/FriendDetailPage';
import FriendListPage from './list/FriendListPage';
import FriendMenuPage from './menu/FriendMenuPage';
import FriendUpdatePage from './update/FriendUpdatePage';
import FriendTabBar from 'src/components/friend/header/FriendTabBar';
import { FriendTagsProvider } from 'src/context/friend/FriendTagsContext';

export const FriendRouteObjects: RouteObject[] = [
  {
    path: '/',
    element: (
      <FriendTagsProvider>
        <FriendTabBar />
        <Outlet />
      </FriendTagsProvider>
    ),
    children: [
      { path: '/', element: <Navigate to={routes.listRoute} /> },
      { path: routes.listRoute, element: <FriendListPage /> },
      { path: routes.detailRoute, element: <FriendDetailPage /> },
      { path: routes.createRoute, element: <FriendCreatePage /> },
      { path: routes.updateRoute, element: <FriendUpdatePage /> },
      { path: routes.menuRoute, element: <FriendMenuPage /> },
    ],
  },
];
