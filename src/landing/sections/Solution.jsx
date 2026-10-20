import React from 'react';
import { Check, Calendar, UserCheck, BarChart3, AlertTriangle, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

const ICONS = [Calendar, UserCheck, BarChart3, AlertTriangle, ArrowRight];

export default function Solution() {
  const { t } = useLanguage();
  const items = t('solution.items');

  return (
    <section id="rozwiązanie" className="relative py-12 md:py-16 overflow-hidden">
      <div className="absolute inset-0 bg-motivo-onyx" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[300px] bg-motivo-green/5 rounded-full blur-3xl" aria-hidden="true" />
      <div className="relative max-w-6xl mx-auto px-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-motivo-green/10 text-motivo-green px-4 py-1.5 text-sm font-medium mb-6">
            <Check size={18} />
            {t('solution.badge')}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            {t('solution.title')}
          </h2>
        </div>
        <ul className="mt-12 space-y-4 max-w-2xl">
          {items.map((text, i) => {
            const Icon = ICONS[i];
            return (
              <li key={text} className="flex items-start gap-4">
                <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-motivo-green/10 flex items-center justify-center text-motivo-green">
                  <Icon size={20} />
                </span>
                <span className="text-lg text-motivo-coolGray pt-1.5">{text}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
