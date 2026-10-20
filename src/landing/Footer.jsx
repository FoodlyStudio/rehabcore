import React from 'react';
import AppStoreBadges from './AppStoreBadges';
import WaitlistMini from './WaitlistMini';
import { useLanguage } from '../i18n/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-motivo-border bg-motivo-onyx py-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 pb-8 mb-8 border-b border-motivo-border">
          <div className="text-center lg:text-left">
            <p className="font-semibold text-white">{t('waitlist.footerTitle')}</p>
            <p className="text-sm text-motivo-textMuted mt-1">{t('waitlist.footerSubtitle')}</p>
          </div>
          <WaitlistMini />
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src="/motivo-mark.png" alt="" className="w-8 h-8" />
            <div>
              <span className="font-bold text-white text-lg">MOTIVO</span>
              <p className="text-sm text-motivo-textMuted mt-1">{t('footer.tagline')}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <AppStoreBadges />
          </div>
        </div>
        <p className="text-center text-sm text-motivo-textMuted/70 mt-6">© {new Date().getFullYear()} MOTIVO — Android &amp; iOS</p>
      </div>
    </footer>
  );
}
