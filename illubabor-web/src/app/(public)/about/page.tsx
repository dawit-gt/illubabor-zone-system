'use client';

import { useLanguage } from '@/lib/language-provider';
import { selectByLanguage } from '@/lib/i18n';
import { useZone } from '@/hooks/useZone';

const COPY = {
  om: {
    title: 'Waaʼee Godina Illubaabor',
    statsTitle: 'Haala Waliigalaa',
    woredas: 'Aanaalee', population: 'Uummata', area: 'Bal\'ina (Km²)', departments: 'Waajjiraalee',
  },
  am: {
    title: 'ስለ ኢሉአባቦር ዞን',
    statsTitle: 'አጠቃላይ መረጃ',
    woredas: 'ወረዳዎች', population: 'ህዝብ ብዛት', area: 'ስፋት (ኪ.ሜ²)', departments: 'መምሪያዎች',
  },
  en: {
    title: 'About Illubabor Zone',
    statsTitle: 'At a Glance',
    woredas: 'Woredas', population: 'Population', area: 'Area (km²)', departments: 'Departments',
  },
};

export default function AboutPage() {
  const { language } = useLanguage();
  const { zone, loading } = useZone();
  const t = COPY[language];

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-semibold text-coffee-950">{t.title}</h1>

      {loading ? (
        <div className="mt-6 text-sm text-coffee-600">Loading…</div>
      ) : zone ? (
        <>
          <p className="mt-6 max-w-2xl text-coffee-900">
            {selectByLanguage(zone, 'description', language)}
          </p>

          <h2 className="mt-10 font-display text-xl font-semibold text-coffee-950">{t.statsTitle}</h2>
          <div className="mt-4 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {[
              { label: t.woredas, value: zone._count.woredas },
              { label: t.population, value: zone.population?.toLocaleString() ?? '—' },
              { label: t.area, value: zone.areaKm2?.toLocaleString() ?? '—' },
              { label: t.departments, value: zone._count.departments },
            ].map((s) => (
              <div key={s.label} className="rounded-lg border border-coffee-950/10 bg-white p-4 text-center">
                <div className="font-display text-2xl font-semibold text-coffee-950">{s.value}</div>
                <div className="mt-1 text-xs text-coffee-600">{s.label}</div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="mt-6 text-sm text-coffee-600">Zone information unavailable.</p>
      )}
    </div>
  );
}