import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Smartphone } from 'lucide-react';
import PhoneMockup from '../PhoneMockup';
import AppStoreBadges from '../AppStoreBadges';
import BrandPattern from '../BrandPattern';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion';
import { useLanguage } from '../../i18n/LanguageContext';

const wordVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.12 * i, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function Hero() {
  const { t } = useLanguage();
  const reduced = usePrefersReducedMotion();
  const headlineLines = t('hero.headline');
  let wordIndex = 0;

  return (
    <section className="relative min-h-[92vh] flex items-center pt-24 pb-12 md:pt-28 md:pb-16 overflow-hidden">
      {/* Background: dark app-style gradient + motion glow + brand pattern */}
      <div className="absolute inset-0 bg-motivo-onyx" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,0.04),transparent_60%)]"
        aria-hidden="true"
      />
      <BrandPattern />
      <motion.div
        className="absolute top-20 right-0 w-[500px] h-[500px] bg-motivo-green/10 rounded-full blur-3xl"
        aria-hidden="true"
        animate={reduced ? undefined : { opacity: [0.5, 0.9, 0.5] }}
        transition={reduced ? undefined : { duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-20 left-0 w-[400px] h-[400px] bg-motivo-green/10 rounded-full blur-3xl"
        aria-hidden="true"
        animate={reduced ? undefined : { y: [0, -20, 0] }}
        transition={reduced ? undefined : { duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Faint grain texture for premium depth */}
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-6xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="text-center lg:text-left">
            <motion.p
              className="inline-flex items-center gap-2 rounded-full bg-motivo-green/10 text-motivo-green px-4 py-1.5 text-sm font-medium mb-6"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Smartphone size={18} />
              {t('hero.badge')}
            </motion.p>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1]">
              {headlineLines.map((line, li) => (
                <span key={li} className="block overflow-hidden">
                  {line.map((word) => {
                    const i = wordIndex++;
                    return (
                      <motion.span
                        key={word}
                        className="inline-block mr-[0.28em] last:mr-0"
                        custom={i}
                        initial={reduced ? undefined : 'hidden'}
                        animate={reduced ? undefined : 'visible'}
                        variants={wordVariants}
                      >
                        {word}
                      </motion.span>
                    );
                  })}
                </span>
              ))}
            </h1>

            <motion.p
              className="mt-6 text-lg md:text-xl text-motivo-textMuted leading-relaxed max-w-xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.6 }}
            >
              {t('hero.subtitle')}
            </motion.p>

            <motion.div
              className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <Link
                to="/kontakt"
                className="btn-shine inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-motivo-green text-motivo-onyx font-semibold text-base hover:brightness-110 transition-all shadow-lg shadow-motivo-green/25 hover:shadow-motivo-green/40 hover:-translate-y-0.5"
              >
                {t('hero.ctaPrimary')}
                <ArrowRight size={20} />
              </Link>
            </motion.div>

            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.6 }}
            >
              <p className="text-sm text-motivo-textMuted mb-3">{t('hero.downloadLabel')}</p>
              <AppStoreBadges />
            </motion.div>
          </div>

          <motion.div
            className="hidden lg:block"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <PhoneMockup />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
