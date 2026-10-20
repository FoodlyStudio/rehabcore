import { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_MIN_DIGITS = 9;
const countDigits = (s) => (s.match(/\d/g) || []).length;

// Shared submit logic for every waitlist form on the site (full-screen
// coming-soon page, the mid-landing section, the footer mini form) — same
// /api/waitlist endpoint, validation, and status states everywhere.
export default function useWaitlistSignup(source) {
  const { lang } = useLanguage();
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState(''); // honeypot
  const [status, setStatus] = useState('idle'); // idle | loading | success | error | apiError

  const onEmailChange = (e) => {
    setEmail(e.target.value);
    if (status === 'error' || status === 'apiError') setStatus('idle');
  };

  const onPhoneChange = (e) => {
    setPhone(e.target.value);
    if (status === 'error' || status === 'apiError') setStatus('idle');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'loading' || status === 'success') return;

    const trimmedEmail = email.trim();
    const trimmedPhone = phone.trim();
    if (!EMAIL_RE.test(trimmedEmail) || countDigits(trimmedPhone) < PHONE_MIN_DIGITS) {
      setStatus('error');
      return;
    }

    setStatus('loading');
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmedEmail, phone: trimmedPhone, locale: lang, source, company }),
      });
      const data = await res.json().catch(() => ({ ok: false }));
      if (!res.ok || !data.ok) throw new Error(data.error || 'request_failed');
      setEmail('');
      setPhone('');
      setStatus('success');
    } catch {
      // Backend/network failure — distinct from a client-side invalid-input
      // error so the UI can show the right message for each case.
      setStatus('apiError');
    }
  };

  return { email, onEmailChange, phone, onPhoneChange, company, setCompany, status, handleSubmit };
}
