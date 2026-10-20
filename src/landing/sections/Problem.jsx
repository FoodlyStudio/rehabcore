import React from 'react';
import { AlertCircle, Gauge, Repeat, FileWarning } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

const ICONS = [Gauge, Repeat, FileWarning];

export default function Problem() {
  const { t } = useLanguage();
  const items = t('problem.items');

  return (
    <section id="problem" className="relative py-12 md:py-16 overflow-hidden">
      <div className="absolute inset-0 bg-motivo-onyx" aria-hidden="true" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-motivo-green/5 rounded-full blur-3xl" aria-hidden="true" />
      <div className="relative max-w-6xl mx-auto px-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-red-500/10 text-red-400 px-4 py-1.5 text-sm font-medium mb-6">
            <AlertCircle size={18} />
            {t('problem.badge')}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            {t('problem.title')}
          </h2>
          <p className="mt-4 text-lg text-motivo-textMuted leading-relaxed">
            {t('problem.subtitle')}
          </p>
        </div>
        <div className="mt-12 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.map((title, i) => {
            const Icon = ICONS[i];
            return (
              <div
                key={title}
                className="bg-motivo-surface rounded-2xl border border-motivo-border p-6 hover:border-motivo-green/30 transition-all duration-300 opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${i * 0.1}s`, animationFillMode: 'forwards' }}
              >
                <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-400">
                  <Icon size={24} />
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
