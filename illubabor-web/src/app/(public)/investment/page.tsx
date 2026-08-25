'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/language-provider';
import { selectByLanguage } from '@/lib/i18n';
import { useContent, ContentEntry } from '@/hooks/useContent';
import { useSiteConfig } from '@/hooks/useSiteConfig';

type Lang = 'om' | 'am' | 'en';

const COPY = {
  om: {
    title: 'Invastimantii', sub: 'Carraalee invastimantii buna, qonna, turizimii fi kanneen biroo',
    opportunities: 'Carraalee Invastimantii', sectors: 'Dameewwan Dursaa',
    economicData: 'Ragaa Diinagdee', incentives: 'Gorsaalee Invastimantii',
    howTo: 'Akkaataa Invastimantii', keyContacts: 'Qunnamtii Ijoo', contactBtn: 'Waajjira Invastimantii Qunnami',
  },
  am: {
    title: 'ኢንቨስትመንት', sub: 'በቡና፣ በግብርና ማቀነባበሪያ፣ በኢኮ-ቱሪዝም እና ተጨማሪ ላይ የኢንቨስትመንት እድሎች',
    opportunities: 'የኢንቨስትመንት እድሎች', sectors: 'ቅድሚያ የሚሰጣቸው ዘርፎች',
    economicData: 'የኢኮኖሚ መረጃ', incentives: 'የኢንቨስትመንት ማበረታቻዎች',
    howTo: 'እንዴት ኢንቨስት ማድረግ እንደሚቻል', keyContacts: 'ዋና ዋና አድራሻዎች', contactBtn: 'የኢንቨስትመንት ጽ/ቤትን ያግኙ',
  },
  en: {
    title: 'Investment', sub: 'Investment opportunities in coffee, agro-processing, eco-tourism, and more',
    opportunities: 'Investment Opportunities', sectors: 'Priority Sectors',
    economicData: 'Economic Data', incentives: 'Investment Incentives',
    howTo: 'How to Invest', keyContacts: 'Key Contacts', contactBtn: 'Contact Investment Office',
  },
};

export default function InvestmentLandingPage() {
  const { language } = useLanguage();
  const lang = language as Lang;
  const t = COPY[lang];

  const { entries: opportunities, loading } = useContent('INVESTMENT_OPPORTUNITY');
  const { value: sectors } = useSiteConfig<string[]>('investment_priority_sectors', []);
  const { value: economicData } = useSiteConfig<Record<Lang, string>>('investment_economic_data', { en: '', om: '', am: '' });
  const { value: incentives } = useSiteConfig<Record<Lang, string>>('investment_incentives', { en: '', om: '', am: '' });
  const { value: howToSteps } = useSiteConfig<Record<Lang, string>[]>('investment_how_to_steps', []);
  const { value: contactInfo } = useSiteConfig<{ address: Record<Lang, string>; email: string; phone: string[] } | null>('contact_info', null);
  const [selected, setSelected] = useState<ContentEntry | null>(null);

  if (selected) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <button onClick={() => setSelected(null)} className="text-sm text-clay-600 hover:underline">
          ← {lang === 'om' ? "Deebi'i" : lang === 'am' ? 'ተመለስ' : 'Back'}
        </button>
        <div className="mt-4 overflow-hidden rounded-lg border border-coffee-950/10 bg-white">
          {selected.imageUrl && <img src={selected.imageUrl} alt="" className="h-64 w-full object-cover" />}
          <div className="p-6">
            {selected.tag && (
              <span className="inline-block rounded-full bg-canopy-700/10 px-3 py-1 text-xs font-medium text-canopy-700">{selected.tag}</span>
            )}
            <h1 className="mt-3 font-display text-2xl font-semibold text-ink-950">{selectByLanguage(selected, 'title', lang)}</h1>
            <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-ink-800">{selectByLanguage(selected, 'body', lang)}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <section className="bg-coffee-950 py-16 text-parchment-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-bold">{t.title}</h1>
          <p className="mt-2 text-parchment-100/90">{t.sub}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl font-semibold text-ink-950">{t.opportunities}</h2>

        {loading ? (
          <div className="mt-6 text-sm text-ink-600">Loading…</div>
        ) : opportunities.length === 0 ? (
          <p className="mt-6 text-sm text-ink-600">Nothing added yet.</p>
        ) : (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {opportunities.map((o) => (
              <button
                key={o.id}
                onClick={() => setSelected(o)}
                className="overflow-hidden rounded-lg border border-coffee-950/10 bg-white text-left transition-shadow hover:shadow-md"
              >
                {o.imageUrl && <img src={o.imageUrl} alt="" className="h-40 w-full object-cover" />}
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-display text-base font-semibold text-ink-950">{selectByLanguage(o, 'title', lang)}</h3>
                    {o.tag && (
                      <span className="shrink-0 rounded-full bg-canopy-700/10 px-2.5 py-1 text-xs font-medium text-canopy-700">{o.tag}</span>
                    )}
                  </div>
                  {o.summary && <p className="mt-2 text-sm text-ink-600 line-clamp-2">{selectByLanguage(o, 'summary', lang)}</p>}
                  {o.status && <p className="mt-3 text-xs font-medium text-clay-600">● {o.status}</p>}
                </div>
              </button>
            ))}
          </div>
        )}
      </section>

      {sectors.length > 0 && (
        <section className="bg-parchment-100 py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl font-semibold text-ink-950">{t.sectors}</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {sectors.map((s) => (
                <span key={s} className="rounded-full bg-canopy-700/10 px-4 py-2 text-sm font-medium text-canopy-700">{s}</span>
              ))}
            </div>
          </div>
        </section>
      )}

      {(economicData?.[lang] || incentives?.[lang]) && (
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2">
            {economicData?.[lang] && (
              <div className="rounded-lg border border-coffee-950/10 bg-white p-6">
                <h3 className="font-display text-lg font-semibold text-ink-950">{t.economicData}</h3>
                <p className="mt-2 whitespace-pre-line text-sm text-ink-800">{economicData[lang]}</p>
              </div>
            )}
            {incentives?.[lang] && (
              <div className="rounded-lg border border-coffee-950/10 bg-white p-6">
                <h3 className="font-display text-lg font-semibold text-ink-950">{t.incentives}</h3>
                <p className="mt-2 whitespace-pre-line text-sm text-ink-800">{incentives[lang]}</p>
              </div>
            )}
          </div>
        </section>
      )}

      {howToSteps.length > 0 && (
        <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-semibold text-ink-950">{t.howTo}</h2>
          <ol className="mt-4 space-y-2">
            {howToSteps.map((step, i) => (
              <li key={i} className="flex gap-3 text-sm text-ink-800">
                <span className="font-semibold text-clay-600">{i + 1}.</span>
                <span>{step[lang]}</span>
              </li>
            ))}
          </ol>
        </section>
      )}

      {contactInfo && (contactInfo.phone?.length > 0 || contactInfo.email) && (
        <section className="bg-parchment-100 py-12 text-center">
          <h2 className="font-display text-xl font-semibold text-ink-950">{t.keyContacts}</h2>
          {contactInfo.phone?.map((p) => (
            <p key={p} className="mt-2 text-sm text-ink-800">{p}</p>
          ))}
          <Link
            href="/contact"
            className="mt-4 inline-block rounded-md bg-clay-600 px-6 py-3 text-sm font-semibold text-white hover:bg-clay-500"
          >
            {t.contactBtn}
          </Link>
        </section>
      )}
    </div>
  );
}