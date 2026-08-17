'use client';

import { useLanguage } from '@/lib/language-provider';
import { selectByLanguage } from '@/lib/i18n';
import { useDepartments } from '@/hooks/useDepartments';
import { SectorStats } from '@/components/sector-stats';

type Lang = 'om' | 'am' | 'en';

const PAGE_TITLE: Record<Lang, string> = {
  om: 'Waajjiraalee',
  am: 'መምሪያዎች',
  en: 'Departments',
};

const PAGE_SUBTITLE: Record<Lang, string> = {
  om: 'Waajjiraalee bulchiinsa godinaa hunda kanneen tajaajila uummataaf dhiyeessan.',
  am: 'ለህዝቡ አገልግሎት የሚሰጡ የዞኑ አስተዳደር መምሪያዎች።',
  en: 'The zone administration departments serving residents.',
};

const DEPARTMENT_SECTOR_MAP: Record<string, 'education' | 'health' | 'water' | 'electricity' | 'agriculture'> = {
  education: 'education',
  health: 'health',
  agriculture: 'agriculture',
  water: 'water',
  electricity: 'electricity',
};

export default function DepartmentsPage() {
  const { language } = useLanguage();
  const lang = language as Lang;
  const { departments, loading } = useDepartments();

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-semibold text-ink-950">{PAGE_TITLE[lang]}</h1>
      <p className="mt-2 text-sm text-ink-800">{PAGE_SUBTITLE[lang]}</p>

      {loading ? (
        <div className="mt-6 text-sm text-ink-600">Loading…</div>
      ) : departments.length === 0 ? (
        <p className="mt-6 text-sm text-ink-600">No departments added yet.</p>
      ) : (
        <div className="mt-10 flex flex-col gap-16">
          {departments.map((d: any) => (
            <section key={d.id} className="w-full border-t border-coffee-950/10 pt-10 first:border-t-0 first:pt-0">
              <h2 className="font-display text-2xl font-semibold text-ink-950">
                {selectByLanguage(d, 'name', language)}
              </h2>
              {d.description && (
                <p className="mt-2 max-w-2xl text-sm text-ink-800">{selectByLanguage(d, 'description', language)}</p>
              )}
              {(d.headName || d.contactEmail || d.contactPhone) && (
                <div className="mt-2 space-y-0.5 text-xs text-ink-600">
                  {d.headName && <p>Head: {d.headName}</p>}
                  {d.contactEmail && <p>Email: {d.contactEmail}</p>}
                  {d.contactPhone && <p>Phone: {d.contactPhone}</p>}
                </div>
              )}

              {DEPARTMENT_SECTOR_MAP[d.slug] ? (
                <div className="mt-6 w-full">
                  <SectorStats only={DEPARTMENT_SECTOR_MAP[d.slug]} />
                </div>
              ) : (
                <p className="mt-6 text-sm text-ink-600">{d._count?.services ?? 0} services</p>
              )}
            </section>
          ))}
        </div>
      )}
    </div>
  );
}