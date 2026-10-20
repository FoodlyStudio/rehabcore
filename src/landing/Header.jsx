import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? 'bg-motivo-onyx/95 backdrop-blur-md border-motivo-border py-2'
          : 'bg-motivo-onyx/60 backdrop-blur-sm border-transparent py-4'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 text-xl font-bold text-white tracking-tight">
          <motion.img
            src="/motivo-mark.png"
            alt="MOTIVO"
            animate={{ height: scrolled ? 26 : 32 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="w-auto"
          />
          MOTIVO
        </Link>
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          <Link to="/#dla-kogo" className="text-motivo-textMuted hover:text-white text-sm font-medium transition-colors">
            {t('nav.forWho')}
          </Link>
          <Link to="/#subskrypcja" className="text-motivo-textMuted hover:text-white text-sm font-medium transition-colors">
            {t('nav.pricing')}
          </Link>
          <Link to="/#faq" className="text-motivo-textMuted hover:text-white text-sm font-medium transition-colors">
            {t('nav.faq')}
          </Link>
          <LanguageSwitcher />
          <Link
            to="/kontakt"
            className="btn-shine inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-motivo-green text-motivo-onyx text-sm font-semibold hover:brightness-110 transition-all shadow-lg shadow-motivo-green/20"
          >
            {t('nav.cta')}
          </Link>
        </nav>
        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            className="p-2 text-motivo-textMuted hover:bg-motivo-surface rounded-lg"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-motivo-border bg-motivo-onyx px-4 sm:px-6 py-4 flex flex-col gap-3">
          <Link to="/#dla-kogo" className="text-motivo-textMuted font-medium" onClick={() => setOpen(false)}>
            {t('nav.forWho')}
          </Link>
          <Link to="/#subskrypcja" className="text-motivo-textMuted font-medium" onClick={() => setOpen(false)}>
            {t('nav.pricing')}
          </Link>
          <Link to="/#faq" className="text-motivo-textMuted font-medium" onClick={() => setOpen(false)}>
            {t('nav.faq')}
          </Link>
          <Link
            to="/kontakt"
            className="inline-flex justify-center px-5 py-2.5 rounded-xl bg-motivo-green text-motivo-onyx font-semibold"
            onClick={() => setOpen(false)}
          >
            {t('nav.cta')}
          </Link>
        </div>
      )}
    </header>
  );
}
