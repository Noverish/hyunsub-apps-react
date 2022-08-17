import { lazy } from 'react';
import ToastDisplay from './components/toast/ToastDisplay';
import LoadingPageDim from './pages/LoadingPageDim';
import { useSelector } from './redux';

const AuthIndex = lazy(() => import('src/pages/auth'));
const VideoIndex = lazy(() => import('src/pages/video'));

function renderIndex(): JSX.Element | undefined {
  const host = window.location.hostname;
  if (host.includes('auth2.hyunsub.kim')) {
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
    <>
      {renderIndex()}
      <ToastDisplay />
      {loading && <LoadingPageDim />}
    </>
  );
}

export default App;
