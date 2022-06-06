import React, { lazy } from 'react';

const AuthIndex = lazy(() => import('src/pages/auth'));

function App() {
  return <AuthIndex />;
}

export default App;
