import { lazy } from 'react';
import { Navigate, Outlet, RouteObject } from 'react-router-dom';

import routes from './PhotoRoutes';
import PhotoDesktopHeader from 'src/components/photo/header/PhotoDesktopHeader';
import PhotoTabBar from 'src/components/photo/header/PhotoTabBar';

const AlbumListPage = lazy(() => import('src/pages/photo/album-list/AlbumListPage'));
const AlbumDetailPage = lazy(() => import('src/pages/photo/album-detail/AlbumDetailPage'));
const AlbumViewerPage = lazy(() => import('src/pages/photo/album-viewer/AlbumViewerPage'));
const AlbumUploadPage = lazy(() => import('src/pages/photo/upload/AlbumUploadPage'));
const AlbumDatePage = lazy(() => import('src/pages/photo/album-date/AlbumDatePage'));
const PhotoListPage = lazy(() => import('src/pages/photo/photo-list/PhotoListPage'));
const PhotoMenuPage = lazy(() => import('src/pages/photo/menu/PhotoMenuPage'));
const PhotoUploadPage = lazy(() => import('src/pages/photo/upload/PhotoUploadPage'));
const PhotoViewerPage = lazy(() => import('src/pages/photo/photo-viewer/PhotoViewerPage'));

export const PhotoRouteObjects: RouteObject[] = [
  {
    path: '/',
    element: (
      <>
        <PhotoDesktopHeader />
        <PhotoTabBar />
        <Outlet />
      </>
    ),
    children: [
      { path: '/', element: <Navigate to={routes.albums} /> },
      { path: routes.albums, element: <AlbumListPage /> },
      { path: routes.albumDetailRoute, element: <AlbumDetailPage /> },
      { path: routes.albumViewerRoute, element: <AlbumViewerPage /> },
      { path: routes.albumUploadRoute, element: <AlbumUploadPage /> },
      { path: routes.albumDateRoute, element: <AlbumDatePage /> },
      { path: routes.photos, element: <PhotoListPage /> },
      { path: routes.photoViewerRoute, element: <PhotoViewerPage /> },
      { path: routes.photoUpload, element: <PhotoUploadPage /> },
      { path: routes.menu, element: <PhotoMenuPage /> },
    ],
  },
];
