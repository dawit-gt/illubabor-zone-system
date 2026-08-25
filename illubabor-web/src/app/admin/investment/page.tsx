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

const EMPTY_SIMPLE_PAGE: SimplePage = {
  text: { en: '', om: '', am: '' },
  imageUrl: '',
};

const SIMPLE_PAGES: {
  key: SimplePageKey;
  label: string;
  configKey: string;
}[] = [
  {
    key: 'how_to_invest',
    label: 'How to Invest',
    configKey: 'investment_how_to_invest',
  },
  {
    key: 'land_plots',
    label: 'Land & Investment Plots',
    configKey: 'investment_land_plots',
  },
];

type Tab =
  | 'landing'
  | 'opportunities'
  | 'how_to_invest'
  | 'land_plots'
  | 'projects';

export default function AdminInvestmentPage() {
  const [tab, setTab] = useState<Tab>('opportunities');

  const [pages, setPages] = useState<
    Record<SimplePageKey, SimplePage>
  >({
    how_to_invest: { ...EMPTY_SIMPLE_PAGE },
    land_plots: { ...EMPTY_SIMPLE_PAGE },
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [sectors, setSectors] = useState<string[]>([]);
  const [newSector, setNewSector] = useState('');

  const [economicData, setEconomicData] = useState<
    Record<Lang, string>
  >({
    en: '',
    om: '',
    am: '',
  });

  const [incentives, setIncentives] = useState<Record<Lang, string>>({
    en: '',
    om: '',
    am: '',
  });

  const [howToSteps, setHowToSteps] = useState<
    Record<Lang, string>[]
  >([]);

  useEffect(() => {
    Promise.all(
      SIMPLE_PAGES.map((p) =>
        api
          .get(`/site-config/${p.configKey}`)
          .then((r) => JSON.parse(r.data.value))
          .catch(() => ({ ...EMPTY_SIMPLE_PAGE }))
      )
    )
      .then(([howTo, land]) => {
        setPages({
          how_to_invest: howTo,
          land_plots: land,
        });
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    api
      .get('/site-config/investment_priority_sectors')
      .then((r) => setSectors(JSON.parse(r.data.value)))
      .catch(() => setSectors([]));

    api
      .get('/site-config/investment_economic_data')
      .then((r) => setEconomicData(JSON.parse(r.data.value)))
      .catch(() => {});

    api
      .get('/site-config/investment_incentives')
      .then((r) => setIncentives(JSON.parse(r.data.value)))
      .catch(() => {});

    api
      .get('/site-config/investment_how_to_steps')
      .then((r) => setHowToSteps(JSON.parse(r.data.value)))
      .catch(() => setHowToSteps([]));
  }, []);

  const savePage = async (key: SimplePageKey) => {
    const page = SIMPLE_PAGES.find((p) => p.key === key)!;

    setSaving(true);

    try {
      await api.put(`/site-config/${page.configKey}`, {
        value: JSON.stringify(pages[key]),
      });
    } finally {
      setSaving(false);
    }
  };

  const updateText = (
    key: SimplePageKey,
    lang: Lang,
    value: string
  ) => {
    setPages({
      ...pages,
      [key]: {
        ...pages[key],
        text: {
          ...pages[key].text,
          [lang]: value,
        },
      },
    });
  };

  const updateImage = (key: SimplePageKey, url: string) => {
    setPages({
      ...pages,
      [key]: {
        ...pages[key],
        imageUrl: url,
      },
    });
  };

  const saveSectors = async (next: string[]) => {
    await api.put('/site-config/investment_priority_sectors', {
      value: JSON.stringify(next),
    });

    setSectors(next);
  };

  const saveEconomicData = async () => {
    await api.put('/site-config/investment_economic_data', {
      value: JSON.stringify(economicData),
    });
  };

  const saveIncentives = async () => {
    await api.put('/site-config/investment_incentives', {
      value: JSON.stringify(incentives),
    });
  };

  const saveHowToSteps = async () => {
    await api.put('/site-config/investment_how_to_steps', {
      value: JSON.stringify(howToSteps),
    });
  };

  const addStep = () =>
    setHowToSteps([
      ...howToSteps,
      {
        en: '',
        om: '',
        am: '',
      },
    ]);

  const removeStep = (i: number) =>
    setHowToSteps(
      howToSteps.filter((_, idx) => idx !== i)
    );

  const TABS: { key: Tab; label: string }[] = [
    {
      key: 'landing',
      label: 'Landing Page (Sectors/Data/Steps)',
    },
    {
      key: 'opportunities',
      label: 'Investment Opportunities',
    },
    {
      key: 'how_to_invest',
      label: 'How to Invest',
    },
    {
      key: 'land_plots',
      label: 'Land & Investment Plots',
    },
    {
      key: 'projects',
      label: 'Projects',
    },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-ink-950">
        Investment
      </h1>

      <div className="mt-4 flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`rounded-md px-4 py-2 text-sm ${
              tab === t.key
                ? 'bg-clay-600 text-white'
                : 'border border-coffee-950/20'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {tab === 'landing' && (
          <div className="space-y-10">
            {/* Priority Sectors */}
            <div>
              <h3 className="font-display text-lg font-semibold text-ink-950">
                Priority Sectors (pills)
              </h3>

              <div className="mt-3 flex flex-wrap gap-2">
                {sectors.map((s) => (
                  <span
                    key={s}
                    className="flex items-center gap-1 rounded-full bg-canopy-700/10 px-3 py-1.5 text-sm text-canopy-700"
                  >
                    {s}

                    <button
                      onClick={() =>
                        saveSectors(
                          sectors.filter((x) => x !== s)
                        )
                      }
                      className="ml-1 text-canopy-700/60 hover:text-canopy-700"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>

              <div className="mt-3 flex gap-2">
                <input
                  value={newSector}
                  onChange={(e) =>
                    setNewSector(e.target.value)
                  }
                  placeholder="e.g. Agriculture"
                  className="flex-1 rounded-md border border-coffee-950/20 px-3 py-2 text-sm"
                />

                <button
                  onClick={() => {
                    if (newSector.trim()) {
                      saveSectors([
                        ...sectors,
                        newSector.trim(),
                      ]);
                      setNewSector('');
                    }
                  }}
                  className="rounded-md bg-clay-600 px-4 py-2 text-sm font-semibold text-white hover:bg-clay-500"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Economic Data */}
            <div>
              <h3 className="font-display text-lg font-semibold text-ink-950">
                Economic Data
              </h3>

              <div className="mt-3 space-y-3">
                {(['en', 'om', 'am'] as Lang[]).map(
                  (lang) => (
                    <textarea
                      key={lang}
                      placeholder={lang.toUpperCase()}
                      value={economicData[lang]}
                      onChange={(e) =>
                        setEconomicData({
                          ...economicData,
                          [lang]: e.target.value,
                        })
                      }
                      rows={3}
                      className="w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm"
                    />
                  )
                )}

                <button
                  onClick={saveEconomicData}
                  className="rounded-md bg-clay-600 px-4 py-2 text-sm font-semibold text-white hover:bg-clay-500"
                >
                  Save
                </button>
              </div>
            </div>

            {/* Investment Incentives */}
            <div>
              <h3 className="font-display text-lg font-semibold text-ink-950">
                Investment Incentives
              </h3>

              <div className="mt-3 space-y-3">
                {(['en', 'om', 'am'] as Lang[]).map(
                  (lang) => (
                    <textarea
                      key={lang}
                      placeholder={lang.toUpperCase()}
                      value={incentives[lang]}
                      onChange={(e) =>
                        setIncentives({
                          ...incentives,
                          [lang]: e.target.value,
                        })
                      }
                      rows={3}
                      className="w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm"
                    />
                  )
                )}

                <button
                  onClick={saveIncentives}
                  className="rounded-md bg-clay-600 px-4 py-2 text-sm font-semibold text-white hover:bg-clay-500"
                >
                  Save
                </button>
              </div>
            </div>

            {/* How to Invest Steps */}
            <div>
              <h3 className="font-display text-lg font-semibold text-ink-950">
                How to Invest — Steps
              </h3>

              <div className="mt-3 space-y-3">
                {howToSteps.map((step, i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-coffee-950/10 bg-white p-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-ink-600">
                        Step {i + 1}
                      </span>

                      <button
                        onClick={() => removeStep(i)}
                        className="text-xs text-red-600 hover:underline"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="mt-2 grid gap-2 sm:grid-cols-3">
                      {(['en', 'om', 'am'] as Lang[]).map(
                        (lang) => (
                          <input
                            key={lang}
                            placeholder={lang.toUpperCase()}
                            value={step[lang]}
                            onChange={(e) => {
                              const next = [...howToSteps];

                              next[i] = {
                                ...next[i],
                                [lang]: e.target.value,
                              };

                              setHowToSteps(next);
                            }}
                            className="rounded-md border border-coffee-950/20 px-3 py-2 text-sm"
                          />
                        )
                      )}
                    </div>
                  </div>
                ))}

                <div className="flex gap-2">
                  <button
                    onClick={addStep}
                    className="rounded-md border border-coffee-950/20 px-4 py-2 text-sm"
                  >
                    + Add Step
                  </button>

                  <button
                    onClick={saveHowToSteps}
                    className="rounded-md bg-clay-600 px-4 py-2 text-sm font-semibold text-white hover:bg-clay-500"
                  >
                    Save Steps
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === 'opportunities' && (
          <ContentEntryManager
            type={'INVESTMENT_OPPORTUNITY' as any}
          />
        )}

        {tab === 'projects' && (
          <ContentEntryManager
            type={'PROJECT' as any}
          />
        )}

        {(tab === 'how_to_invest' ||
          tab === 'land_plots') &&
          !loading && (
            <div className="space-y-4">
              <div className="rounded-lg border border-coffee-950/10 bg-white p-4">
                <FileUpload
                  label="Page image"
                  value={pages[tab].imageUrl}
                  onChange={(url) =>
                    updateImage(tab, url)
                  }
                  accept="image/*"
                />
              </div>

              {(['en', 'om', 'am'] as Lang[]).map(
                (lang) => (
                  <div key={lang}>
                    <label className="block text-sm font-medium text-ink-950 uppercase">
                      {lang}
                    </label>

                    <textarea
                      value={pages[tab].text[lang]}
                      onChange={(e) =>
                        updateText(
                          tab,
                          lang,
                          e.target.value
                        )
                      }
                      rows={8}
                      className="mt-1 w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm"
                    />
                  </div>
                )
              )}

              <button
                onClick={() => savePage(tab)}
                disabled={saving}
                className="rounded-md bg-clay-600 px-4 py-2 text-sm font-semibold text-white hover:bg-clay-500 disabled:opacity-60"
              >
                {saving ? 'Saving…' : 'Save'}
              </button>
            </div>
          )}

        {(tab === 'how_to_invest' ||
          tab === 'land_plots') &&
          loading && (
            <div className="text-sm text-ink-600">
              Loading…
            </div>
          )}
      </div>
    </div>
  );
}