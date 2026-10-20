import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';
import BrandPattern from './BrandPattern';
import CountUp from './CountUp';
import LanguageSwitcher from './LanguageSwitcher';
import usePrefersReducedMotion from './hooks/usePrefersReducedMotion';
import useWaitlistSignup from './useWaitlistSignup';
import { useLanguage } from '../i18n/LanguageContext';
import { WAITLIST_BASE_COUNT } from './waitlistConfig';

// Full-screen pre-launch gate — see COMING_SOON_MODE in comingSoonConfig.js.
// While that flag is true, AppRouter renders only this component for every
// route: the rest of the landing (Hero, Features, Pricing, FAQ...) stays in
// the codebase untouched, just unreachable until the flag flips back.
export default function ComingSoon() {
  const { t } = useLanguage();
  const reduced = usePrefersReducedMotion();
  const { email, onEmailChange, phone, onPhoneChange, company, setCompany, status, handleSubmit } =
    useWaitlistSignup('coming_soon');

  return (
    <div className="relative min-h-[100dvh] bg-motivo-onyx text-white font-sans antialiased overflow-hidden flex flex-col">
      <div className="absolute inset-0 bg-motivo-onyx" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,0.05),transparent_60%)]"
        aria-hidden="true"
      />
      <BrandPattern />
      <motion.div
        className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-motivo-green/10 rounded-full blur-3xl"
        aria-hidden="true"
        animate={reduced ? undefined : { opacity: [0.5, 0.9, 0.5] }}
        transition={reduced ? undefined : { duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-motivo-green/10 rounded-full blur-3xl"
        aria-hidden="true"
        animate={reduced ? undefined : { y: [0, -20, 0] }}
        transition={reduced ? undefined : { duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
        aria-hidden="true"
      />

      <div className="relative flex justify-end px-6 py-6 sm:px-8 sm:py-8">
        <LanguageSwitcher />
      </div>

      <div className="relative flex-1 flex items-center justify-center px-6 py-10">
        <motion.div
          className="w-full max-w-xl text-center"
          initial={reduced ? undefined : { opacity: 0, y: 20 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <img src="/motivo-mark.png" alt="MOTIVO" className="w-16 h-16 mx-auto" />
          <p className="mt-4 text-lg font-bold tracking-tight text-white">MOTIVO</p>

          <span className="mt-8 inline-flex items-center gap-2 rounded-full bg-motivo-green/10 text-motivo-green px-4 py-1.5 text-sm font-medium">
            {t('comingSoon.badge')}
          </span>

          <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-[1.1]">
            {t('comingSoon.title')}
          </h1>

          <p className="mt-5 text-lg text-motivo-textMuted leading-relaxed max-w-md mx-auto">
            {t('comingSoon.subtitle')}
          </p>

          <p className="mt-7 text-base text-motivo-coolGray">
            {t('comingSoon.counterBefore')}
            <span className="font-bold text-motivo-green tabular-nums">
              <CountUp to={WAITLIST_BASE_COUNT} duration={1.6} />
            </span>
            {t('comingSoon.counterAfter')}
          </p>

          {status === 'success' ? (
            <div
              className="mt-8 flex items-center justify-center gap-2.5 rounded-xl bg-motivo-green/10 border border-motivo-green/30 text-motivo-green px-5 py-4 max-w-md mx-auto"
              role="status"
            >
              <CheckCircle2 size={22} className="flex-shrink-0" />
              <span className="font-medium text-sm sm:text-base">{t('comingSoon.success')}</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="mt-8 max-w-md mx-auto">
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
                    placeholder={t('comingSoon.placeholder')}
                    value={email}
                    onChange={onEmailChange}
                    aria-invalid={status === 'error' || status === 'apiError'}
                    aria-label={t('comingSoon.placeholder')}
                    className={`w-full sm:flex-1 h-[52px] px-5 rounded-xl bg-motivo-surfaceAlt border text-white placeholder:text-motivo-textMuted focus:outline-none focus:ring-2 focus:ring-motivo-green/40 transition-colors ${
                      status === 'error' || status === 'apiError' ? 'border-red-500/60' : 'border-motivo-border focus:border-motivo-green/50'
                    }`}
                  />
                  <input
                    type="tel"
                    inputMode="tel"
                    required
                    placeholder={t('comingSoon.phonePlaceholder')}
                    value={phone}
                    onChange={onPhoneChange}
                    aria-invalid={status === 'error' || status === 'apiError'}
                    aria-label={t('comingSoon.phonePlaceholder')}
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
                      {t('comingSoon.cta')}
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </div>
              {(status === 'error' || status === 'apiError') && (
                <p className="mt-3 text-sm text-red-400 text-left sm:text-center" role="alert">
                  {status === 'error' ? t('comingSoon.error') : t('comingSoon.submitError')}
                </p>
              )}
              <p className="mt-4 text-xs text-motivo-textMuted/80">{t('comingSoon.note')}</p>
            </form>
          )}
        </motion.div>
      </div>

      <p className="relative text-center text-xs text-motivo-textMuted/60 pb-6">
        © {new Date().getFullYear()} MOTIVO
      </p>
    </div>
  );
}
