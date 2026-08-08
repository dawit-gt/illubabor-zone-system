'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/language-provider';
import { selectByLanguage } from '@/lib/i18n';
import { useDepartments } from '@/hooks/useDepartments';

export default function DepartmentsPage() {
  const { language } = useLanguage();
  const { departments, loading } = useDepartments();

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-semibold text-coffee-950">
        {language === 'om' ? 'Waajjiraalee' : language === 'am' ? 'መምሪያዎች' : 'Departments'}
      </h1>
      <p className="mt-2 text-sm text-coffee-800">
        {language === 'om'
          ? 'Waajjiraalee bulchiinsa godinaa hunda kanneen tajaajila uummataaf dhiyeessan.'
          : language === 'am'
            ? 'ለህዝቡ አገልግሎት የሚሰጡ የዞኑ አስተዳደር መምሪያዎች።'
            : 'The zone administration departments serving residents.'}
      </p>

      {loading ? (
        <div className="mt-6 text-sm text-coffee-600">Loading…</div>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
    </div>
  );
}