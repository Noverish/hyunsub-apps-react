import { lazy } from 'react';
import { Outlet, RouteObject, ScrollRestoration } from 'react-router-dom';
import VideoDesktopkHeader from 'src/components/video/header/VideoDesktopHeader';
import VideoTabBar from 'src/components/video/header/VideoTabBar';
import VideoRoutes from './VideoRoutes';

const VideoAdminPage = lazy(() => import('src/pages/video/admin/VideoAdminPage'));
const VideoDetailPage = lazy(() => import('src/pages/video/detail/VideoDetailPage'));
const VideoHistoryPage = lazy(() => import('src/pages/video/history/VideoHistoryPage'));
const VideoHomePage = lazy(() => import('src/pages/video/home/VideoHomePage'));
const VideoListPage = lazy(() => import('src/pages/video/list/VideoListPage'));
const VideoMenuPage = lazy(() => import('src/pages/video/menu/VideoMenuPage'));
const VideoSearchPage = lazy(() => import('src/pages/video/search/VideoSearchPage'));

export const VideoRotues: RouteObject[] = [
  {
    path: '/',
    element: (
      <>
        <VideoDesktopkHeader />
        <VideoTabBar />
        <Outlet />
        <ScrollRestoration />
      </>
    ),
    children: [
      { path: VideoRoutes.admin, element: <VideoAdminPage /> },
      { path: VideoRoutes.detail, element: <VideoDetailPage /> },
      { path: VideoRoutes.history, element: <VideoHistoryPage /> },
      { path: VideoRoutes.home, element: <VideoHomePage /> },
      { path: VideoRoutes.list, element: <VideoListPage /> },
      { path: VideoRoutes.menu, element: <VideoMenuPage /> },
      { path: VideoRoutes.search, element: <VideoSearchPage /> },
    ]
  }
];
