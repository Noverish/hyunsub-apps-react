import { Navigate, Outlet, RouteObject } from 'react-router-dom';

import routes from './DiaryRoutes';
import DiaryCalendarPage from './calendar/DiaryCalendarPage';
import DiaryCreatePage from './create/DiaryCreatePage';
import DiaryDetailPage from './detail/DiaryDetailPage';
import DiaryListPage from './list/DiaryListPage';
import DiaryMenuPage from './menu/DiaryMenuPage';
import DiarySearchPage from './search/DiarySearchPage';
import DiaryUpdatePage from './update/DiaryUpdatePage';
import DiaryTabBar from 'src/components/diary/header/DiaryTabBar';
import { FriendListProvider } from 'src/context/friend/FriendListContext';

export const DiaryRouteObjects: RouteObject[] = [
  {
    path: '/',
    element: (
      <FriendListProvider>
        <DiaryTabBar />
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
      { path: routes.menuRoute, element: <DiaryMenuPage /> },
    ],
  },
];
