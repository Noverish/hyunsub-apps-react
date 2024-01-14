import { Navigate, Outlet, RouteObject } from 'react-router-dom';

import CommonRoutes from '../common/CommonRoutes';
import CommonMenuPage from '../common/menu/CommonMenuPage';
import routes from './FriendRoutes';
import FriendCreatePage from './create/FriendCreatePage';
import FriendDetailPage from './detail/FriendDetailPage';
import FriendListPage from './list/FriendListPage';
import FriendTagDetailPage from './tag-detail/FriendTagDetailPage';
import FriendTagListPage from './tag-list/FriendTagListPage';
import FriendUpdatePage from './update/FriendUpdatePage';
import FriendNavigation from 'src/components/friend/FriendNavigation';
import { FriendTagsProvider } from 'src/context/friend/FriendTagsContext';

export const FriendRouteObjects: RouteObject[] = [
  {
    path: '/',
    element: (
      <FriendTagsProvider>
        <FriendNavigation />
        <Outlet />
      </FriendTagsProvider>
    ),
    children: [
      { path: '/', element: <Navigate to={routes.listRoute} /> },
      { path: CommonRoutes.menu, element: <CommonMenuPage /> },
      { path: routes.listRoute, element: <FriendListPage /> },
      { path: routes.detailRoute, element: <FriendDetailPage /> },
      { path: routes.createRoute, element: <FriendCreatePage /> },
      { path: routes.updateRoute, element: <FriendUpdatePage /> },
      { path: routes.tagListRoute, element: <FriendTagListPage /> },
      { path: routes.tagDetailRoute, element: <FriendTagDetailPage /> },
    ],
  },
];
