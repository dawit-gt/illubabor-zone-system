'use client';

import { useState, FormEvent } from 'react';
import { useLanguage } from '@/lib/language-provider';
import { api } from '@/lib/api';
import { useSiteConfig } from '@/hooks/useSiteConfig';
import { MapPin, Mail, Phone } from 'lucide-react';

type Lang = 'om' | 'am' | 'en';

const COPY = {
  om: { title: 'Qunnamtii', name: 'Maqaa', email: 'Imeelii', message: 'Ergaa', send: 'Ergi', success: 'Ergaan kee milkaaʼinaan ergameera. Galatoomi!', error: "Ergaan hin milkoofne. Irra deebi'ii yaali." },
  am: { title: 'አድራሻ', name: 'ስም', email: 'ኢሜይል', message: 'መልእክት', send: 'ላክ', success: 'መልእክትዎ በተሳካ ሁኔታ ተልኳል። እናመሰግናለን!', error: 'መላክ አልተሳካም። እባክዎ እንደገና ይሞክሩ።' },
  en: { title: 'Contact', name: 'Name', email: 'Email', message: 'Message', send: 'Send', success: 'Your message was sent successfully. Thank you!', error: 'Failed to send. Please try again.' },
};

export default function ContactPage() {
  const { language } = useLanguage();
  const lang = language as Lang;
  const t = COPY[lang];
  const { value: info } = useSiteConfig<{ address: Record<Lang, string>; email: string; phone: string } | null>('contact_info', null);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await api.post('/contact', form);
      setStatus('sent');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-semibold text-ink-950">{t.title}</h1>

      {(info?.address[lang] || info?.email || info?.phone) && (
        <div className="mt-6 space-y-3 rounded-lg border border-coffee-950/10 bg-white p-5">
          {info.address[lang] && (
            <div className="flex items-start gap-3">
              <MapPin size={18} className="mt-0.5 shrink-0 text-clay-600" />
              <p className="text-sm text-ink-800">{info.address[lang]}</p>
            </div>
          )}
          {info.email && (
            <a href={`mailto:${info.email}`} className="flex items-center gap-3 text-sm text-ink-800 hover:text-clay-600">
              <Mail size={18} className="shrink-0 text-clay-600" />
              <span className="underline-offset-2 hover:underline">{info.email}</span>
            </a>
          )}
          {info.phone && (
            <a href={`tel:${info.phone.replace(/\s+/g, '')}`} className="flex items-center gap-3 text-sm text-ink-800 hover:text-clay-600">
              <Phone size={18} className="shrink-0 text-clay-600" />
              <span className="underline-offset-2 hover:underline">{info.phone}</span>
            </a>
          )}
        </div>
      )}

      {status === 'sent' ? (
        <p className="mt-8 rounded-md bg-canopy-700/10 px-4 py-3 text-sm text-canopy-700">{t.success}</p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label className="block text-sm font-medium text-ink-950">{t.name}</label>
            <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1 w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm focus:border-clay-600 focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink-950">{t.email}</label>
            <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-1 w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm focus:border-clay-600 focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink-950">{t.message}</label>
            <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="mt-1 w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm focus:border-clay-600 focus:outline-none" />
          </div>
          {status === 'error' && <p className="text-sm text-red-600">{t.error}</p>}
          <button type="submit" disabled={status === 'sending'} className="rounded-md bg-clay-600 px-6 py-3 text-sm font-semibold text-white hover:bg-clay-500 disabled:opacity-60">
            {status === 'sending' ? '…' : t.send}
          </button>
        </form>
      )}
    </div>
  );
}