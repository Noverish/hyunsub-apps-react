import { Navigate, Outlet, RouteObject } from 'react-router-dom';

import CommonMenuPage from '../common/CommonMenuPage';
import CommonRoutes from '../common/CommonRoutes';
import routes from './FriendRoutes';
import FriendCreatePage from './create/FriendCreatePage';
import FriendDetailPage from './detail/FriendDetailPage';
import FriendListPage from './list/FriendListPage';
import FriendSearchPage from './search/FriendSearchPage';
import FriendTagDetailPage from './tag-detail/FriendTagDetailPage';
import FriendTagListPage from './tag-list/FriendTagListPage';
import FriendUpdatePage from './update/FriendUpdatePage';
import FriendDesktopHeader from 'src/components/friend/header/FriendDesktopHeader';
import FriendTabBar from 'src/components/friend/header/FriendTabBar';
import { FriendTagsProvider } from 'src/context/friend/FriendTagsContext';

export const FriendRouteObjects: RouteObject[] = [
  {
    path: '/',
    element: (
      <FriendTagsProvider>
        <FriendDesktopHeader />
        <FriendTabBar />
        <Outlet />
      </FriendTagsProvider>
    ),
    children: [
      { path: '/', element: <Navigate to={routes.listRoute} /> },
      { path: CommonRoutes.menu, element: <CommonMenuPage /> },
      { path: CommonRoutes.search, element: <FriendSearchPage /> },
      { path: routes.listRoute, element: <FriendListPage /> },
      { path: routes.detailRoute, element: <FriendDetailPage /> },
      { path: routes.createRoute, element: <FriendCreatePage /> },
      { path: routes.updateRoute, element: <FriendUpdatePage /> },
      { path: routes.tagListRoute, element: <FriendTagListPage /> },
      { path: routes.tagDetailRoute, element: <FriendTagDetailPage /> },
    ],
  },
];
