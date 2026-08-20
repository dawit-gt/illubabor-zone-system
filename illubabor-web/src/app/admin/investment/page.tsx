'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { FileUpload } from '@/components/file-upload';
import { ContentEntryManager } from '@/components/content-entry-manager';

type Lang = 'en' | 'om' | 'am';
type SimplePageKey = 'how_to_invest' | 'land_plots';

interface SimplePage {
  text: Record<Lang, string>;
  imageUrl: string;
}

const EMPTY_SIMPLE_PAGE: SimplePage = { text: { en: '', om: '', am: '' }, imageUrl: '' };

const SIMPLE_PAGES: { key: SimplePageKey; label: string; configKey: string }[] = [
  { key: 'how_to_invest', label: 'How to Invest', configKey: 'investment_how_to_invest' },
  { key: 'land_plots', label: 'Land & Investment Plots', configKey: 'investment_land_plots' },
];

type Tab = 'opportunities' | 'how_to_invest' | 'land_plots' | 'projects';

export default function AdminInvestmentPage() {
  const [tab, setTab] = useState<Tab>('opportunities');
  const [pages, setPages] = useState<Record<SimplePageKey, SimplePage>>({
    how_to_invest: { ...EMPTY_SIMPLE_PAGE },
    land_plots: { ...EMPTY_SIMPLE_PAGE },
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    Promise.all(
      SIMPLE_PAGES.map((p) =>
        api.get(`/site-config/${p.configKey}`).then((r) => JSON.parse(r.data.value)).catch(() => ({ ...EMPTY_SIMPLE_PAGE }))
      )
    ).then(([howTo, land]) => {
      setPages({ how_to_invest: howTo, land_plots: land });
    }).finally(() => setLoading(false));
  }, []);

  const savePage = async (key: SimplePageKey) => {
    const page = SIMPLE_PAGES.find((p) => p.key === key)!;
    setSaving(true);
    try {
      await api.put(`/site-config/${page.configKey}`, { value: JSON.stringify(pages[key]) });
    } finally {
      setSaving(false);
    }
  };

  const updateText = (key: SimplePageKey, lang: Lang, value: string) => {
    setPages({ ...pages, [key]: { ...pages[key], text: { ...pages[key].text, [lang]: value } } });
  };

  const updateImage = (key: SimplePageKey, url: string) => {
    setPages({ ...pages, [key]: { ...pages[key], imageUrl: url } });
  };

  const TABS: { key: Tab; label: string }[] = [
    { key: 'opportunities', label: 'Investment Opportunities' },
    { key: 'how_to_invest', label: 'How to Invest' },
    { key: 'land_plots', label: 'Land & Investment Plots' },
    { key: 'projects', label: 'Projects' },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-ink-950">Investment</h1>

      <div className="mt-4 flex flex-wrap gap-2">
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

      <div className="mt-6">
        {tab === 'opportunities' && <ContentEntryManager type={'INVESTMENT_OPPORTUNITY' as any} />}
        {tab === 'projects' && <ContentEntryManager type={'PROJECT' as any} />}

        {(tab === 'how_to_invest' || tab === 'land_plots') && !loading && (
          <div className="space-y-4">
            <div className="rounded-lg border border-coffee-950/10 bg-white p-4">
              <FileUpload
                label="Page image"
                value={pages[tab].imageUrl}
                onChange={(url) => updateImage(tab, url)}
                accept="image/*"
              />
            </div>
            {(['en', 'om', 'am'] as Lang[]).map((lang) => (
              <div key={lang}>
                <label className="block text-sm font-medium text-ink-950 uppercase">{lang}</label>
                <textarea
                  value={pages[tab].text[lang]}
                  onChange={(e) => updateText(tab, lang, e.target.value)}
                  rows={8}
                  className="mt-1 w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm"
                />
              </div>
            ))}
            <button
              onClick={() => savePage(tab)}
              disabled={saving}
              className="rounded-md bg-clay-600 px-4 py-2 text-sm font-semibold text-white hover:bg-clay-500 disabled:opacity-60"
            >
              {saving ? 'Saving…' : 'Save'}
            </button>
          </div>
        )}
        {(tab === 'how_to_invest' || tab === 'land_plots') && loading && (
          <div className="text-sm text-ink-600">Loading…</div>
        )}
      </div>
    </div>
  );
}