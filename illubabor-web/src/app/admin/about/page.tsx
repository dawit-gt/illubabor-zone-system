'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { FileUpload } from '@/components/file-upload';
import { ContentEntryManager } from '@/components/content-entry-manager';

type Lang = 'en' | 'om' | 'am';
type TabKey = 'history' | 'geography' | 'places' | 'culture';

export default function AdminAboutPage() {
  const [tab, setTab] = useState<TabKey>('history');
  const [history, setHistory] = useState<Record<Lang, string>>({ en: '', om: '', am: '' });
  const [geography, setGeography] = useState<Record<Lang, string>>({ en: '', om: '', am: '' });
  const [mapUrl, setMapUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    Promise.all([
      api.get('/site-config/about_history_text').then((r) => JSON.parse(r.data.value)).catch(() => null),
      api.get('/site-config/about_geography_text').then((r) => JSON.parse(r.data.value)).catch(() => null),
      api.get('/site-config/geography_map_url').then((r) => JSON.parse(r.data.value)).catch(() => ''),
    ]).then(([h, g, m]) => {
      if (h) setHistory(h);
      if (g) setGeography(g);
      setMapUrl(m || '');
    }).finally(() => setLoading(false));
  }, []);

  const saveHistory = async () => {
    setSaving(true);
    try { await api.put('/site-config/about_history_text', { value: JSON.stringify(history) }); }
    finally { setSaving(false); }
  };
  const saveGeography = async () => {
    setSaving(true);
    try { await api.put('/site-config/about_geography_text', { value: JSON.stringify(geography) }); }
    finally { setSaving(false); }
  };
  const saveMap = async (url: string) => {
    setSaving(true);
    try { await api.put('/site-config/geography_map_url', { value: JSON.stringify(url) }); setMapUrl(url); }
    finally { setSaving(false); }
  };

  const TABS: { key: TabKey; label: string }[] = [
    { key: 'history', label: 'History' },
    { key: 'geography', label: 'Geography & Location' },
    { key: 'places', label: 'Historical Places' },
    { key: 'culture', label: 'Cultural Attractions' },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-ink-950">About Page</h1>

      <div className="mt-4 flex gap-2">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`rounded-md px-4 py-2 text-sm ${tab === t.key ? 'bg-clay-600 text-white' : 'border border-coffee-950/20'}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="mt-6 text-sm text-ink-600">Loading…</div>
      ) : (
        <div className="mt-6">
          {tab === 'history' && (
            <div className="space-y-4">
              {(['en', 'om', 'am'] as Lang[]).map((lang) => (
                <div key={lang}>
                  <label className="block text-sm font-medium text-ink-950 uppercase">{lang}</label>
                  <textarea value={history[lang]} onChange={(e) => setHistory({ ...history, [lang]: e.target.value })} rows={8} className="mt-1 w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm" />
                </div>
              ))}
              <button onClick={saveHistory} disabled={saving} className="rounded-md bg-clay-600 px-4 py-2 text-sm font-semibold text-white hover:bg-clay-500 disabled:opacity-60">
                {saving ? 'Saving…' : 'Save History'}
              </button>
            </div>
          )}

          {tab === 'geography' && (
            <div className="space-y-4">
              <div className="rounded-lg border border-coffee-950/10 bg-white p-4">
                <FileUpload label="Zone map image" value={mapUrl} onChange={saveMap} accept="image/*" />
              </div>
              {(['en', 'om', 'am'] as Lang[]).map((lang) => (
                <div key={lang}>
                  <label className="block text-sm font-medium text-ink-950 uppercase">{lang}</label>
                  <textarea value={geography[lang]} onChange={(e) => setGeography({ ...geography, [lang]: e.target.value })} rows={6} className="mt-1 w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm" />
                </div>
              ))}
              <button onClick={saveGeography} disabled={saving} className="rounded-md bg-clay-600 px-4 py-2 text-sm font-semibold text-white hover:bg-clay-500 disabled:opacity-60">
                {saving ? 'Saving…' : 'Save Geography'}
              </button>
            </div>
          )}

          {tab === 'places' && <ContentEntryManager type="HISTORICAL_SITE" />}
          {tab === 'culture' && <ContentEntryManager type="CULTURAL_TOPIC" />}
        </div>
      )}
    </div>
  );
}