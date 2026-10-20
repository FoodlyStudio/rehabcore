import React from 'react';
import { UserPlus, CalendarRange, Dumbbell, TrendingUp } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

const ICONS = [UserPlus, CalendarRange, Dumbbell, TrendingUp];

export default function HowItWorks() {
  const { t } = useLanguage();
  const steps = t('howItWorks.steps');

  return (
    <section id="jak-to-działa" className="relative py-12 md:py-16 overflow-hidden">
      <div className="absolute inset-0 bg-motivo-onyx" aria-hidden="true" />
      <div className="relative max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight max-w-2xl">
          {t('howItWorks.title')}
        </h2>
        <p className="mt-2 text-motivo-textMuted max-w-2xl">
          {t('howItWorks.subtitle')}
        </p>
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((title, i) => {
            const Icon = ICONS[i];
            const num = i + 1;
            return (
              <div key={title} className="relative opacity-0 animate-fade-in-up" style={{ animationDelay: `${i * 0.12}s`, animationFillMode: 'forwards' }}>
                <div className="bg-motivo-surface rounded-2xl border border-motivo-border p-6 h-full hover:border-motivo-green/30 transition-all duration-300">
                  <span className="inline-block w-10 h-10 rounded-xl bg-motivo-green text-motivo-onyx font-bold text-lg flex items-center justify-center">
                    {num}
                  </span>
                  <div className="mt-4 w-12 h-12 rounded-xl bg-motivo-green/10 flex items-center justify-center text-motivo-green">
                    <Icon size={24} />
                  </div>
                  <h3 className="mt-4 font-semibold text-white">{title}</h3>
                </div>
                {num < steps.length && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-motivo-border -translate-y-1/2" aria-hidden="true" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
