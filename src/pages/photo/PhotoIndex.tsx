import { Navigate, Outlet, RouteObject } from 'react-router-dom';

import CommonRoutes from '../common/CommonRoutes';
import CommonMenuPage from '../common/menu/CommonMenuPage';
import routes from './PhotoRoutes';
import PhotoDetailPage from './photo-detail/PhotoDetailPage';
import PhotoOriginalPage from './photo-original/PhotoOriginalPage';
import PhotoNavigation from 'src/components/photo/PhotoNavigation';
import AlbumDatePage from 'src/pages/photo/album-date/AlbumDatePage';
import AlbumDetailPage from 'src/pages/photo/album-detail/AlbumDetailPage';
import AlbumListPage from 'src/pages/photo/album-list/AlbumListPage';
import AlbumViewerPage from 'src/pages/photo/album-viewer/AlbumViewerPage';
import PhotoListPage from 'src/pages/photo/photo-list/PhotoListPage';
import PhotoViewerPage from 'src/pages/photo/photo-viewer/PhotoViewerPage';
import AlbumUploadPage from 'src/pages/photo/upload/AlbumUploadPage';
import PhotoUploadPage from 'src/pages/photo/upload/PhotoUploadPage';

export const PhotoRouteObjects: RouteObject[] = [
  {
    path: routes.albumViewerRoute,
    element: <AlbumViewerPage />,
  },
  {
    path: routes.photoViewerRoute,
    element: <PhotoViewerPage />,
  },
  {
    path: '/',
    element: (
      <>
        <PhotoNavigation />
        <Outlet />
      </>
    ),
    children: [
      { path: '/', element: <Navigate to={routes.albums} /> },
      { path: routes.albums, element: <AlbumListPage /> },
      { path: routes.albumDetailRoute, element: <AlbumDetailPage /> },
      { path: routes.albumUploadRoute, element: <AlbumUploadPage /> },
      { path: routes.albumDateRoute, element: <AlbumDatePage /> },
      { path: routes.photosRoute, element: <PhotoListPage /> },
      { path: routes.photoUpload, element: <PhotoUploadPage /> },
      { path: routes.photoDetailRoute, element: <PhotoDetailPage /> },
      { path: routes.photoOriginalRoute, element: <PhotoOriginalPage /> },
      { path: CommonRoutes.menu, element: <CommonMenuPage /> },
    ],
  },
];
