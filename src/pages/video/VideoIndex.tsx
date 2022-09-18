import { lazy } from 'react';
import { Route, Routes, unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import routes from './VideoRoutes';
import history from 'src/pages/common/history';
import VideoSearchModal from 'src/components/video/VideoSearchModal';
import ErrorPage from '../common/ErrorPage';

const NotFoundPage = lazy(() => import('src/pages/common/NotFoundPage'));
const VideoIndexPage = lazy(() => import('src/pages/video/home/VideoIndexPage'));
const VideoListPage = lazy(() => import('src/pages/video/list/VideoListPage'));
const VideoDetailPage = lazy(() => import('src/pages/video/detail/VideoDetailPage'));
const VideoUploadPage = lazy(() => import('src/pages/video/upload/VideoUploadPage'));
const VideoMyPage = lazy(() => import('src/pages/video/my/VideoMyPage'));
const VideoSearchPage = lazy(() => import('src/pages/video/search/VideoSearchPage'));

export default function VideoIndex() {
  return (
    <HistoryRouter history={history}>
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/" element={<VideoIndexPage />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path={routes.list} element={<VideoListPage />} />
        <Route path={routes.detail} element={<VideoDetailPage />} />
        <Route path={routes.upload} element={<VideoUploadPage />} />
        <Route path={routes.my} element={<VideoMyPage />} />
        <Route path={routes.search} element={<VideoSearchPage />} />
      </Routes>
      <VideoSearchModal />
    </HistoryRouter>
  )
}
