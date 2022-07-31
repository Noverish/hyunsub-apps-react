import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import LoadingPage from 'src/pages/LoadingPage';
import routes from './VideoRoutes';

const NotFoundPage = lazy(() => import('src/pages/NotFoundPage'));
const VideoHomePage = lazy(() => import('src/pages/video/home/VideoHomePage'));
const VideoDetailPage = lazy(() => import('src/pages/video/home/VideoDetailPage'));

export default function AuthIndex() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingPage />}>
        <Routes>
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/" element={<Navigate to={routes.home} />} />
          <Route path={routes.home} element={<VideoHomePage />} />
          <Route path={routes.detail} element={<VideoDetailPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
