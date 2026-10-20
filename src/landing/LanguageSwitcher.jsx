import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';

const LABELS = { pl: 'PL', en: 'EN', es: 'ES' };

export default function LanguageSwitcher({ className = '' }) {
  const { lang, setLang, languages } = useLanguage();

  return (
    <div
      className={`inline-flex items-center rounded-lg border border-motivo-border bg-motivo-surface/60 p-0.5 ${className}`}
      role="group"
      aria-label="Language"
    >
      {languages.map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
          className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors ${
            lang === code ? 'bg-motivo-green text-motivo-onyx' : 'text-motivo-textMuted hover:text-white'
          }`}
        >
          {LABELS[code]}
        </button>
      ))}
    </div>
  );
}
