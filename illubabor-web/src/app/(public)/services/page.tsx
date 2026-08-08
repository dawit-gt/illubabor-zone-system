'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/language-provider';
import { selectByLanguage } from '@/lib/i18n';
import { useServices } from '@/hooks/useServices';

export default function ServicesPage() {
  const { language } = useLanguage();
  const { services, loading } = useServices();

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-semibold text-coffee-950">
        {language === 'om' ? 'Tajaajila' : language === 'am' ? 'አገልግሎቶች' : 'Services'}
      </h1>

      {loading ? (
        <div className="mt-6 text-sm text-coffee-600">Loading…</div>
      ) : services.length === 0 ? (
        <p className="mt-6 text-sm text-coffee-600">
          {language === 'om' ? 'Tajaajilli hin galmoofne.' : language === 'am' ? 'ምንም አገልግሎት አልተመዘገበም።' : 'No services listed yet.'}
        </p>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Link
              key={s.id}
              href={`/services/${s.slug}`}
              className="rounded-lg border border-coffee-950/10 bg-white p-5 transition-shadow hover:shadow-md"
            >
              <p className="font-mono text-xs uppercase tracking-wide text-clay-600">
                {s.category.replace(/_/g, ' ')}
              </p>
              <h3 className="mt-2 font-display text-base font-semibold text-coffee-950">
                {selectByLanguage(s, 'name', language)}
              </h3>
              <p className="mt-1 text-xs text-coffee-600">{s.department.name}</p>
              {s.isOnline && (
                <span className="mt-2 inline-block rounded bg-canopy-700/10 px-2 py-0.5 text-xs text-canopy-700">
                  Online
                </span>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}