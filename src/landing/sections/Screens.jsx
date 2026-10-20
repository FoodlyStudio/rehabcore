import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../i18n/LanguageContext';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion';

// Static screenshots captured from the real app (see public/screenshots/).
// To swap a screen: drop a new WebP (or PNG/JPG) into public/screenshots/
// and update `file` below — no other code changes needed. Keep the ~780px
// width / notch-first-app-screen framing for a consistent look.
const SCREENS = [
  { key: 'sesja', file: '/screenshots/sesja.webp', featured: true },
  { key: 'dzis', file: '/screenshots/dzis.webp' },
  { key: 'postepy', file: '/screenshots/postepy.webp' },
  { key: 'kalendarz', file: '/screenshots/kalendarz.webp' },
  { key: 'pacjenci', file: '/screenshots/pacjenci.webp' },
];

function PhoneFrame({ file, caption, className = '', imgClassName = '', priority = false }) {
  return (
    <div className={`group relative ${className}`}>
      <div
        className="absolute -z-10 inset-0 bg-motivo-green/10 rounded-[2.5rem] blur-xl scale-105 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        aria-hidden="true"
      />
      <div className="relative rounded-[2.5rem] bg-motivo-onyx p-2 shadow-2xl shadow-black/60 border border-motivo-border/60 group-hover:border-motivo-green/30 transition-all duration-300">
        <div className="relative rounded-[2rem] overflow-hidden bg-motivo-onyx">
          <img
            src={file}
            alt={caption}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            className={`w-full h-auto block ${imgClassName}`}
          />
        </div>
      </div>
      <p className="mt-4 text-center text-sm text-motivo-coolGray font-medium">{caption}</p>
    </div>
  );
}

export default function Screens() {
  const { t } = useLanguage();
  const reduced = usePrefersReducedMotion();
  const captions = t('screens.items');
  const featured = SCREENS.find((s) => s.featured);
  const rest = SCREENS.filter((s) => !s.featured);

  const fadeUp = (delay = 0) => ({
    initial: reduced ? undefined : { opacity: 0, y: 24 },
    whileInView: reduced ? undefined : { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
  });

  return (
    <section id="screens" className="relative py-16 md:py-20 overflow-hidden">
      <div className="absolute inset-0 bg-motivo-onyx" aria-hidden="true" />
      <div className="absolute top-1/4 left-0 w-[450px] h-[450px] bg-motivo-green/5 rounded-full blur-3xl" aria-hidden="true" />
      <div className="relative max-w-6xl mx-auto px-6">
        <motion.div {...fadeUp(0)}>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight text-center">
            {t('screens.title')}
          </h2>
          <p className="mt-4 text-lg text-motivo-textMuted text-center max-w-xl mx-auto">
            {t('screens.subtitle')}
          </p>
        </motion.div>

        {/* Mobile / tablet: horizontal scroll-snap carousel */}
        <div className="mt-12 flex lg:hidden gap-5 overflow-x-auto snap-x snap-mandatory pb-4 -mx-6 px-6 scrollbar-hide">
          {SCREENS.map((s, i) => (
            <motion.div key={s.key} {...fadeUp(i * 0.08)} className="shrink-0 w-[66vw] max-w-[280px] snap-center">
              <PhoneFrame file={s.file} caption={captions[s.key]} priority={i === 0} />
            </motion.div>
          ))}
        </div>

        {/* Desktop: one featured screen + 2x2 grid of the rest */}
        <div className="mt-14 hidden lg:grid grid-cols-2 gap-10 items-center">
          <motion.div {...fadeUp(0.1)} className="flex justify-center">
            <PhoneFrame file={featured.file} caption={captions[featured.key]} className="w-[282px]" priority />
          </motion.div>
          <div className="grid grid-cols-2 gap-8">
            {rest.map((s, i) => (
              <motion.div key={s.key} {...fadeUp(0.2 + i * 0.1)} className="flex justify-center">
                <PhoneFrame file={s.file} caption={captions[s.key]} className="w-full max-w-[216px]" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
