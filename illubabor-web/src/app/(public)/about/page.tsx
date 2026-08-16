'use client';

import { useState } from 'react';
import { useLanguage } from '@/lib/language-provider';
import { selectByLanguage } from '@/lib/i18n';
import { useZone } from '@/hooks/useZone';
import { useSiteConfig } from '@/hooks/useSiteConfig';
import { useContent, ContentEntry } from '@/hooks/useContent';

type Lang = 'om' | 'am' | 'en';
type TabKey = 'history' | 'geography' | 'places' | 'culture';

const TABS: { key: TabKey; label: Record<Lang, string> }[] = [
  { key: 'history', label: { om: 'Seenaa', am: 'ታሪክ', en: 'History' } },
  { key: 'geography', label: { om: 'Teessuma Lafaa', am: 'መልክዓ ምድር', en: 'Geography & Location' } },
  { key: 'places', label: { om: 'Bakkeewwan Seenaa', am: 'ታሪካዊ ቦታዎች', en: 'Historical Places' } },
  { key: 'culture', label: { om: 'Aadaa', am: 'ባህል', en: 'Cultural Attractions' } },
];

export default function AboutPage() {
  const { language } = useLanguage();
  const lang = language as Lang;
  const { zone } = useZone();
  const { value: mapImage } = useSiteConfig<string>('geography_map_url', '');
  const { value: historyText } = useSiteConfig<Record<'en' | 'om' | 'am', string> | null>('about_history_text', null);
  const { value: geographyText } = useSiteConfig<Record<'en' | 'om' | 'am', string> | null>('about_geography_text', null);
  const [tab, setTab] = useState<TabKey>('history');
  const [selected, setSelected] = useState<ContentEntry | null>(null);

  const { entries: places, loading: placesLoading } = useContent('HISTORICAL_SITE');
  const { entries: cultureTopics, loading: cultureLoading } = useContent('CULTURAL_TOPIC');

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-semibold text-ink-950">
        {lang === 'om' ? "Waa'ee Godina Illubaabor" : lang === 'am' ? 'ስለ ኢሉአባቦር ዞን' : 'About Illubabor Zone'}
      </h1>

      <div className="mt-8 flex gap-1 overflow-x-auto border-b border-coffee-950/10">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => { setTab(t.key); setSelected(null); }}
            className={`whitespace-nowrap px-4 py-2.5 text-sm font-medium transition-colors ${
              tab === t.key ? 'border-b-2 border-clay-600 text-ink-950' : 'text-ink-600 hover:text-ink-950'
            }`}
          >
            {t.label[lang]}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {tab === 'history' && (
          <div className="rounded-lg border border-coffee-950/10 bg-white p-6">
            {historyText?.[lang] ? (
              <p className="whitespace-pre-line text-sm leading-relaxed text-ink-800">{historyText[lang]}</p>
            ) : (
              <p className="text-sm text-ink-600">History content not added yet.</p>
            )}
          </div>
        )}

        {tab === 'geography' && (
          <div className="space-y-6">
            {mapImage && (
              <img src={mapImage} alt="Illubabor Zone map" className="w-full rounded-lg border border-coffee-950/10" />
            )}
            <div className="rounded-lg border border-coffee-950/10 bg-white p-6">
              {geographyText?.[lang] ? (
                <p className="whitespace-pre-line text-sm leading-relaxed text-ink-800">{geographyText[lang]}</p>
              ) : (
                <p className="text-sm text-ink-600">Geography content not added yet.</p>
              )}
              {zone && (
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <div className="rounded-md bg-parchment-100 p-3 text-center">
                    <div className="font-display text-lg font-semibold text-ink-950">{zone.areaKm2?.toLocaleString()}</div>
                    <div className="text-xs text-ink-600">km²</div>
                  </div>
                  <div className="rounded-md bg-parchment-100 p-3 text-center">
                    <div className="font-display text-lg font-semibold text-ink-950">{zone.elevationMin ?? '—'}–{zone.elevationMax ?? '—'}m</div>
                    <div className="text-xs text-ink-600">Elevation</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {tab === 'places' && (
          <ContentList entries={places} loading={placesLoading} selected={selected} onSelect={setSelected} lang={lang} />
        )}

        {tab === 'culture' && (
          <ContentList entries={cultureTopics} loading={cultureLoading} selected={selected} onSelect={setSelected} lang={lang} />
        )}
      </div>
    </div>
  );
}

function ContentList({
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