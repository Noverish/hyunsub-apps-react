import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoadingPage from 'src/pages/LoadingPage';

const LoginPage = lazy(() => import('src/pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('src/pages/auth/RegisterPage'));
const MyPage = lazy(() => import('src/pages/auth/MyPage'));

export default function AuthIndex() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingPage />}>
        <Routes>
          <Route path="/" element={<h1>404 Not Found</h1>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/my" element={<MyPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
