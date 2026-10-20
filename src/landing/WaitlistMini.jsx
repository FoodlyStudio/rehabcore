import React from 'react';
import { ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';
import useWaitlistSignup from './useWaitlistSignup';
import { useLanguage } from '../i18n/LanguageContext';

// Compact repeat of the Waitlist section's signup form — same /api/waitlist
// endpoint, no counter, used in the footer so the CTA is reachable without
// scrolling back up.
export default function WaitlistMini() {
  const { t } = useLanguage();
  const { email, onEmailChange, phone, onPhoneChange, company, setCompany, status, handleSubmit } =
    useWaitlistSignup('footer');

  if (status === 'success') {
    return (
      <div className="flex items-center gap-2 text-motivo-green text-sm font-medium" role="status">
        <CheckCircle2 size={18} className="flex-shrink-0" />
        {t('waitlist.success')}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full sm:w-auto">
      <div className="flex flex-col gap-2.5">
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
        <div className="flex flex-col sm:flex-row gap-2.5">
          <input
            type="email"
            inputMode="email"
            required
            placeholder={t('waitlist.placeholder')}
            value={email}
            onChange={onEmailChange}
            aria-invalid={status === 'error' || status === 'apiError'}
            aria-label={t('waitlist.placeholder')}
            className={`w-full sm:w-52 h-[52px] sm:h-11 px-4 rounded-xl bg-motivo-surface border text-white text-sm placeholder:text-motivo-textMuted focus:outline-none focus:ring-2 focus:ring-motivo-green/40 transition-colors ${
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
            className={`w-full sm:w-44 h-[52px] sm:h-11 px-4 rounded-xl bg-motivo-surface border text-white text-sm placeholder:text-motivo-textMuted focus:outline-none focus:ring-2 focus:ring-motivo-green/40 transition-colors ${
              status === 'error' || status === 'apiError' ? 'border-red-500/60' : 'border-motivo-border focus:border-motivo-green/50'
            }`}
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full sm:w-auto h-[52px] sm:h-11 px-5 inline-flex items-center justify-center gap-1.5 rounded-xl bg-motivo-green text-motivo-onyx text-sm font-semibold whitespace-nowrap hover:brightness-110 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
          >
            {status === 'loading' ? <Loader2 size={18} className="animate-spin" /> : (
              <>
                {t('waitlist.ctaShort')}
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </div>
      </div>
      {(status === 'error' || status === 'apiError') && (
        <p className="mt-2 text-xs text-red-400" role="alert">
          {status === 'error' ? t('waitlist.error') : t('waitlist.submitError')}
        </p>
      )}
    </form>
  );
}
