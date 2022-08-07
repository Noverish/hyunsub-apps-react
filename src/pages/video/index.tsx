import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoadingPage from 'src/pages/LoadingPage';
import routes from './VideoRoutes';

const NotFoundPage = lazy(() => import('src/pages/NotFoundPage'));
const VideoIndexPage = lazy(() => import('src/pages/video/detail/VideoIndexPage'));
const VideoListPage = lazy(() => import('src/pages/video/list/VideoListPage'));
const VideoDetailPage = lazy(() => import('src/pages/video/detail/VideoDetailPage'));

export default function AuthIndex() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingPage />}>
        <Routes>
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/" element={<VideoIndexPage />} />
          <Route path={routes.list} element={<VideoListPage />} />
          <Route path={routes.detail} element={<VideoDetailPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
