import { lazy } from 'react';
import { Navigate, Outlet, RouteObject } from 'react-router-dom';

import routes from './DiaryRoutes';
import DiaryTabBar from 'src/components/diary/header/DiaryTabBar';

const DiaryListPage = lazy(() => import('./list/DiaryListPage'));
const DiaryDetailPage = lazy(() => import('./detail/DiaryDetailPage'));
const DiaryCreatePage = lazy(() => import('./create/DiaryCreatePage'));
const DiaryModifyPage = lazy(() => import('./modify/DiaryModifyPage'));
const DiaryMenuPage = lazy(() => import('./menu/DiaryMenuPage'));

export const DiaryRouteObjects: RouteObject[] = [
  {
    path: '/',
    element: (
      <>
        <DiaryTabBar />
        <Outlet />
      </>
    ),
    children: [
      { path: '/', element: <Navigate to={routes.listRoute} /> },
      { path: routes.listRoute, element: <DiaryListPage /> },
      { path: routes.detailRoute, element: <DiaryDetailPage /> },
      { path: routes.createRoute, element: <DiaryCreatePage /> },
      { path: routes.modifyRoute, element: <DiaryModifyPage /> },
      { path: routes.menuRoute, element: <DiaryMenuPage /> },
    ],
  },
];
