import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import MainPage from './pages/MainPage';
import SecondPage from './pages/SecondPage';
import EmailPage from './pages/EmailPage';
import AfterSubmitPage from './pages/AfterSubmitPage';


const AutoRedirect: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isReload = false;
    const entries = performance.getEntriesByType('navigation');
    if (entries.length > 0 && 'type' in entries[0]) {
      const navEntry = entries[0] as PerformanceNavigationTiming;
      isReload = navEntry.type === 'reload';
    } else if ('navigation' in performance) {
      const nav = performance.navigation;
      isReload = nav.type === 1;
    }

    const alreadyRedirected = sessionStorage.getItem('redirected');

    if (isReload && location.pathname !== '/' && !alreadyRedirected) {
      sessionStorage.setItem('redirected', 'true');
      navigate('/', { replace: true });
    }
  }, [navigate, location]);

  return null;
};

const App: React.FC = () => {
if (window.location.hash !== '#/') {
  window.location.hash = '#/';
}

  return (
    <Router>
      <AutoRedirect />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/second" element={<SecondPage />} />
        <Route path="/email" element={<EmailPage />} />
        <Route path="/" element={<EmailPage />} />
        <Route path="/aftersubmit" element={<AfterSubmitPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};


export default App;
