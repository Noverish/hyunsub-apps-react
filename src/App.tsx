import { lazy, Suspense, useEffect } from 'react';
import ToastDisplay from './components/toast/ToastDisplay';
import ErrorBoundary from './pages/common/ErrorBoundary';
import LoadingPage from './pages/common/LoadingPage';
import LoadingPageDim from './pages/common/LoadingPageDim';
import { useDispatch, useSelector } from './redux';
import { loadAuthorities } from './redux/actions';

const AuthIndex = lazy(() => import('src/pages/auth/AuthIndex'));
const VideoIndex = lazy(() => import('src/pages/video/VideoIndex'));
const PhotoIndex = lazy(() => import('src/pages/photo/PhotoIndex'));
const ApparelIndex = lazy(() => import('src/pages/apparel/ApparelIndex'));

function renderIndex(): JSX.Element {
  const host = window.location.hostname;

  if (host.endsWith('auth.hyunsub.kim')) {
    return <AuthIndex />;
  }

  if (host.endsWith('video.hyunsub.kim')) {
    return <VideoIndex />;
  }

  if (host.endsWith('photo.hyunsub.kim')) {
    return <PhotoIndex />;
  }

  if (host.endsWith('apparel.hyunsub.kim')) {
    return <ApparelIndex />;
  }

  return (
    <h1>Unknown host: {window.location.host}</h1>
  );
}

function App() {
  const dispatch = useDispatch();
  const { loading } = useSelector(s => s.global);

  useEffect(() => {
    dispatch(loadAuthorities());
  }, [dispatch]);

  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingPage />}>
        {renderIndex()}
        <ToastDisplay />
        {loading && <LoadingPageDim />}
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
