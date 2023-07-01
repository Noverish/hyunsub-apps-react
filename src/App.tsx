import { RouterProvider } from 'react-router-dom';

import ToastDisplay from './components/toast/ToastDisplay';
import LoadingPageDim from './pages/common/LoadingPageDim';
import router from './pages/router';
import { useSelector } from './redux';

function App() {
  const { loading } = useSelector((s) => s.global);

  return (
    <>
      <RouterProvider router={router} />
      <ToastDisplay />
      {loading && <LoadingPageDim />}
    </>
  );
}

export default App;
