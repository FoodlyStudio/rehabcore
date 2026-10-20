import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import AppStoreBadges from '../AppStoreBadges';
import { useLanguage } from '../../i18n/LanguageContext';

export default function FinalCTA() {
  const { t } = useLanguage();

  return (
    <section id="final-cta" className="relative py-12 md:py-16 overflow-hidden">
      <div className="absolute inset-0 bg-motivo-onyx" aria-hidden="true" />
      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <div className="bg-motivo-green rounded-3xl px-6 sm:px-8 py-12 md:py-16 shadow-2xl shadow-motivo-green/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" aria-hidden="true" />
          <h2 className="relative text-3xl md:text-4xl lg:text-5xl font-bold text-motivo-onyx tracking-tight leading-tight">
            {t('finalCta.title')}
          </h2>
          <p className="relative mt-4 md:mt-6 text-lg text-motivo-onyx/70 max-w-xl mx-auto">
            {t('finalCta.subtitle')}
          </p>
          <div className="relative mt-8 md:mt-10 flex flex-col items-center justify-center gap-4">
            <Link
              to="/kontakt"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-motivo-onyx text-white font-semibold text-base hover:bg-black transition-all shadow-lg hover:-translate-y-0.5"
            >
              {t('finalCta.cta')}
              <ArrowRight size={20} />
            </Link>
            <div className="flex flex-col items-center gap-2">
              <span className="text-sm text-motivo-onyx/70">{t('finalCta.downloadLabel')}</span>
              <AppStoreBadges variant="light" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
