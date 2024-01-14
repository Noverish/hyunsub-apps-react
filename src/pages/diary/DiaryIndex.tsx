import { Navigate, Outlet, RouteObject } from 'react-router-dom';

import CommonMenuPage from '../common/menu/CommonMenuPage';
import routes from './DiaryRoutes';
import DiaryCalendarPage from './calendar/DiaryCalendarPage';
import DiaryCreatePage from './create/DiaryCreatePage';
import DiaryDetailPage from './detail/DiaryDetailPage';
import DiaryListPage from './list/DiaryListPage';
import DiaryPhotoPage from './photo/DiaryPhotoPage';
import DiaryUpdatePage from './update/DiaryUpdatePage';
import DiaryViewerPage from './viewer/DiaryViewerPage';
import DiaryNavigation from 'src/components/diary/DiaryNavigation';
import { FriendListProvider } from 'src/context/friend/FriendListContext';
import CommonRoutes from 'src/pages/common/CommonRoutes';

export const DiaryRouteObjects: RouteObject[] = [
  {
    path: routes.viewerRoute,
    element: <DiaryViewerPage />,
  },
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
      { path: routes.detailRoute, element: <DiaryDetailPage /> },
      { path: routes.photoRoute, element: <DiaryPhotoPage /> },
      { path: routes.createRoute, element: <DiaryCreatePage /> },
      { path: routes.updateRoute, element: <DiaryUpdatePage /> },
      { path: CommonRoutes.menu, element: <CommonMenuPage /> },
    ],
  },
];
