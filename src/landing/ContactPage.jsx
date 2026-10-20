import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Send, Mail, Phone, User, MessageSquare } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import { useLanguage } from '../i18n/LanguageContext';

const CONTACT_EMAIL = 'studiofood007@gmail.com';

export default function ContactPage() {
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

  const handleChange = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`MOTIVO — ${t('contact.emailSubject')} ${form.name}`);
    const bodyLines = [
      `${t('contact.form.name')}: ${form.name}`,
      `${t('contact.form.email')}: ${form.email}`,
      `${t('contact.form.phone')}: ${form.phone || '-'}`,
      '',
      form.message,
    ];
    const body = encodeURIComponent(bodyLines.join('\n'));
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen bg-motivo-onyx text-white font-sans antialiased overflow-x-hidden">
      <Header />
      <main className="relative pt-32 pb-16 md:pt-36 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-motivo-onyx" aria-hidden="true" />
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-motivo-green/10 rounded-full blur-3xl" aria-hidden="true" />
        <div className="relative max-w-2xl mx-auto px-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-motivo-textMuted hover:text-white transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            {t('contact.back')}
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">{t('contact.title')}</h1>
          <p className="mt-4 text-lg text-motivo-textMuted">{t('contact.subtitle')}</p>

          <form
            onSubmit={handleSubmit}
            className="mt-10 space-y-5 bg-motivo-surface border border-motivo-border rounded-2xl p-5 sm:p-6 md:p-8"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-motivo-coolGray mb-2">
                  {t('contact.form.name')}
                </label>
                <div className="relative">
                  <User size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-motivo-textMuted" />
                  <input
                    id="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange('name')}
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-motivo-surfaceAlt border border-motivo-border text-white placeholder:text-motivo-textMuted focus:outline-none focus:border-motivo-green transition-colors"
                    placeholder={t('contact.form.namePlaceholder')}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-motivo-coolGray mb-2">
                  {t('contact.form.phone')}
                </label>
                <div className="relative">
                  <Phone size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-motivo-textMuted" />
                  <input
                    id="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange('phone')}
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-motivo-surfaceAlt border border-motivo-border text-white placeholder:text-motivo-textMuted focus:outline-none focus:border-motivo-green transition-colors"
                    placeholder="+48 ..."
                  />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-motivo-coolGray mb-2">
                {t('contact.form.email')}
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-motivo-textMuted" />
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange('email')}
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-motivo-surfaceAlt border border-motivo-border text-white placeholder:text-motivo-textMuted focus:outline-none focus:border-motivo-green transition-colors"
                  placeholder={t('contact.form.emailPlaceholder')}
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-motivo-coolGray mb-2">
                {t('contact.form.message')}
              </label>
              <div className="relative">
                <MessageSquare size={18} className="absolute left-3.5 top-3.5 text-motivo-textMuted" />
                <textarea
                  id="message"
                  rows={5}
                  required
                  value={form.message}
                  onChange={handleChange('message')}
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-motivo-surfaceAlt border border-motivo-border text-white placeholder:text-motivo-textMuted focus:outline-none focus:border-motivo-green transition-colors resize-none"
                  placeholder={t('contact.form.messagePlaceholder')}
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn-shine w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-motivo-green text-motivo-onyx font-semibold hover:brightness-110 transition-all shadow-lg shadow-motivo-green/20"
            >
              {t('contact.form.submit')}
              <Send size={18} />
            </button>
            <p className="text-xs text-motivo-textMuted text-center">{t('contact.form.note')}</p>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
