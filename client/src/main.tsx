import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthPage } from './AuthPage/AuthPage.tsx';
import { DashboardPage } from './DashboardPage/DashboardPage.tsx';
import { App } from './App.tsx';

import './index.css';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App>
      <Routes>
        <Route path="/" element={<Navigate to="/channels" replace />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/*" element={<DashboardPage />} />
      </Routes>
    </App>
  </BrowserRouter>
);
