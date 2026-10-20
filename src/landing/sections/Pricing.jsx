import React from 'react';
import { Link } from 'react-router-dom';
import { User, Users, Building2, Check } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

const ICONS = [User, Users, Building2];
const HIGHLIGHTED_INDEX = 1;

export default function Pricing() {
  const { t } = useLanguage();
  const plans = t('pricing.plans');

  return (
    <section id="subskrypcja" className="relative py-12 md:py-16 overflow-hidden">
      <div className="absolute inset-0 bg-motivo-onyx" aria-hidden="true" />
      <div className="relative max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight text-center">
          {t('pricing.title')}
        </h2>
        <p className="mt-4 text-lg text-motivo-textMuted text-center max-w-xl mx-auto">
          {t('pricing.subtitle')}
        </p>
        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {plans.map(({ name, desc, features }, i) => {
            const Icon = ICONS[i];
            const highlighted = i === HIGHLIGHTED_INDEX;
            return (
              <div
                key={name}
                className={`rounded-2xl border p-6 flex flex-col ${
                  highlighted
                    ? 'border-motivo-green bg-motivo-green text-motivo-onyx shadow-xl shadow-motivo-green/30'
                    : 'border-motivo-border bg-motivo-surface hover:border-motivo-green/30 transition-all duration-300'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${highlighted ? 'bg-motivo-onyx/10 text-motivo-onyx' : 'bg-motivo-green/10 text-motivo-green'}`}>
                  <Icon size={24} />
                </div>
                <h3 className="mt-4 text-xl font-bold">{name}</h3>
                <p className={`mt-2 text-sm ${highlighted ? 'text-motivo-onyx/70' : 'text-motivo-textMuted'}`}>{desc}</p>
                <ul className="mt-6 space-y-3 flex-1">
                  {features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <Check size={18} className={highlighted ? 'text-motivo-onyx flex-shrink-0' : 'text-motivo-green flex-shrink-0'} />
                      <span className={highlighted ? 'text-motivo-onyx/90' : 'text-motivo-coolGray'}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/kontakt"
                  className={`mt-6 block text-center py-3 rounded-xl font-semibold transition-colors ${
                    highlighted
                      ? 'bg-motivo-onyx text-white hover:bg-black'
                      : 'bg-motivo-green text-motivo-onyx hover:brightness-110'
                  }`}
                >
                  {t('pricing.cta')}
                </Link>
              </div>
            );
          })}
        </div>
        <p className="mt-8 text-center text-sm text-motivo-textMuted">
          {t('pricing.note')}
        </p>
      </div>
    </section>
  );
}
