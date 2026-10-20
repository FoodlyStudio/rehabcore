import React from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

export default function FAQ() {
  const { t } = useLanguage();
  const items = t('faq.items');

  return (
    <section id="faq" className="relative py-12 md:py-16 overflow-hidden">
      <div className="absolute inset-0 bg-motivo-onyx" aria-hidden="true" />
      <div className="relative max-w-3xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight text-center">
          {t('faq.title')}
        </h2>
        <div className="mt-14 space-y-3">
          {items.map(({ q, a }) => (
            <details
              key={q}
              className="group bg-motivo-surface rounded-xl border border-motivo-border overflow-hidden hover:border-motivo-green/30 transition-colors"
            >
              <summary className="flex items-center justify-between gap-4 px-6 py-4 cursor-pointer list-none font-semibold text-white hover:bg-motivo-surfaceAlt transition-colors">
                <span>{q}</span>
                <ChevronDown size={20} className="text-motivo-textMuted flex-shrink-0 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-6 pb-4 pt-0 text-motivo-textMuted leading-relaxed border-t border-motivo-border">
                {a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
