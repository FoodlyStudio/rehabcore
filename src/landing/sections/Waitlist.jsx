import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Loader2, Users } from 'lucide-react';
import CountUp from '../CountUp';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion';
import useWaitlistSignup from '../useWaitlistSignup';
import { useLanguage } from '../../i18n/LanguageContext';
import { WAITLIST_BASE_COUNT } from '../waitlistConfig';

export default function Waitlist() {
  const { t } = useLanguage();
  const reduced = usePrefersReducedMotion();
  const { email, onEmailChange, phone, onPhoneChange, company, setCompany, status, handleSubmit } =
    useWaitlistSignup('section');

  return (
    <section id="lista-oczekujacych" className="relative py-12 md:py-16 overflow-hidden">
      <div className="absolute inset-0 bg-motivo-onyx" aria-hidden="true" />
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-motivo-green/10 rounded-full blur-3xl"
        aria-hidden="true"
        animate={reduced ? undefined : { opacity: [0.5, 0.85, 0.5] }}
        transition={reduced ? undefined : { duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="relative max-w-3xl mx-auto px-6"
        initial={reduced ? undefined : { opacity: 0, y: 24 }}
        whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="relative rounded-3xl border border-motivo-border bg-motivo-surface px-6 sm:px-10 py-10 md:py-12 overflow-hidden">
          <div
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(0,200,83,0.08),transparent_60%)]"
            aria-hidden="true"
          />

          <div className="relative text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-motivo-green/10 text-motivo-green px-4 py-1.5 text-sm font-medium">
              <Users size={16} />
              {t('waitlist.badge')}
            </span>

            <h2 className="mt-5 text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight">
              {t('waitlist.title')}
            </h2>
            <p className="mt-4 text-lg text-motivo-textMuted max-w-xl mx-auto">
              {t('waitlist.subtitle')}
            </p>

            <div className="mt-7 flex items-center justify-center gap-2 text-motivo-coolGray">
              <span className="text-3xl md:text-4xl font-bold text-motivo-green tabular-nums">
                <CountUp to={WAITLIST_BASE_COUNT} suffix="+" duration={1.6} />
              </span>
              <span className="text-sm md:text-base text-motivo-textMuted">{t('waitlist.counterLabel')}</span>
            </div>

            {status === 'success' ? (
              <div
                className="mt-8 flex items-center justify-center gap-2.5 rounded-xl bg-motivo-green/10 border border-motivo-green/30 text-motivo-green px-5 py-4 max-w-md mx-auto"
                role="status"
              >
                <CheckCircle2 size={22} className="flex-shrink-0" />
                <span className="font-medium text-sm sm:text-base">{t('waitlist.success')}</span>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="mt-8 max-w-md mx-auto"
              >
                <div className="flex flex-col gap-3">
                  {/* Honeypot — hidden from real users, catches simple bots */}
                  <input
                    type="text"
                    name="company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="hidden"
                  />
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      inputMode="email"
                      required
                      placeholder={t('waitlist.placeholder')}
                      value={email}
                      onChange={onEmailChange}
                      aria-invalid={status === 'error' || status === 'apiError'}
                      aria-label={t('waitlist.placeholder')}
                      className={`w-full sm:flex-1 h-[52px] px-5 rounded-xl bg-motivo-surfaceAlt border text-white placeholder:text-motivo-textMuted focus:outline-none focus:ring-2 focus:ring-motivo-green/40 transition-colors ${
                        status === 'error' || status === 'apiError' ? 'border-red-500/60' : 'border-motivo-border focus:border-motivo-green/50'
                      }`}
                    />
                    <input
                      type="tel"
                      inputMode="tel"
                      required
                      placeholder={t('waitlist.phonePlaceholder')}
                      value={phone}
                      onChange={onPhoneChange}
                      aria-invalid={status === 'error' || status === 'apiError'}
                      aria-label={t('waitlist.phonePlaceholder')}
                      className={`w-full sm:flex-1 h-[52px] px-5 rounded-xl bg-motivo-surfaceAlt border text-white placeholder:text-motivo-textMuted focus:outline-none focus:ring-2 focus:ring-motivo-green/40 transition-colors ${
                        status === 'error' || status === 'apiError' ? 'border-red-500/60' : 'border-motivo-border focus:border-motivo-green/50'
                      }`}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="btn-shine w-full h-[52px] px-6 inline-flex items-center justify-center gap-2 rounded-xl bg-motivo-green text-motivo-onyx font-semibold whitespace-nowrap hover:brightness-110 disabled:opacity-70 disabled:cursor-not-allowed transition-all shadow-lg shadow-motivo-green/20"
                  >
                    {status === 'loading' ? (
                      <Loader2 size={20} className="animate-spin" />
                    ) : (
                      <>
                        {t('waitlist.cta')}
                        <ArrowRight size={18} />
                      </>
                    )}
                  </button>
                </div>
                {(status === 'error' || status === 'apiError') && (
                  <p className="mt-3 text-sm text-red-400 text-left sm:text-center" role="alert">
                    {status === 'error' ? t('waitlist.error') : t('waitlist.submitError')}
                  </p>
                )}
                <p className="mt-4 text-xs text-motivo-textMuted/80">{t('waitlist.note')}</p>
              </form>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
