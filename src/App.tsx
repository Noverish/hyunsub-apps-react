import { lazy } from 'react';
import ToastDisplay from './components/toast/ToastDisplay';

const AuthIndex = lazy(() => import('src/pages/auth'));
const VideoIndex = lazy(() => import('src/pages/video'));

function renderIndex(): JSX.Element | undefined {
  const host = window.location.hostname;
  if (host.includes('auth2.hyunsub.kim')) {
    return <AuthIndex />;
  }
  if (host === 'video2.hyunsub.kim' || host === 'local-video.hyunsub.kim') {
    return <VideoIndex />;
  }
  return undefined;
}

function App() {
  return (
    <>
      {renderIndex()}
      <ToastDisplay />
    </>
  );
}

export default App;
