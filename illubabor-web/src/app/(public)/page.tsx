'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/language-provider';
import { selectByLanguage } from '@/lib/i18n';
import { useZone } from '@/hooks/useZone';
import { useDepartments } from '@/hooks/useDepartments';

function ContourMotif() {
  return (
    <svg className="absolute inset-0 h-full w-full opacity-[0.08]" viewBox="0 0 800 400" preserveAspectRatio="none" aria-hidden="true">
      {[60, 110, 160, 210, 260, 310].map((y, i) => (
        <path key={y} d={`M0,${y} C150,${y - 40} 250,${y + 40} 400,${y} C550,${y - 40} 650,${y + 40} 800,${y}`} fill="none" stroke="currentColor" strokeWidth={1.5} opacity={1 - i * 0.12} />
      ))}
    </svg>
  );
}

const HERO_COPY = {
  om: { eyebrow: 'Godina Illubaabor', title: 'Bulchiinsa Godina Illubaabor', sub: 'Naannawa Oromiyaa keessatti bosona magariisaa fi buna isaatiin beekamu — tajaajila, oduu fi ifa ta\'insa bulchiinsaa gara uummataatti dhiyeessina.', cta: 'Tajaajila Ilaali' },
  am: { eyebrow: 'ኢሉአባቦር ዞን', title: 'የኢሉአባቦር ዞን አስተዳደር', sub: 'በደን እና በቡና ምርት በምትታወቀው በኦሮሚያ ክልል ውስጥ ላለው ዞን — አገልግሎቶችን፣ ዜናዎችን እና ግልጽነትን ለህዝብ እናቀርባለን።', cta: 'አገልግሎቶችን ይመልከቱ' },
  en: { eyebrow: 'Illubabor Zone', title: 'Illubabor Zone Administration', sub: 'A forested, coffee-growing zone in the Oromia Region — bringing public services, news, and transparency directly to residents.', cta: 'View Services' },
};

export default function HomePage() {
  const { language } = useLanguage();
  const t = HERO_COPY[language];
  const { zone, loading: zoneLoading } = useZone();
  const { departments, loading: deptLoading } = useDepartments();

  const stats = [
    { value: zone ? String(zone._count.woredas) : '—', label: { om: 'Aanaalee', am: 'ወረዳዎች', en: 'Woredas' } },
    { value: zone ? zone.population.toLocaleString() : '—', label: { om: 'Uummata', am: 'ህዝብ ብዛት', en: 'Population' } },
    { value: zone ? zone.areaKm2.toLocaleString() : '—', label: { om: 'Km² Bal\'ina', am: 'ስፋት (ኪ.ሜ²)', en: 'Area (km²)' } },
    { value: zone ? String(zone._count.departments) : '—', label: { om: 'Waajjiraalee', am: 'መምሪያዎች', en: 'Departments' } },
  ];

  return (
    <>
      <section className="relative overflow-hidden bg-canopy-700 text-parchment-50">
        <ContourMotif />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <p className="font-mono text-sm uppercase tracking-widest text-gold-500">{t.eyebrow}</p>
          <h1 className="mt-3 max-w-2xl font-display text-4xl font-semibold leading-tight sm:text-5xl">{t.title}</h1>
          <p className="mt-4 max-w-xl text-lg text-parchment-100/90">{t.sub}</p>
          <Link href="/services" className="mt-8 inline-block rounded-md bg-clay-600 px-6 py-3 text-sm font-semibold text-parchment-50 transition-colors hover:bg-clay-500">
            {t.cta}
          </Link>
        </div>
      </section>

      <section className="border-b border-coffee-950/10 bg-parchment-100">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 md:grid-cols-4 lg:px-8">
          {stats.map((s) => (
            <div key={s.label.en} className="text-center">
              <div className="font-display text-3xl font-semibold text-coffee-950">
                {zoneLoading ? '…' : s.value}
              </div>
              <div className="mt-1 text-sm text-coffee-800">{s.label[language]}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl font-semibold text-coffee-950">
          {language === 'om' ? 'Waajjiraalee' : language === 'am' ? 'መምሪያዎች' : 'Departments'}
        </h2>
        <p className="mt-2 text-sm text-coffee-800">
          {language === 'om'
            ? 'Waajjiraalee bulchiinsa godinaa hunda kanneen tajaajila uummataaf dhiyeessan.'
            : language === 'am'
              ? 'ለህዝቡ አገልግሎት የሚሰጡ የዞኑ አስተዳደር መምሪያዎች።'
              : 'The zone administration departments serving residents.'}
        </p>

        {deptLoading ? (
          <div className="mt-6 text-sm text-coffee-600">Loading…</div>
        ) : (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {departments.map((d) => (
              <Link
                key={d.id}
                href={`/departments/${d.slug}`}
                className="rounded-lg border border-coffee-950/10 bg-white p-5 transition-shadow hover:shadow-md"
              >
                <h3 className="font-display text-base font-semibold text-coffee-950">
                  {selectByLanguage(d, 'name', language)}
                </h3>
                <p className="mt-1 text-xs text-coffee-600">{d._count.services} services</p>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}