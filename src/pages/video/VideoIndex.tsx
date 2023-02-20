import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import VideoSearchModal from 'src/components/video/VideoSearchModal';
import VideoTabBar from 'src/components/video/VideoTabBar';
import { useSelector } from 'src/redux';
import LoadingPage from '../common/LoadingPage';
import routes from './VideoRoutes';

const NotFoundPage = lazy(() => import('src/pages/common/NotFoundPage'));
const VideoHomePage = lazy(() => import('src/pages/video/home/VideoHomePage'));
const VideoListPage = lazy(() => import('src/pages/video/list/VideoListPage'));
const VideoDetailPage = lazy(() => import('src/pages/video/detail/VideoDetailPage'));
const VideoAdminPage = lazy(() => import('src/pages/video/admin/VideoAdminPage'));
const VideoMyPage = lazy(() => import('src/pages/video/my/VideoMyPage'));
const VideoMenuPage = lazy(() => import('src/pages/video/menu/VideoMenuPage'));
const VideoSearchPage = lazy(() => import('src/pages/video/search/VideoSearchPage'));
const VideoSearchResultPage = lazy(() => import('src/pages/video/search/VideoSearchResultPage'));

export default function VideoIndex() {
  const isAdmin = useSelector(s => s.global.tokenPayload?.isAdmin || false);

  return (
    <>
      <VideoTabBar />
      <Suspense fallback={<LoadingPage />}>
        <Routes>
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/" element={<Navigate to={routes.home} />} />
          <Route path={routes.home} element={<VideoHomePage />} />
          <Route path={routes.admin} element={isAdmin ? <VideoAdminPage /> : <NotFoundPage />} />
          <Route path={routes.list} element={<VideoListPage />} />
          <Route path={routes.detail} element={<VideoDetailPage />} />
          <Route path={routes.my} element={<VideoMyPage />} />
          <Route path={routes.menu} element={<VideoMenuPage />} />
          <Route path={routes.search} element={<VideoSearchPage />} />
          <Route path={routes.searchResult} element={<VideoSearchResultPage />} />
        </Routes>
      </Suspense>
      <VideoSearchModal />
    </>
  )
}
