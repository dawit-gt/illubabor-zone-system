'use client';

import { useLanguage } from '@/lib/language-provider';
import { useSiteConfig } from '@/hooks/useSiteConfig';

type Lang = 'om' | 'am' | 'en';

export default function LandPlotsPage() {
  const { language } = useLanguage();
  const lang = language as Lang;
  const { value, loading } = useSiteConfig<{ text: Record<Lang, string>; imageUrl: string }>(
    'investment_land_plots',
    { text: { en: '', om: '', am: '' }, imageUrl: '' },
  );

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-semibold text-ink-950">
        {lang === 'om' ? 'Lafa fi Bakka Invastimantii' : lang === 'am' ? 'መሬትና የኢንቨስትመንት ቦታዎች' : 'Land & Investment Plots'}
      </h1>
      {loading ? (
        <div className="mt-6 text-sm text-ink-600">Loading…</div>
      ) : (
        <div className="mt-8 overflow-hidden rounded-lg border border-coffee-950/10 bg-white">
          {value.imageUrl && <img src={value.imageUrl} alt="" className="h-64 w-full object-cover" />}
          <div className="p-6">
            {value.text[lang] ? (
              <p className="whitespace-pre-line text-sm leading-relaxed text-ink-800">{value.text[lang]}</p>
            ) : (
              <p className="text-sm text-ink-600">Content not added yet.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}