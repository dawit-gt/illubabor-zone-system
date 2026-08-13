'use client';

import { useLanguage } from '@/lib/language-provider';
import { selectByLanguage } from '@/lib/i18n';
import { SectorStats } from '@/components/sector-stats';
import { useDepartments } from '@/hooks/useDepartments';

type Lang = 'om' | 'am' | 'en';

const PAGE_TITLE: Record<Lang, string> = {
  om: 'Tajaajila Ummataa Salphumatti',
  am: 'የህዝብ አገልግሎቶች በጨረፍታ',
  en: 'Public Services at a Glance',
};

const PAGE_SUBTITLE: Record<Lang, string> = {
  om: 'Dandeettii fi uwwisa yeroo ammaa kan barnoota, fayyaa, bishaanii fi anniisaa, akkasumas qonnaa keessatti argamu.',
  am: 'በትምህርት፣ በጤና፣ በውሃና ኢነርጂ፣ እና በግብርና ዘርፎች ያለው የአሁኑ አቅምና ሽፋን።',
  en: 'Current capacity and coverage across education, health, water and energy, and agriculture.',
};

const DEPARTMENTS_TITLE: Record<Lang, string> = {
  om: 'Waajjiraalee',
  am: 'መምሪያዎች',
  en: 'Departments',
};

export default function DepartmentsPage() {
  const { language } = useLanguage();
  const lang = language as Lang;
  const { departments, loading } = useDepartments();

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-semibold text-coffee-950">
        {PAGE_TITLE[lang]}
      </h1>
      <p className="mt-2 text-sm text-coffee-800">
        {PAGE_SUBTITLE[lang]}
      </p>

      <div className="mt-10">
        <SectorStats />
      </div>

      <div className="mt-16 border-t border-coffee-950/10 pt-10">
        <h2 className="font-display text-2xl font-semibold text-coffee-950">
          {DEPARTMENTS_TITLE[lang]}
        </h2>

        {loading ? (
          <div className="mt-6 text-sm text-coffee-600">Loading…</div>
        ) : (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {departments.map((d: any) => (
              <div key={d.id} className="rounded-lg border border-coffee-950/10 bg-white p-5">
                <h3 className="font-display text-base font-semibold text-coffee-950">
                  {selectByLanguage(d, 'name', language)}
                </h3>
                {d.description && (
                  <p className="mt-2 text-sm text-coffee-700">{selectByLanguage(d, 'description', language)}</p>
                )}
                <div className="mt-3 space-y-0.5 text-xs text-coffee-600">
                  {d.headName && <p>Head: {d.headName}</p>}
                  {d.contactEmail && <p>Email: {d.contactEmail}</p>}
                  {d.contactPhone && <p>Phone: {d.contactPhone}</p>}
                </div>
                <p className="mt-3 text-xs text-coffee-500">{d._count?.services ?? 0} services</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}