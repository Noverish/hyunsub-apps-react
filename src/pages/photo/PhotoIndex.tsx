import { lazy } from 'react';
import { Navigate, Outlet, RouteObject, ScrollRestoration } from 'react-router-dom';
import PhotoDesktopHeader from 'src/components/photo/header/PhotoDesktopHeader';
import PhotoTabBar from 'src/components/photo/header/PhotoTabBar';
import routes from './PhotoRoutes';

const AlbumListPage = lazy(() => import('src/pages/photo/album-list/AlbumListPage'));
const AlbumDetailPage = lazy(() => import('src/pages/photo/album-detail/AlbumDetailPage'));
const AlbumViewerPage = lazy(() => import('src/pages/photo/album-viewer/AlbumViewerPage'));
const AlbumUploadPage = lazy(() => import('src/pages/photo/album-upload/AlbumUploadPage'));
const AlbumDatePage = lazy(() => import('src/pages/photo/album-date/AlbumDatePage'));
const PhotoListPage = lazy(() => import('src/pages/photo/photo-list/PhotoListPage'));
const PhotoOriginalPage = lazy(() => import('src/pages/photo/photo-original/PhotoOriginalPage'));
const PhotoMenuPage = lazy(() => import('src/pages/photo/menu/PhotoMenuPage'));
const PhotoUploadPage = lazy(() => import('src/pages/photo/upload/PhotoUploadPage'));
const PhotoViewerPage = lazy(() => import('src/pages/photo/photo-viewer/PhotoViewerPage'));

export const PhotoRouteObjects: RouteObject[] = [
  { path: routes.photoViewerRoute, element: <PhotoViewerPage /> },
  {
    path: '/',
    element: (
      <>
        <PhotoDesktopHeader />
        <PhotoTabBar />
        <Outlet />
        <ScrollRestoration />
      </>
    ),
    children: [
      { path: '/', element: <Navigate to={routes.albums} /> },
      { path: routes.albums, element: <AlbumListPage /> },
      { path: routes.albumDetailRoute, element: <AlbumDetailPage /> },
      { path: routes.albumViewerRoute, element: <AlbumViewerPage /> },
      { path: routes.albumUploadRoute, element: <AlbumUploadPage /> },
      { path: routes.albumDateRoute, element: <AlbumDatePage /> },
      { path: routes.photoViewerRoute, element: <PhotoViewerPage /> },
      { path: routes.photos, element: <PhotoListPage /> },
      { path: routes.photoOriginalRoute, element: <PhotoOriginalPage /> },
      { path: routes.upload, element: <PhotoUploadPage /> },
      { path: routes.menu, element: <PhotoMenuPage /> },
    ]
  }
]
