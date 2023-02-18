import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import PhotoTabBar from 'src/components/photo/PhotoTabBar';
import routes from './PhotoRoutes';

const NotFoundPage = lazy(() => import('src/pages/common/NotFoundPage'));
const AlbumListPage = lazy(() => import('src/pages/photo/album-list/AlbumListPage'));
const AlbumDetailPage = lazy(() => import('src/pages/photo/album-detail/AlbumDetailPage'));
const AlbumViewerPage = lazy(() => import('src/pages/photo/album-viewer/AlbumViewerPage'));
const AlbumUploadPage = lazy(() => import('src/pages/photo/album-upload/AlbumUploadPage'));
const AlbumDatePage = lazy(() => import('src/pages/photo/album-date/AlbumDatePage'));
const PhotoListPage = lazy(() => import('src/pages/photo/photo-list/PhotoListPage'));
const PhotoOriginalPage = lazy(() => import('src/pages/photo/photo-original/PhotoOriginalPage'));
const PhotoMenuPage = lazy(() => import('src/pages/photo/menu/PhotoMenuPage'));
const UploadPage = lazy(() => import('src/pages/photo/upload/UploadPage'));
const SharePage = lazy(() => import('src/pages/photo/share/SharePage'));

export default function PhotoIndex() {
  return (
    <>
      <PhotoTabBar />
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/" element={<Navigate to={routes.albums} />} />
        <Route path={routes.albums} element={<AlbumListPage />} />
        <Route path={routes.albumDetailRoute} element={<AlbumDetailPage />} />
        <Route path={routes.albumViewerRoute} element={<AlbumViewerPage />} />
        <Route path={routes.albumUploadRoute} element={<AlbumUploadPage />} />
        <Route path={routes.albumDateRoute} element={<AlbumDatePage />} />
        <Route path={routes.photos} element={<PhotoListPage />} />
        <Route path={routes.photoOriginalRoute} element={<PhotoOriginalPage />} />
        <Route path={routes.upload} element={<UploadPage />} />
        <Route path={routes.share} element={<SharePage />} />
        <Route path={routes.menu} element={<PhotoMenuPage />} />
      </Routes>
    </>
  )
}
