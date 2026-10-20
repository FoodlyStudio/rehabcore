import React from 'react';
import { User, Building2, Dumbbell, Activity } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

const ICONS = [User, Building2, Dumbbell, Activity];

export default function ForWho() {
  const { t } = useLanguage();
  const items = t('forWho.items');

  return (
    <section id="dla-kogo" className="relative py-12 md:py-16 overflow-hidden">
      <div className="absolute inset-0 bg-motivo-onyx" aria-hidden="true" />
      <div className="relative max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight text-center">
          {t('forWho.title')}
        </h2>
        <p className="mt-2 text-motivo-textMuted text-center max-w-xl mx-auto">
          {t('forWho.subtitle')}
        </p>
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((title, i) => {
            const Icon = ICONS[i];
            return (
              <div
                key={title}
                className="bg-motivo-surface rounded-2xl border border-motivo-border p-6 text-center hover:border-motivo-green/30 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-motivo-green/10 flex items-center justify-center text-motivo-green mx-auto">
                  <Icon size={28} />
                </div>
                <h3 className="mt-4 font-semibold text-white">{title}</h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
