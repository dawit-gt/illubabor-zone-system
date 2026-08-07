'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/language-provider';
import { selectByLanguage } from '@/lib/i18n';
import { useWoredas } from '@/hooks/useWoredas';

export default function WoredasPage() {
  const { language } = useLanguage();
  const { woredas, loading } = useWoredas();

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-semibold text-coffee-950">
        {language === 'om' ? 'Aanaalee' : language === 'am' ? 'ወረዳዎች' : 'Woredas'}
      </h1>
      <p className="mt-2 text-sm text-coffee-800">
        {language === 'om'
          ? 'Aanaalee 13 kanneen Godina Illubaabor jala jiran.'
          : language === 'am'
            ? 'ከኢሉአባቦር ዞን ስር ያሉ 13 ወረዳዎች።'
            : 'The 13 woredas that make up Illubabor Zone.'}
      </p>

      {loading ? (
        <div className="mt-6 text-sm text-coffee-600">Loading…</div>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {woredas.map((w) => (
            <Link
              key={w.id}
              href={`/woredas/${w.slug}`}
              className="rounded-lg border border-coffee-950/10 bg-white p-5 transition-shadow hover:shadow-md"
            >
              <h3 className="font-display text-base font-semibold text-coffee-950">
                {selectByLanguage(w, 'name', language)}
                {w.isTown && (
                  <span className="ml-2 rounded bg-gold-500/20 px-2 py-0.5 text-xs font-normal text-coffee-800">
                    Town
                  </span>
                )}
              </h3>
              <p className="mt-1 text-xs text-coffee-600">{w._count.kebeles} kebeles</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}