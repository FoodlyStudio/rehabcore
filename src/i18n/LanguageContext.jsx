import React, { createContext, useContext, useEffect, useState } from 'react';
import { translations, SUPPORTED_LANGUAGES } from './translations';

const LanguageContext = createContext(null);

const STORAGE_KEY = 'motivo_lang';

function detectInitialLanguage() {
  if (typeof window === 'undefined') return 'pl';
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored && SUPPORTED_LANGUAGES.includes(stored)) return stored;
  const browserLang = (navigator.language || 'pl').slice(0, 2).toLowerCase();
  return SUPPORTED_LANGUAGES.includes(browserLang) ? browserLang : 'pl';
}

function resolve(obj, path) {
  return path.split('.').reduce((acc, key) => (acc == null ? undefined : acc[key]), obj);
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(detectInitialLanguage);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (next) => {
    if (SUPPORTED_LANGUAGES.includes(next)) setLangState(next);
  };

  const t = (path) => {
    const value = resolve(translations[lang], path);
    if (value === undefined) return resolve(translations.pl, path);
    return value;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, languages: SUPPORTED_LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider');
  return ctx;
}
