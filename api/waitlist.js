import { createClient } from '@supabase/supabase-js';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_MIN_DIGITS = 9;
const BREVO_CONTACTS_URL = 'https://api.brevo.com/v3/contacts';

const countDigits = (s) => (s.match(/\d/g) || []).length;

// Strips everything but digits and a leading "+". Assumes Poland (+48) when
// no country code was given — the primary market for this waitlist.
function normalizePhone(raw) {
  const cleaned = raw.replace(/[^\d+]/g, '');
  return cleaned.startsWith('+') ? cleaned : `+48${cleaned}`;
}

// Server-side only — SUPABASE_SERVICE_ROLE_KEY and BREVO_API_KEY must never
// be prefixed with VITE_ (that would ship them to the browser bundle). Brevo
// is the source of truth for this feature (see MOTIVO waitlist list); the
// Supabase `waitlist` table is a best-effort mirror only.
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'method_not_allowed' });
  }

  const { email, phone, locale, source, company } = req.body || {};

  // Honeypot: a real visitor never sees or fills this field. A bot that
  // fills every input trips it — we pretend success and skip the write.
  if (company) {
    return res.status(200).json({ ok: true });
  }

  const normalizedEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';
  if (!EMAIL_RE.test(normalizedEmail)) {
    return res.status(400).json({ ok: false, error: 'invalid_email' });
  }

  const rawPhone = typeof phone === 'string' ? phone.trim() : '';
  if (countDigits(rawPhone) < PHONE_MIN_DIGITS) {
    return res.status(400).json({ ok: false, error: 'invalid_phone' });
  }
  const normalizedPhone = normalizePhone(rawPhone);

  const brevoApiKey = process.env.BREVO_API_KEY;
  const brevoListId = process.env.BREVO_WAITLIST_ID;
  if (!brevoApiKey || !brevoListId) {
    console.error('waitlist: missing BREVO_API_KEY / BREVO_WAITLIST_ID env vars');
    return res.status(500).json({ ok: false, error: 'server_misconfigured' });
  }

  // Create-or-update the contact in Brevo and attach it to the MOTIVO
  // waitlist list. `updateEnabled: true` means an email that already exists
  // in Brevo just gets this list (and phone) merged in instead of erroring
  // out as a duplicate — the contact ends up on the list either way.
  let brevoRes;
  try {
    brevoRes = await fetch(BREVO_CONTACTS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'api-key': brevoApiKey,
      },
      body: JSON.stringify({
        email: normalizedEmail,
        attributes: { SMS: normalizedPhone },
        listIds: [Number(brevoListId)],
        updateEnabled: true,
      }),
    });
  } catch (err) {
    console.error('waitlist: brevo request threw', err.message);
    return res.status(502).json({ ok: false, error: 'brevo_failed' });
  }

  if (!brevoRes.ok) {
    const detail = await brevoRes.text().catch(() => '');
    console.error('waitlist: brevo contact upsert failed', brevoRes.status, detail);
    return res.status(502).json({ ok: false, error: 'brevo_failed' });
  }

  // Best-effort mirror into Supabase — not the source of truth for this
  // feature anymore, so a failure here (missing table/column, etc.) is
  // logged but never blocks the response Brevo already confirmed.
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (supabaseUrl && serviceRoleKey) {
    try {
      const supabase = createClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false } });
      const { error } = await supabase.from('waitlist').insert({
        email: normalizedEmail,
        phone: normalizedPhone,
        locale: typeof locale === 'string' ? locale.slice(0, 5) : null,
        source: typeof source === 'string' ? source.slice(0, 200) : null,
      });
      // 23505 = unique_violation (email already on the list) — not a real error.
      if (error && error.code !== '23505') {
        console.error('waitlist: supabase mirror insert failed', error);
      }
    } catch (err) {
      console.error('waitlist: supabase mirror threw', err.message);
    }
  }

  return res.status(200).json({ ok: true });
}
