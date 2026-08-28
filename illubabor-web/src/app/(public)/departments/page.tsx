'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '@/lib/language-provider';
import { selectByLanguage } from '@/lib/i18n';
import { useDepartments } from '@/hooks/useDepartments';
import { SectorStats } from '@/components/sector-stats';

type Lang = 'om' | 'am' | 'en';

const PAGE_TITLE: Record<Lang, string> = {
  om: 'Dameewwan',
  am: 'ዘርፎች',
  en: 'Sectors',
};

const PAGE_SUBTITLE: Record<Lang, string> = {
  om: 'Waajjiraalee bulchiinsa godinaa hunda kanneen tajaajila uummataaf dhiyeessan. Waajjira tokko tuqxanii bal\'inaan ilaalaa.',
  am: 'ለህዝቡ አገልግሎት የሚሰጡ የዞኑ አስተዳደር መምሪያዎች። ዝርዝሩን ለማየት አንድ መምሪያ ይንኩ።',
  en: 'The zone administration departments serving residents. Tap a department to see full details.',
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
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-semibold text-ink-950">{PAGE_TITLE[lang]}</h1>
      <p className="mt-2 text-sm text-ink-800">{PAGE_SUBTITLE[lang]}</p>

      {loading ? (
        <div className="mt-6 text-sm text-ink-600">Loading…</div>
      ) : departments.length === 0 ? (
        <p className="mt-6 text-sm text-ink-600">No departments added yet.</p>
      ) : (
        <div className="mt-8 space-y-3">
          {departments.map((d: any) => {
            const isOpen = openId === d.id;
            return (
              <div key={d.id} className="overflow-hidden rounded-lg border border-coffee-950/10 bg-white">
                <button
                  onClick={() => setOpenId(isOpen ? null : d.id)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-parchment-50"
                >
                  <div>
                    <h2 className="font-display text-lg font-semibold text-ink-950">
                      {selectByLanguage(d, 'name', language)}
                    </h2>
                    {d.description && (
                      <p className="line-clamp-2 max-w-2xl whitespace-pre-line text-sm text-ink-800">
                        {selectByLanguage(d, 'description', language)}
                      </p>
                    )}
                  </div>
                  <ChevronDown
                    size={20}
                    className={`shrink-0 text-clay-600 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {isOpen && (
                  <div className="border-t border-coffee-950/10 px-5 py-6">
                    {d.description && (
                      <p className="max-w-2xl whitespace-pre-line text-sm text-ink-800">
                        {selectByLanguage(d, 'description', language)}
                      </p>
                    )}
                    {(d.headName || d.contactEmail || d.contactPhone) && (
                      <div className="mt-3 space-y-0.5 text-xs text-ink-600">
                        {d.headName && <p>Head: {d.headName}</p>}
                        {d.contactEmail && <p>Email: {d.contactEmail}</p>}
                        {d.contactPhone && <p>Phone: {d.contactPhone}</p>}
                      </div>
                    )}

                    {DEPARTMENT_SECTOR_MAP[d.slug] ? (
                      <div className="mt-6">
                        <SectorStats only={DEPARTMENT_SECTOR_MAP[d.slug]} />
                      </div>
                    ) : (
                      <p className="mt-6 text-sm text-ink-600">{d._count?.services ?? 0} services</p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}