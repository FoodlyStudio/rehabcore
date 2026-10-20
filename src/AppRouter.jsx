import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './landing/LandingPage';
import ContactPage from './landing/ContactPage';
import ComingSoon from './landing/ComingSoon';
import App from './App';
import { LanguageProvider } from './i18n/LanguageContext';
import { COMING_SOON_MODE } from './landing/comingSoonConfig';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <Routes>
          {COMING_SOON_MODE ? (
            <Route path="*" element={<ComingSoon />} />
          ) : (
            <>
              <Route path="/" element={<LandingPage />} />
              <Route path="/kontakt" element={<ContactPage />} />
              <Route path="/demo" element={<App />} />
            </>
          )}
        </Routes>
      </LanguageProvider>
    </BrowserRouter>
  );
}
