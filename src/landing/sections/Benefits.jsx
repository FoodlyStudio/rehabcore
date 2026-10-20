import React from 'react';
import {
  Gauge,
  CalendarCheck,
  LayoutList,
  Repeat,
  Award,
  Users,
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

const ICONS = [Gauge, CalendarCheck, LayoutList, Repeat, Award, Users];

export default function Benefits() {
  const { t } = useLanguage();
  const items = t('benefits.items');

  return (
    <section id="korzyści" className="relative py-12 md:py-16 overflow-hidden">
      <div className="absolute inset-0 bg-motivo-onyx" aria-hidden="true" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-motivo-green/5 rounded-full blur-3xl" aria-hidden="true" />
      <div className="relative max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight text-center">
          {t('benefits.title')}
        </h2>
        <p className="mt-4 text-lg text-motivo-textMuted text-center max-w-xl mx-auto">
          {t('benefits.subtitle')}
        </p>
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(({ title, desc }, i) => {
            const Icon = ICONS[i];
            return (
              <div
                key={title}
                className="bg-motivo-surface rounded-2xl border border-motivo-border p-6 hover:border-motivo-green/30 transition-all duration-300 opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${i * 0.08}s`, animationFillMode: 'forwards' }}
              >
                <div className="w-12 h-12 rounded-xl bg-motivo-green/10 flex items-center justify-center text-motivo-green">
                  <Icon size={24} />
                </div>
                <h3 className="mt-4 font-semibold text-white">{title}</h3>
                <p className="mt-2 text-motivo-textMuted text-sm leading-relaxed">{desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
