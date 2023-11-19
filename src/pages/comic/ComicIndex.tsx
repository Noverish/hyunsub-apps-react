import { Outlet, RouteObject } from 'react-router-dom';

import CommonRoutes from '../common/CommonRoutes';
import routes from './ComicRoutes';
import ComicDetailPage from './detail/ComicDetailPage';
import ComicListPage from './list/ComicListPage';
import ComicViewerPage from './viewer/ComicViewerPage';
import ComicDesktopHeader from 'src/components/comic/header/ComicDesktopHeader';
import ComicTabBar from 'src/components/comic/header/ComicTabBar';
import CommonMenuPage from 'src/pages/common/CommonMenuPage';

export const ComicRouteObjects: RouteObject[] = [
  {
    path: routes.viewer,
    element: <ComicViewerPage />,
  },
  {
    path: '/',
    element: (
      <>
        <ComicDesktopHeader />
        <ComicTabBar />
        <Outlet />
      </>
    ),
    children: [
      { path: routes.list, element: <ComicListPage /> },
      { path: routes.detail, element: <ComicDetailPage /> },
      { path: CommonRoutes.menu, element: <CommonMenuPage /> },
    ],
  },
];
