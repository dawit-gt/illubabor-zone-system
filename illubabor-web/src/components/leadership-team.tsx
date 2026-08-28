'use client';

import { useLanguage } from '@/lib/language-provider';
import { useSiteConfig } from '@/hooks/useSiteConfig';

type Lang = 'om' | 'am' | 'en';

interface LeadershipMember {
  id: string;
  photoUrl: string;
  name: string;
  title: Record<Lang, string>;
  message: Record<Lang, string>;
}

export function LeadershipTeam() {
  const { language } = useLanguage();
  const lang = language as Lang;

  const { value: leadership, loading } = useSiteConfig<LeadershipMember[]>(
    'leadership_team',
    []
  );

  if (loading || leadership.length === 0) return null;

  return (
    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {leadership.map((l) => (
        <div
          key={l.id}
          className="overflow-hidden rounded-lg border border-coffee-950/10 bg-white"
        >
          {l.photoUrl && (
            <div className="flex justify-center bg-parchment-100">
              <img
                src={l.photoUrl}
                alt={l.name}
                className="aspect-square w-full max-w-[180px] object-cover"
              />
            </div>
          )}

          <div className="p-4 text-center">
            <p className="font-display text-base font-semibold text-ink-950">
              {l.name}
            </p>

            {l.title[lang] && (
              <p className="text-xs text-clay-600">
                {l.title[lang]}
              </p>
            )}

            {l.message[lang] && (
              <p className="mt-2 text-sm text-ink-700">
                {l.message[lang]}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}