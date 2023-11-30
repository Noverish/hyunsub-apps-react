import { Navigate, Outlet, RouteObject } from 'react-router-dom';

import CommonMenuPage from '../common/CommonMenuPage';
import routes from './DiaryRoutes';
import DiaryCalendarPage from './calendar/DiaryCalendarPage';
import DiaryCreatePage from './create/DiaryCreatePage';
import DiaryDetailPage from './detail/DiaryDetailPage';
import DiaryListPage from './list/DiaryListPage';
import DiarySearchPage from './search/DiarySearchPage';
import DiaryUpdatePage from './update/DiaryUpdatePage';
import DiaryNavigation from 'src/components/diary/DiaryNavigation';
import { FriendListProvider } from 'src/context/friend/FriendListContext';
import CommonRoutes from 'src/pages/common/CommonRoutes';

export const DiaryRouteObjects: RouteObject[] = [
  {
    path: '/',
    element: (
      <FriendListProvider>
        <DiaryNavigation />
        <Outlet />
      </FriendListProvider>
    ),
    children: [
      { path: '/', element: <Navigate to={routes.listRoute} /> },
      { path: routes.listRoute, element: <DiaryListPage /> },
      { path: routes.calendarRoute, element: <DiaryCalendarPage /> },
      { path: routes.searchRoute, element: <DiarySearchPage /> },
      { path: routes.detailRoute, element: <DiaryDetailPage /> },
      { path: routes.createRoute, element: <DiaryCreatePage /> },
      { path: routes.updateRoute, element: <DiaryUpdatePage /> },
      { path: CommonRoutes.menu, element: <CommonMenuPage /> },
    ],
  },
];
