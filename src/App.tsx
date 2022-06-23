import { lazy } from 'react';
import ToastDisplay from './components/toast/ToastDisplay';

const AuthIndex = lazy(() => import('src/pages/auth'));

function App() {
  return (
    <>
      <AuthIndex />
      <ToastDisplay />
    </>
  );
}

export default App;
