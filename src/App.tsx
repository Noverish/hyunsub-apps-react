import { lazy, Suspense } from 'react';
import ToastDisplay from './components/toast/ToastDisplay';
import ErrorBoundary from './pages/common/ErrorBoundary';
import LoadingPage from './pages/common/LoadingPage';
import LoadingPageDim from './pages/common/LoadingPageDim';
import { useSelector } from './redux';

const AuthIndex = lazy(() => import('src/pages/auth'));
const VideoIndex = lazy(() => import('src/pages/video'));

function renderIndex(): JSX.Element {
  const host = window.location.hostname;

  if (host === 'auth2.hyunsub.kim' || host === 'local-auth.hyunsub.kim') {
    return <AuthIndex />;
  }

  if (host.endsWith('video.hyunsub.kim')) {
    return <VideoIndex />;
  }

  return (
    <h1>Unknown host: {window.location.host}</h1>
  );
}

function App() {
  const { loading } = useSelector(s => s.global);

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
