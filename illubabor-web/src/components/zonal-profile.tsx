'use client';

import { useLanguage } from '@/lib/language-provider';
import { useSiteConfig } from '@/hooks/useSiteConfig';

type Lang = 'om' | 'am' | 'en';

interface ProfileStat {
  id: string;
  iconUrl: string;
  label: Record<Lang, string>;
  value: string;
}

const TITLE = {
  om: 'Haala Godinaa',
  am: 'የዞን መገለጫ',
  en: 'Zonal Profile',
};

export function ZonalProfile() {
  const { language } = useLanguage();
  const lang = language as Lang;
  const { value: stats, loading } = useSiteConfig<ProfileStat[]>('zonal_profile_stats', []);

  if (loading || stats.length === 0) return null;

  return (
    <div>
      <h3 className="font-display text-xl font-semibold text-ink-950">{TITLE[lang]}</h3>
      <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.id} className="flex flex-col items-center text-center">
            <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-canopy-700/10">
              {s.iconUrl && (
                <img src={s.iconUrl} alt="" className="h-full w-full object-cover" />
              )}
            </div>
            <p className="mt-3 text-sm font-medium text-ink-800">
              {s.label[lang]}: <span className="font-semibold text-ink-950">{s.value}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}