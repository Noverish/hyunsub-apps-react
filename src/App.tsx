import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import ToastDisplay from './components/toast/ToastDisplay';
import LoadingPageDim from './pages/common/LoadingPageDim';
import router from './pages/router';
import { useDispatch, useSelector } from './redux';
import { GlobalActions } from './redux/global';
import { loadTokenPayload } from './utils/token';

function App() {
  const dispatch = useDispatch();
  const { loading } = useSelector(s => s.global);

  useEffect(() => {
    loadTokenPayload().then((tokenPayload) => {
      dispatch(GlobalActions.update({ tokenPayload }));
    });
  }, [dispatch]);

  return (
    <>
      <RouterProvider router={router} />
      <ToastDisplay />
      {loading && <LoadingPageDim />}
    </>
  );
}

export default App;
