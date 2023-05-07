import { lazy } from 'react';
import { Outlet, RouteObject } from 'react-router-dom';

import CommonRoutes from '../common/CommonRoutes';
import routes from './ComicRoutes';
import ComicDesktopHeader from 'src/components/comic/header/ComicDesktopHeader';
import ComicTabBar from 'src/components/comic/header/ComicTabBar';

const ComicListPage = lazy(() => import('src/pages/comic/list/ComicListPage'));
const ComicDetailPage = lazy(() => import('src/pages/comic/detail/ComicDetailPage'));
const ComicViewerPage = lazy(() => import('src/pages/comic/viewer/ComicViewerPage'));
const ComicMenuPage = lazy(() => import('src/pages/comic/menu/ComicMenuPage'));

export const ComicRouteObjects: RouteObject[] = [
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
      { path: CommonRoutes.menu, element: <ComicMenuPage /> },
      { path: routes.list, element: <ComicListPage /> },
      { path: routes.detail, element: <ComicDetailPage /> },
      { path: routes.viewer, element: <ComicViewerPage /> },
    ],
  },
];
