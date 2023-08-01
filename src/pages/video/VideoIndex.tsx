import { lazy } from 'react';
import { Outlet, RouteObject } from 'react-router-dom';

import VideoRoutes from './VideoRoutes';
import AdminLayout from 'src/components/common/AdminLayout';
import VideoDesktopkHeader from 'src/components/video/header/VideoDesktopHeader';
import VideoTabBar from 'src/components/video/header/VideoTabBar';

const VideoAdminPage = lazy(() => import('src/pages/video/admin/VideoAdminPage'));
const VideoDetailPage = lazy(() => import('src/pages/video/detail/VideoDetailPage'));
const VideoHistoryPage = lazy(() => import('src/pages/video/history/VideoHistoryPage'));
const VideoHomePage = lazy(() => import('src/pages/video/home/VideoHomePage'));
const VideoListPage = lazy(() => import('src/pages/video/list/VideoListPage'));
const VideoMenuPage = lazy(() => import('src/pages/video/menu/VideoMenuPage'));
const VideoSearchPage = lazy(() => import('src/pages/video/search/VideoSearchPage'));
const EntryManagePage = lazy(() => import('src/pages/video/entry-manage/EntryManagePage'));
const VideoManagePage = lazy(() => import('src/pages/video/video-manage/VideoManagePage'));

export const VideoRouteObjects: RouteObject[] = [
  {
    path: '/',
    element: (
      <>
        <VideoDesktopkHeader />
        <VideoTabBar />
        <Outlet />
      </>
    ),
    children: [
      { path: VideoRoutes.detailRoute, element: <VideoDetailPage /> },
      { path: VideoRoutes.history, element: <VideoHistoryPage /> },
      { path: VideoRoutes.home, element: <VideoHomePage /> },
      { path: VideoRoutes.listRoute, element: <VideoListPage /> },
      { path: VideoRoutes.menu, element: <VideoMenuPage /> },
      { path: VideoRoutes.search, element: <VideoSearchPage /> },
      { path: VideoRoutes.entryManageRoute, element: <EntryManagePage /> },
      { path: VideoRoutes.videoManageRoute, element: <VideoManagePage /> },
      {
        path: VideoRoutes.admin,
        element: (
          <AdminLayout>
            <VideoAdminPage />
          </AdminLayout>
        ),
      },
    ],
  },
];
