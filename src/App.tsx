import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import ToastDisplay from './components/toast/ToastDisplay';
import ErrorBoundary from './pages/common/ErrorBoundary';
import LoadingPage from './pages/common/LoadingPage';
import LoadingPageDim from './pages/common/LoadingPageDim';
import router from './pages/router';
import { useSelector } from './redux';

function App() {
  const { loading } = useSelector(s => s.global);

  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingPage />}>
        <RouterProvider router={router} />
        <ToastDisplay />
        {loading && <LoadingPageDim />}
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
