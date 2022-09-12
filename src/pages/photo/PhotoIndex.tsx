import { lazy } from 'react';
import { Navigate, Route, Routes, unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import history from 'src/pages/common/history';
import ErrorPage from '../common/ErrorPage';
import routes from './PhotoRoutes';

const NotFoundPage = lazy(() => import('src/pages/common/NotFoundPage'));
const AlbumListPage = lazy(() => import('src/pages/photo/album-list/AlbumListPage'));
const AlbumDetailPage = lazy(() => import('src/pages/photo/album-detail/AlbumDetailPage'));
const AlbumViewerPage = lazy(() => import('src/pages/photo/album-viewer/AlbumViewerPage'));
const AlbumUploadPage = lazy(() => import('src/pages/photo/album-upload/AlbumUploadPage'));
const AlbumExifDatePage = lazy(() => import('src/pages/photo/album-exif-date/AlbumExifDatePage'));
const PhotoListPage = lazy(() => import('src/pages/photo/photo-list/PhotoListPage'));
const PhotoOriginalPage = lazy(() => import('src/pages/photo/photo-original/PhotoOriginalPage'));
const SettingPage = lazy(() => import('src/pages/photo/setting/SettingPage'));

export default function PhotoIndex() {
  return (
    <HistoryRouter history={history}>
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/" element={<Navigate to={routes.albumList()} />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path={routes.albumList()} element={<AlbumListPage />} />
        <Route path={routes.albumDetail()} element={<AlbumDetailPage />} />
        <Route path={routes.albumViewer()} element={<AlbumViewerPage />} />
        <Route path={routes.albumUpload()} element={<AlbumUploadPage />} />
        <Route path={routes.albumExifDate()} element={<AlbumExifDatePage />} />
        <Route path={routes.photoList()} element={<PhotoListPage />} />
        <Route path={routes.photoOriginal()} element={<PhotoOriginalPage />} />
        <Route path={routes.setting()} element={<SettingPage />} />
      </Routes>
    </HistoryRouter>
  )
}
