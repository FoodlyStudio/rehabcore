import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';

// MOTIVO nie jest jeszcze opublikowane w sklepach — pokazujemy zapowiedź
// zamiast martwych linków do sklepów.
export default function AppStoreBadges({ variant = 'dark' }) {
  const { t } = useLanguage();
  const isLight = variant === 'light';
  const comingSoon = t('appStore.comingSoon');
  const btnClass = isLight
    ? 'inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-motivo-onyx text-sm font-semibold h-12 cursor-default shadow-sm'
    : 'inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-motivo-surface/60 border border-motivo-border text-motivo-textMuted text-sm font-medium h-12 cursor-default';
  const iconClass = isLight ? 'w-8 h-8 opacity-80' : 'w-8 h-8 opacity-60';
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <span className={btnClass} aria-label={`${comingSoon} Google Play`}>
        <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.674 6.21 8.372-8.512zm3.199-3.198l2.807 1.526a1 1 0 0 1 0 1.73l-2.808 1.526L12 12l5.698-5.697zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z" />
        </svg>
        <span className="flex flex-col leading-tight text-left">
          <span className="text-[10px] uppercase tracking-wide">{comingSoon}</span>
          <span>{t('appStore.googlePlay')}</span>
        </span>
      </span>
      <span className={btnClass} aria-label={`${comingSoon} App Store`}>
        <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
        </svg>
        <span className="flex flex-col leading-tight text-left">
          <span className="text-[10px] uppercase tracking-wide">{comingSoon}</span>
          <span>{t('appStore.appStoreLabel')}</span>
        </span>
      </span>
    </div>
  );
}
