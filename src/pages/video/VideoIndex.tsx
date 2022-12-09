import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useIsAdmin } from 'src/api/auth/authorities';
import VideoSearchModal from 'src/components/video/VideoSearchModal';
import ErrorPage from '../common/ErrorPage';
import routes from './VideoRoutes';

const NotFoundPage = lazy(() => import('src/pages/common/NotFoundPage'));
const VideoIndexPage = lazy(() => import('src/pages/video/home/VideoIndexPage'));
const VideoListPage = lazy(() => import('src/pages/video/list/VideoListPage'));
const VideoDetailPage = lazy(() => import('src/pages/video/detail/VideoDetailPage'));
const VideoAdminPage = lazy(() => import('src/pages/video/admin/VideoAdminPage'));
const VideoMyPage = lazy(() => import('src/pages/video/my/VideoMyPage'));
const VideoSearchPage = lazy(() => import('src/pages/video/search/VideoSearchPage'));

export default function VideoIndex() {
  const isAdmin = useIsAdmin();

  return (
    <>
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/" element={<VideoIndexPage />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path={routes.admin} element={isAdmin ? <VideoAdminPage /> : <NotFoundPage />} />
        <Route path={routes.list} element={<VideoListPage />} />
        <Route path={routes.detail} element={<VideoDetailPage />} />
        <Route path={routes.my} element={<VideoMyPage />} />
        <Route path={routes.search} element={<VideoSearchPage />} />
      </Routes>
      <VideoSearchModal />
    </>
  )
}
