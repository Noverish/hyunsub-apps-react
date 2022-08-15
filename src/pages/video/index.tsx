import { lazy, Suspense } from 'react';
import { Route, Routes, unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import LoadingPage from 'src/pages/LoadingPage';
import routes from './VideoRoutes';
import videoHistory from './VideoHistory';
import VideoSearchModal from 'src/components/video/VideoSearchModal';

const NotFoundPage = lazy(() => import('src/pages/NotFoundPage'));
const VideoIndexPage = lazy(() => import('src/pages/video/home/VideoIndexPage'));
const VideoListPage = lazy(() => import('src/pages/video/list/VideoListPage'));
const VideoDetailPage = lazy(() => import('src/pages/video/detail/VideoDetailPage'));
const VideoUploadPage = lazy(() => import('src/pages/video/upload/VideoUploadPage'));
const VideoMyPage = lazy(() => import('src/pages/video/my/VideoMyPage'));
const VideoSearchPage = lazy(() => import('src/pages/video/search/VideoSearchPage'));

export default function VideoIndex() {
  return (
    <HistoryRouter history={videoHistory}>
      <Suspense fallback={<LoadingPage />}>
        <Routes>
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/" element={<VideoIndexPage />} />
          <Route path={routes.list} element={<VideoListPage />} />
          <Route path={routes.detail} element={<VideoDetailPage />} />
          <Route path={routes.upload} element={<VideoUploadPage />} />
          <Route path={routes.my} element={<VideoMyPage />} />
          <Route path={routes.search} element={<VideoSearchPage />} />
        </Routes>
        <VideoSearchModal />
      </Suspense>
    </HistoryRouter>
  )
}
