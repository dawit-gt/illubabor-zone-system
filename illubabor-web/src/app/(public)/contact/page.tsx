'use client';

import { useState, FormEvent } from 'react';
import { useLanguage } from '@/lib/language-provider';
import { api } from '@/lib/api';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const COPY = {
  om: {
    title: 'Qunnamtii', name: 'Maqaa', email: 'Imeelii', message: 'Ergaa', send: 'Ergi',
    address: 'Metu, Godina Illubaabor, Oromiyaa, Itoophiyaa',
    success: 'Ergaan kee milkaaʼinaan ergameera. Galatoomi!',
    error: 'Ergaan hin milkoofne. Irra deebi\'ii yaali.',
  },
  am: {
    title: 'አድራሻ', name: 'ስም', email: 'ኢሜይል', message: 'መልእክት', send: 'ላክ',
    address: 'መቱ፣ ኢሉአባቦር ዞን፣ ኦሮሚያ፣ ኢትዮጵያ',
    success: 'መልእክትዎ በተሳካ ሁኔታ ተልኳል። እናመሰግናለን!',
    error: 'መላክ አልተሳካም። እባክዎ እንደገና ይሞክሩ።',
  },
  en: {
    title: 'Contact', name: 'Name', email: 'Email', message: 'Message', send: 'Send',
    address: 'Metu, Illubabor Zone, Oromia, Ethiopia',
    success: 'Your message was sent successfully. Thank you!',
    error: 'Failed to send. Please try again.',
  },
};

// Real office contact details for Illu Abba Bor Zone Administration.
const INFO_LABELS = {
  om: {
    heading: 'Odeeffannoo Qunnamtii',
    officeAddress: 'Teessoo Waajjiraa',
    phones: 'Lakkoofsa Bilbilaa',
    email: 'Teessoo Imeelii',
    hours: 'Sa\'aatii Hojii',
  },
  am: {
    heading: 'የመገናኛ መረጃ',
    officeAddress: 'የቢሮ አድራሻ',
    phones: 'ስልክ ቁጥሮች',
    email: 'የኢሜይል አድራሻ',
    hours: 'የስራ ሰዓት',
  },
  en: {
    heading: 'Contact Information',
    officeAddress: 'Office address',
    phones: 'Telephone numbers',
    email: 'Email address',
    hours: 'Working hours',
  },
};

const OFFICE_ADDRESS = 'Ilu Abba Bor Zone, Mettu Town';

const PHONE_NUMBERS = [
  { number: '047 441 2251', role: 'Administration Department' },
  { number: '047 441 3801', role: 'Deputy Administration Department' },
  { number: '047 441 1833', role: 'Public Complaints and Appeals Department' },
  { number: '047 441 1718', role: 'Policy and Strategy Implementation Monitoring Department' },
  { number: '047 141 2913', role: 'Deputy Head / IT Office' },
  { number: '047 141 1391', role: 'BQHN Department' },
  { number: '047 141 1617', role: 'QNFM Department' },
];

const EMAIL_ADDRESS: string | null = null; // not yet available — falls back to "Not available" below
const WORKING_HOURS = '2:30 AM – 11:30 AM'; // local time format as provided

export default function ContactPage() {
  const { language } = useLanguage();
  const t = COPY[language];
  const infoLabels = INFO_LABELS[language];
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
      <h1 className="font-display text-3xl font-semibold text-coffee-950">{t.title}</h1>
      <p className="mt-2 text-sm text-coffee-800">{t.address}</p>

      {/* Real contact information */}
      <div className="mt-8 overflow-hidden rounded-lg border border-coffee-950/10 bg-white transition-shadow duration-300 hover:shadow-lg">
        <h2 className="border-b border-coffee-950/10 bg-parchment-50 px-4 py-3 font-display text-base font-semibold text-coffee-950">
          {infoLabels.heading}
        </h2>
        <table className="w-full text-sm">
          <tbody className="divide-y divide-coffee-950/10">
            <tr className="group transition-colors duration-200 hover:bg-parchment-50">
              <td className="w-1/3 p-4 align-top">
                <div className="flex items-center gap-2.5 font-medium text-coffee-950">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-clay-600/10 text-clay-600 transition-transform duration-200 group-hover:scale-110">
                    <MapPin size={16} aria-hidden="true" />
                  </span>
                  {infoLabels.officeAddress}
                </div>
              </td>
              <td className="p-4 text-coffee-800">{OFFICE_ADDRESS}</td>
            </tr>

            <tr className="group transition-colors duration-200 hover:bg-parchment-50">
              <td className="w-1/3 p-4 align-top">
                <div className="flex items-center gap-2.5 font-medium text-coffee-950">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-canopy-700/10 text-canopy-700 transition-transform duration-200 group-hover:scale-110">
                    <Phone size={16} aria-hidden="true" />
                  </span>
                  {infoLabels.phones}
                </div>
              </td>
              <td className="p-4 text-coffee-800">
                <ul className="space-y-1.5">
                  {PHONE_NUMBERS.map((p) => (
                    <li key={p.number} className="flex flex-wrap items-baseline gap-x-2">
                      <a href={`tel:${p.number.replace(/\s+/g, '')}`} className="font-mono text-coffee-950 hover:text-clay-600">
                        {p.number}
                      </a>
                      <span className="text-xs text-coffee-600">— {p.role}</span>
                    </li>
                  ))}
                </ul>
              </td>
            </tr>

            <tr className="group transition-colors duration-200 hover:bg-parchment-50">
              <td className="w-1/3 p-4 align-top">
                <div className="flex items-center gap-2.5 font-medium text-coffee-950">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sor-600/10 text-sor-600 transition-transform duration-200 group-hover:scale-110">
                    <Mail size={16} aria-hidden="true" />
                  </span>
                  {infoLabels.email}
                </div>
              </td>
              <td className="p-4 text-coffee-800">
                {EMAIL_ADDRESS ? (
                  <a href={`mailto:${EMAIL_ADDRESS}`} className="hover:text-clay-600">{EMAIL_ADDRESS}</a>
                ) : (
                  <span className="text-coffee-500">
                    {language === 'om' ? 'Hin jiru' : language === 'am' ? 'የለም' : 'Not available'}
                  </span>
                )}
              </td>
            </tr>

            <tr className="group transition-colors duration-200 hover:bg-parchment-50">
              <td className="w-1/3 p-4 align-top">
                <div className="flex items-center gap-2.5 font-medium text-coffee-950">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-500/20 text-coffee-800 transition-transform duration-200 group-hover:scale-110">
                    <Clock size={16} aria-hidden="true" />
                  </span>
                  {infoLabels.hours}
                </div>
              </td>
              <td className="p-4 text-coffee-800">{WORKING_HOURS}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {status === 'sent' ? (
        <p className="mt-8 rounded-md bg-canopy-700/10 px-4 py-3 text-sm text-canopy-700">{t.success}</p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label className="block text-sm font-medium text-coffee-950">{t.name}</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="mt-1 w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm focus:border-clay-600 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-coffee-950">{t.email}</label>
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="mt-1 w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm focus:border-clay-600 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-coffee-950">{t.message}</label>
            <textarea
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="mt-1 w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm focus:border-clay-600 focus:outline-none"
            />
          </div>
          {status === 'error' && <p className="text-sm text-red-600">{t.error}</p>}
          <button
            type="submit"
            disabled={status === 'sending'}
            className="rounded-md bg-clay-600 px-6 py-3 text-sm font-semibold text-white hover:bg-clay-500 disabled:opacity-60"
          >
            {status === 'sending' ? '…' : t.send}
          </button>
        </form>
      )}
    </div>
  );
}