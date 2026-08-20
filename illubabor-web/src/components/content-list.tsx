'use client';

import { selectByLanguage } from '@/lib/i18n';
import { ContentEntry } from '@/hooks/useContent';

type Lang = 'om' | 'am' | 'en';

export function ContentList({
  entries, loading, selected, onSelect, lang,
}: { entries: ContentEntry[]; loading: boolean; selected: ContentEntry | null; onSelect: (e: ContentEntry | null) => void; lang: Lang }) {
  if (loading) return <div className="text-sm text-ink-600">Loading…</div>;
  if (entries.length === 0) return <p className="text-sm text-ink-600">Nothing added yet.</p>;

  if (selected) {
    return (
      <div>
        <button onClick={() => onSelect(null)} className="text-sm text-clay-600 hover:underline">
          ← {lang === 'om' ? "Deebi'i" : lang === 'am' ? 'ተመለስ' : 'Back to list'}
        </button>
        <div className="mt-4 overflow-hidden rounded-lg border border-coffee-950/10 bg-white">
          {selected.imageUrl && <img src={selected.imageUrl} alt="" className="h-64 w-full object-cover" />}
          <div className="p-6">
            <h3 className="font-display text-xl font-semibold text-ink-950">{selectByLanguage(selected, 'title', lang)}</h3>
            <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-ink-800">{selectByLanguage(selected, 'body', lang)}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {entries.map((e) => (
        <button
          key={e.id}
          onClick={() => onSelect(e)}
          className="overflow-hidden rounded-lg border border-coffee-950/10 bg-white text-left transition-shadow hover:shadow-md"
        >
          {e.imageUrl && <img src={e.imageUrl} alt="" className="h-40 w-full object-cover" />}
          <div className="p-4">
            <h3 className="font-display text-base font-semibold text-ink-950">{selectByLanguage(e, 'title', lang)}</h3>
            {e.summary && <p className="mt-1 text-sm text-ink-600 line-clamp-2">{selectByLanguage(e, 'summary', lang)}</p>}
            <p className="mt-2 text-xs text-clay-600">
              {lang === 'om' ? 'Dabalata Ilaali →' : lang === 'am' ? 'ተጨማሪ ይመልከቱ →' : 'Read more →'}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
}