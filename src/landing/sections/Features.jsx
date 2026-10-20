import React from 'react';
import {
  Library,
  ClipboardList,
  Copy,
  Activity,
  TrendingUp,
  AlertCircle,
  Building2,
  Calendar,
  CheckSquare,
  Droplets,
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

const PT_ICONS = [Library, ClipboardList, Copy, Activity, TrendingUp, AlertCircle, Building2];
const PATIENT_ICONS = [Calendar, CheckSquare, Calendar, TrendingUp, Droplets];

export default function Features() {
  const { t } = useLanguage();
  const forPT = t('features.forPT.items');
  const forPatient = t('features.forPatient.items');

  return (
    <section id="funkcje" className="relative py-12 md:py-16 overflow-hidden">
      <div className="absolute inset-0 bg-motivo-onyx" aria-hidden="true" />
      <div className="relative max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight text-center">
          {t('features.title')}
        </h2>
        <p className="mt-4 text-lg text-motivo-textMuted text-center max-w-xl mx-auto">
          {t('features.subtitle')}
        </p>
        <div className="mt-14 grid md:grid-cols-2 gap-8">
          <div className="bg-motivo-surface rounded-2xl border border-motivo-border p-6 sm:p-8 hover:border-motivo-green/30 transition-all duration-300">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-motivo-green/10 text-motivo-green flex items-center justify-center">
                <Activity size={18} />
              </span>
              {t('features.forPT.title')}
            </h3>
            <ul className="mt-6 space-y-3">
              {forPT.map((label, i) => {
                const Icon = PT_ICONS[i];
                return (
                  <li key={label} className="flex items-center gap-3 text-motivo-coolGray">
                    <Icon size={18} className="text-motivo-textMuted flex-shrink-0" />
                    {label}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="bg-motivo-surface rounded-2xl border border-motivo-border p-6 sm:p-8 hover:border-motivo-green/30 transition-all duration-300">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-motivo-green/10 text-motivo-green flex items-center justify-center">
                <CheckSquare size={18} />
              </span>
              {t('features.forPatient.title')}
            </h3>
            <ul className="mt-6 space-y-3">
              {forPatient.map((label, i) => {
                const Icon = PATIENT_ICONS[i];
                return (
                  <li key={label} className="flex items-center gap-3 text-motivo-coolGray">
                    <Icon size={18} className="text-motivo-textMuted flex-shrink-0" />
                    {label}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
