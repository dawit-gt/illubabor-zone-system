'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { FileUpload } from '@/components/file-upload';

type Lang = 'en' | 'om' | 'am';

interface Sections {
  stats: boolean;
  welcome: boolean;
  departments: boolean;
  heritage: boolean;
  economy: boolean;
  extraContent: boolean;
}

const SECTION_DEFAULTS: Sections = {
  stats: true,
  welcome: true,
  departments: true,
  heritage: true,
  economy: true,
  extraContent: true,
};

const SECTION_LABELS: Record<keyof Sections, string> = {
  stats: 'Stats strip (woredas / population / area / departments)',
  welcome: 'Administrator welcome message + quick statistics',
  departments: 'Departments grid',
  heritage: 'Yayu Biosphere & Sor Falls cards',
  economy: 'Coffee Economy section',
  extraContent: 'Extra content blocks (Add Content section)',
};

interface ExtraSection {
  id: string;
  imageUrl: string;
  title: Record<Lang, string>;
  body: Record<Lang, string>;
}

interface HeroText {
  eyebrow: string;
  title: string;
  sub: string;
  cta: string;
}

interface ContentText {
  title: string;
  body: string;
}

interface Stats {
  populationMale: number;
  populationFemale: number;
  population: number;
  areaKm2: number;
  ruralKebeles: number;
  urbanKebeles: number;
  elevationMin: number;
  elevationMax: number;
}

const EMPTY_HERO_TEXT: Record<Lang, HeroText> = {
  en: {
    eyebrow: '',
    title: '',
    sub: '',
    cta: '',
  },
  om: {
    eyebrow: '',
    title: '',
    sub: '',
    cta: '',
  },
  am: {
    eyebrow: '',
    title: '',
    sub: '',
    cta: '',
  },
};

const EMPTY_CONTENT_TEXT: Record<
  'yayo' | 'sor' | 'coffee',
  Record<Lang, ContentText>
> = {
  yayo: {
    en: { title: '', body: '' },
    om: { title: '', body: '' },
    am: { title: '', body: '' },
  },
  sor: {
    en: { title: '', body: '' },
    om: { title: '', body: '' },
    am: { title: '', body: '' },
  },
  coffee: {
    en: { title: '', body: '' },
    om: { title: '', body: '' },
    am: { title: '', body: '' },
  },
};

const EMPTY_STATS: Stats = {
  populationMale: 0,
  populationFemale: 0,
  population: 0,
  areaKm2: 0,
  ruralKebeles: 0,
  urbanKebeles: 0,
  elevationMin: 0,
  elevationMax: 0,
};

export default function AdminHomePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [heroImages, setHeroImages] = useState<string[]>([]);
  const [heroText, setHeroText] =
    useState<Record<Lang, HeroText>>(EMPTY_HERO_TEXT);

  const [welcomeMessage, setWelcomeMessage] =
    useState<Record<Lang, string>>({
      en: '',
      om: '',
      am: '',
    });

  const [stats, setStats] = useState<Stats>(EMPTY_STATS);
  const [woredaCount, setWoredaCount] = useState<number | null>(null);

  const [contentImages, setContentImages] = useState<{
    yayo: string;
    sor: string;
    coffee: string;
  }>({
    yayo: '',
    sor: '',
    coffee: '',
  });

  const [contentText, setContentText] =
    useState(EMPTY_CONTENT_TEXT);

  const [sections, setSections] =
    useState<Sections>(SECTION_DEFAULTS);

  const [extraSections, setExtraSections] =
    useState<ExtraSection[]>([]);

  const [editingExtra, setEditingExtra] =
    useState<ExtraSection | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);

      try {
        const [
          hImg,
          hTxt,
          cImg,
          cTxt,
          sect,
          welcome,
          zoneRes,
          extra,
        ] = await Promise.all([
          api
            .get('/site-config/hero_images')
            .then((r) => JSON.parse(r.data.value))
            .catch(() => []),

          api
            .get('/site-config/hero_text')
            .then((r) => JSON.parse(r.data.value))
            .catch(() => EMPTY_HERO_TEXT),

          api
            .get('/site-config/content_images')
            .then((r) => JSON.parse(r.data.value))
            .catch(
              () => ({
                yayo: '',
                sor: '',
                coffee: '',
              })
            ),

          api
            .get('/site-config/content_sections_text')
            .then((r) => JSON.parse(r.data.value))
            .catch(() => EMPTY_CONTENT_TEXT),

          api
            .get('/site-config/homepage_sections')
            .then((r) => JSON.parse(r.data.value))
            .catch(() => SECTION_DEFAULTS),

          api
            .get('/site-config/admin_welcome_message')
            .then((r) => JSON.parse(r.data.value))
            .catch(
              () => ({
                en: '',
                om: '',
                am: '',
              })
            ),

          api
            .get('/zones/current')
            .catch(() => ({ data: null })),

          api
            .get('/site-config/homepage_extra_sections')
            .then((r) => JSON.parse(r.data.value))
            .catch(() => []),
        ]);

        setHeroImages(Array.isArray(hImg) ? hImg : []);

        setHeroText({
          ...EMPTY_HERO_TEXT,
          ...(hTxt || {}),
        });

        setContentImages({
          yayo: cImg?.yayo ?? '',
          sor: cImg?.sor ?? '',
          coffee: cImg?.coffee ?? '',
        });

        setContentText({
          ...EMPTY_CONTENT_TEXT,
          ...(cTxt || {}),
        });

        setSections({
          ...SECTION_DEFAULTS,
          ...(sect || {}),
        });

        setWelcomeMessage({
          en: welcome?.en ?? '',
          om: welcome?.om ?? '',
          am: welcome?.am ?? '',
        });

        if (zoneRes?.data) {
          const zone = zoneRes.data;

          setWoredaCount(
            zone?._count?.woredas ??
              zone?.woredas?.length ??
              null
          );

          setStats({
            populationMale: Number(
              zone.populationMale ?? 0
            ),
            populationFemale: Number(
              zone.populationFemale ?? 0
            ),
            population: Number(
              zone.population ?? 0
            ),
            areaKm2: Number(
              zone.areaKm2 ?? 0
            ),
            ruralKebeles: Number(
              zone.ruralKebeles ?? 0
            ),
            urbanKebeles: Number(
              zone.urbanKebeles ?? 0
            ),
            elevationMin: Number(
              zone.elevationMin ?? 0
            ),
            elevationMax: Number(
              zone.elevationMax ?? 0
            ),
          });
        }

        setExtraSections(
          Array.isArray(extra) ? extra : []
        );
      } catch (error) {
        console.error(
          'Failed to load homepage configuration:',
          error
        );
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const saveConfig = async (
    key: string,
    value: unknown
  ) => {
    setSaving(true);

    try {
      await api.put(`/site-config/${key}`, {
        value: JSON.stringify(value),
      });
    } catch (error) {
      console.error(
        `Failed to save ${key}:`,
        error
      );

      alert('Failed to save changes.');
    } finally {
      setSaving(false);
    }
  };

  const saveHeroImages = async (
    next: string[]
  ) => {
    await saveConfig('hero_images', next);
    setHeroImages(next);
  };

  const saveHeroText = async () => {
    await saveConfig('hero_text', heroText);
  };

  const saveWelcomeMessage = async () => {
    await saveConfig(
      'welcome_message',
      welcomeMessage
    );
  };

  const saveStats = async () => {
    await saveConfig('homepage_stats', stats);
  };

  const saveContentImages = async (
    next: {
      yayo: string;
      sor: string;
      coffee: string;
    }
  ) => {
    await saveConfig(
      'content_images',
      next
    );

    setContentImages(next);
  };

  const saveContentText = async () => {
    await saveConfig(
      'content_sections_text',
      contentText
    );
  };

  const saveSections = async (
    next: Sections
  ) => {
    await saveConfig(
      'homepage_sections',
      next
    );

    setSections(next);
  };

  const saveExtraSections = async (
    next: ExtraSection[]
  ) => {
    setSaving(true);

    try {
      await api.put(
        '/site-config/homepage_extra_sections',
        {
          value: JSON.stringify(next),
        }
      );

      setExtraSections(next);
    } catch (error) {
      console.error(
        'Failed to save extra sections:',
        error
      );

      alert('Failed to save content block.');
    } finally {
      setSaving(false);
    }
  };

  const startNewExtra = () => {
    setEditingExtra({
      id: crypto.randomUUID(),
      imageUrl: '',
      title: {
        en: '',
        om: '',
        am: '',
      },
      body: {
        en: '',
        om: '',
        am: '',
      },
    });
  };

  const saveEditingExtra = () => {
    if (!editingExtra) return;

    const exists = extraSections.some(
      (s) => s.id === editingExtra.id
    );

    const next = exists
      ? extraSections.map((s) =>
          s.id === editingExtra.id
            ? editingExtra
            : s
        )
      : [
          ...extraSections,
          editingExtra,
        ];

    saveExtraSections(next);
    setEditingExtra(null);
  };

  const removeExtra = (id: string) => {
    if (
      !confirm(
        'Delete this content block?'
      )
    ) {
      return;
    }

    saveExtraSections(
      extraSections.filter(
        (s) => s.id !== id
      )
    );
  };

  if (loading) {
    return (
      <div className="text-sm text-ink-600">
        Loading…
      </div>
    );
  }

  return (
    <div className="space-y-14">
      <h1 className="font-display text-2xl font-semibold text-ink-950">
        Home Page
      </h1>

      {/* =====================================================
          HERO
      ====================================================== */}
      <section>
        <h2 className="font-display text-xl font-semibold text-ink-950">
          Hero
        </h2>

        <h3 className="mt-4 text-sm font-semibold text-clay-600">
          Background Images
        </h3>

        <div className="mt-3 space-y-3">
          {heroImages.map((url) => (
            <div
              key={url}
              className="flex items-center gap-4 rounded-lg border border-coffee-950/10 bg-white p-3"
            >
              <img
                src={url}
                alt=""
                className="h-16 w-24 rounded object-cover"
                onError={(e) => {
                  e.currentTarget.style.display =
                    'none';
                }}
              />

              <p className="flex-1 truncate text-xs text-ink-600">
                {url}
              </p>

              <button
                onClick={() =>
                  saveHeroImages(
                    heroImages.filter(
                      (i) => i !== url
                    )
                  )
                }
                className="text-sm text-red-600 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}

          <FileUpload
            label="Add a hero image"
            value=""
            onChange={(url) => {
              if (url) {
                saveHeroImages([
                  ...heroImages,
                  url,
                ]);
              }
            }}
            accept="image/*"
          />
        </div>

        <h3 className="mt-8 text-sm font-semibold text-clay-600">
          Section Text
        </h3>

        <div className="mt-3 space-y-4">
          {(
            ['en', 'om', 'am'] as Lang[]
          ).map((lang) => (
            <div
              key={lang}
              className="rounded-lg border border-coffee-950/10 bg-white p-4"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-600">
                {lang}
              </p>

              <div className="mt-3 space-y-3">
                <input
                  placeholder="Eyebrow"
                  value={
                    heroText[lang].eyebrow
                  }
                  onChange={(e) =>
                    setHeroText({
                      ...heroText,
                      [lang]: {
                        ...heroText[lang],
                        eyebrow:
                          e.target.value,
                      },
                    })
                  }
                  className="w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm"
                />

                <input
                  placeholder="Title"
                  value={
                    heroText[lang].title
                  }
                  onChange={(e) =>
                    setHeroText({
                      ...heroText,
                      [lang]: {
                        ...heroText[lang],
                        title:
                          e.target.value,
                      },
                    })
                  }
                  className="w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm"
                />

                <textarea
                  placeholder="Subtitle"
                  value={
                    heroText[lang].sub
                  }
                  onChange={(e) =>
                    setHeroText({
                      ...heroText,
                      [lang]: {
                        ...heroText[lang],
                        sub: e.target.value,
                      },
                    })
                  }
                  rows={2}
                  className="w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm"
                />

                <input
                  placeholder="Button text"
                  value={
                    heroText[lang].cta
                  }
                  onChange={(e) =>
                    setHeroText({
                      ...heroText,
                      [lang]: {
                        ...heroText[lang],
                        cta: e.target.value,
                      },
                    })
                  }
                  className="w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm"
                />
              </div>
            </div>
          ))}

          <button
            onClick={saveHeroText}
            disabled={saving}
            className="rounded-md bg-clay-600 px-4 py-2 text-sm font-semibold text-white hover:bg-clay-500 disabled:opacity-60"
          >
            {saving
              ? 'Saving…'
              : 'Save Hero Text'}
          </button>
        </div>
      </section>

      {/* =====================================================
          ADMINISTRATOR WELCOME
      ====================================================== */}
      {sections.welcome && (
        <section className="border-t border-coffee-950/10 pt-10">
          <h2 className="font-display text-xl font-semibold text-ink-950">
            Administrator Welcome Message
          </h2>

          <div className="mt-4 space-y-4">
            {(
              ['en', 'om', 'am'] as Lang[]
            ).map((lang) => (
              <div key={lang}>
                <label className="block text-sm font-medium uppercase text-ink-950">
                  {lang}
                </label>

                <textarea
                  value={
                    welcomeMessage[lang]
                  }
                  onChange={(e) =>
                    setWelcomeMessage({
                      ...welcomeMessage,
                      [lang]:
                        e.target.value,
                    })
                  }
                  rows={4}
                  className="mt-1 w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm"
                />
              </div>
            ))}

            <button
              onClick={
                saveWelcomeMessage
              }
              disabled={saving}
              className="rounded-md bg-clay-600 px-4 py-2 text-sm font-semibold text-white hover:bg-clay-500 disabled:opacity-60"
            >
              {saving
                ? 'Saving…'
                : 'Save Message'}
            </button>
          </div>
        </section>
      )}

      {/* =====================================================
          QUICK STATISTICS
      ====================================================== */}
      {sections.stats && (
        <section className="border-t border-coffee-950/10 pt-10">
          <h2 className="font-display text-xl font-semibold text-ink-950">
            Quick Statistics
          </h2>

          <p className="mt-1 text-sm text-ink-600">
            Woreda count (
            {woredaCount ?? '—'}) comes
            from actual records in Woredas —
            add/remove there.
          </p>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {[
              [
                'Population — Male',
                'populationMale',
              ],
              [
                'Population — Female',
                'populationFemale',
              ],
              [
                'Population — Total',
                'population',
              ],
              [
                'Land area (km²)',
                'areaKm2',
              ],
              [
                'Rural kebeles',
                'ruralKebeles',
              ],
              [
                'Urban kebeles',
                'urbanKebeles',
              ],
              [
                'Elevation — Min (m)',
                'elevationMin',
              ],
              [
                'Elevation — Max (m)',
                'elevationMax',
              ],
            ].map(([label, key]) => (
              <div key={key}>
                <label className="block text-sm font-medium text-ink-950">
                  {label}
                </label>

                <input
                  type="number"
                  value={
                    stats[
                      key as keyof Stats
                    ] ?? ''
                  }
                  onChange={(e) =>
                    setStats({
                      ...stats,
                      [key]:
                        Number(
                          e.target.value
                        ),
                    })
                  }
                  className="mt-1 w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm"
                />
              </div>
            ))}
          </div>

          <button
            onClick={saveStats}
            disabled={saving}
            className="mt-4 rounded-md bg-clay-600 px-4 py-2 text-sm font-semibold text-white hover:bg-clay-500 disabled:opacity-60"
          >
            {saving
              ? 'Saving…'
              : 'Save Statistics'}
          </button>
        </section>
      )}

      {/* =====================================================
          HOMEPAGE CONTENT IMAGES
      ====================================================== */}
      <section className="border-t border-coffee-950/10 pt-10">
        <h2 className="font-display text-xl font-semibold text-ink-950">
          Homepage Content Images
        </h2>

        <p className="mt-1 text-sm text-ink-600">
          Yayu Biosphere, Sor Falls, and
          Coffee Economy — each image plus
          its editable text per language.
        </p>

        <div className="mt-6 space-y-8">
          {(
            ['yayo', 'sor', 'coffee'] as const
          ).map((key) => (
            <div
              key={key}
              className="rounded-lg border border-coffee-950/10 bg-white p-4"
            >
              <p className="text-sm font-semibold capitalize text-ink-950">
                {key}
              </p>

              <div className="mt-3">
                <FileUpload
                  value={
                    contentImages[key] ??
                    ''
                  }
                  onChange={(url) =>
                    saveContentImages({
                      ...contentImages,
                      [key]: url,
                    })
                  }
                  accept="image/*"
                />
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {(
                  ['en', 'om', 'am'] as Lang[]
                ).map((lang) => (
                  <div key={lang}>
                    <p className="text-xs font-semibold uppercase text-ink-600">
                      {lang}
                    </p>

                    <input
                      placeholder="Title"
                      value={
                        contentText[key][
                          lang
                        ].title
                      }
                      onChange={(e) =>
                        setContentText({
                          ...contentText,
                          [key]: {
                            ...contentText[
                              key
                            ],
                            [lang]: {
                              ...contentText[
                                key
                              ][lang],
                              title:
                                e.target
                                  .value,
                            },
                          },
                        })
                      }
                      className="mt-1 w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm"
                    />

                    <textarea
                      placeholder="Body text"
                      value={
                        contentText[key][
                          lang
                        ].body
                      }
                      onChange={(e) =>
                        setContentText({
                          ...contentText,
                          [key]: {
                            ...contentText[
                              key
                            ],
                            [lang]: {
                              ...contentText[
                                key
                              ][lang],
                              body:
                                e.target
                                  .value,
                            },
                          },
                        })
                      }
                      rows={4}
                      className="mt-2 w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}

          <button
            onClick={saveContentText}
            disabled={saving}
            className="rounded-md bg-clay-600 px-4 py-2 text-sm font-semibold text-white hover:bg-clay-500 disabled:opacity-60"
          >
            {saving
              ? 'Saving…'
              : 'Save Content Text'}
          </button>
        </div>
      </section>

      {/* =====================================================
          ADD CONTENT
      ====================================================== */}
      {sections.extraContent && (
        <section className="border-t border-coffee-950/10 pt-10">
          <h2 className="font-display text-xl font-semibold text-ink-950">
            Add Content
          </h2>

          <p className="mt-1 text-sm text-ink-600">
            Extra homepage blocks — each
            with one image and text per
            language. Shown below the Content
            Images section, in order.
          </p>

          {!editingExtra && (
            <button
              onClick={startNewExtra}
              className="mt-4 rounded-md bg-clay-600 px-4 py-2 text-sm font-semibold text-white hover:bg-clay-500"
            >
              + New Block
            </button>
          )}

          {editingExtra && (
            <div className="mt-4 rounded-lg border border-coffee-950/10 bg-white p-4">
              <FileUpload
                label="Image"
                value={
                  editingExtra.imageUrl
                }
                onChange={(url) =>
                  setEditingExtra({
                    ...editingExtra,
                    imageUrl: url,
                  })
                }
                accept="image/*"
              />

              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {(
                  ['en', 'om', 'am'] as Lang[]
                ).map((lang) => (
                  <div key={lang}>
                    <p className="text-xs font-semibold uppercase text-ink-600">
                      {lang}
                    </p>

                    <input
                      placeholder="Title"
                      value={
                        editingExtra
                          .title[lang]
                      }
                      onChange={(e) =>
                        setEditingExtra({
                          ...editingExtra,
                          title: {
                            ...editingExtra.title,
                            [lang]:
                              e.target
                                .value,
                          },
                        })
                      }
                      className="mt-1 w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm"
                    />

                    <textarea
                      placeholder="Body text"
                      value={
                        editingExtra
                          .body[lang]
                      }
                      onChange={(e) =>
                        setEditingExtra({
                          ...editingExtra,
                          body: {
                            ...editingExtra.body,
                            [lang]:
                              e.target
                                .value,
                          },
                        })
                      }
                      rows={4}
                      className="mt-2 w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm"
                    />
                  </div>
                ))}
              </div>

              <div className="mt-4 flex gap-3">
                <button
                  onClick={
                    saveEditingExtra
                  }
                  disabled={saving}
                  className="rounded-md bg-clay-600 px-4 py-2 text-sm font-semibold text-white hover:bg-clay-500 disabled:opacity-60"
                >
                  {saving
                    ? 'Saving…'
                    : 'Save Block'}
                </button>

                <button
                  onClick={() =>
                    setEditingExtra(null)
                  }
                  disabled={saving}
                  className="rounded-md border border-coffee-950/20 px-4 py-2 text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div className="mt-6 divide-y divide-coffee-950/10 rounded-lg border border-coffee-950/10 bg-white">
            {extraSections.map((s) => (
              <div
                key={s.id}
                className="flex items-center justify-between px-5 py-3"
              >
                <div className="flex items-center gap-4">
                  {s.imageUrl ? (
                    <img
                      src={s.imageUrl}
                      alt=""
                      className="h-14 w-20 rounded object-cover"
                    />
                  ) : (
                    <div className="flex h-14 w-20 items-center justify-center rounded bg-coffee-950/5 text-xs text-ink-600">
                      No image
                    </div>
                  )}

                  <p className="font-medium text-ink-950">
                    {s.title.en ||
                      s.title.om ||
                      s.title.am ||
                      '(untitled)'}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      setEditingExtra(s)
                    }
                    className="text-sm text-clay-600 hover:underline"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      removeExtra(s.id)
                    }
                    className="text-sm text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}

            {extraSections.length === 0 && (
              <p className="px-5 py-4 text-sm text-ink-600">
                No content blocks yet.
              </p>
            )}
          </div>
        </section>
      )}

      {/* =====================================================
          SECTION TOGGLES
      ====================================================== */}
      <section className="border-t border-coffee-950/10 pt-10">
        <h2 className="font-display text-xl font-semibold text-ink-950">
          Homepage Sections
        </h2>

        <p className="mt-1 text-sm text-ink-600">
          Turn sections on or off. The hero
          stays above these always.
        </p>

        <div className="mt-4 divide-y divide-coffee-950/10 rounded-lg border border-coffee-950/10 bg-white">
          {(
            Object.keys(
              SECTION_LABELS
            ) as (keyof Sections)[]
          ).map((key) => (
            <div
              key={key}
              className="flex items-center justify-between px-5 py-4"
            >
              <span className="text-sm text-ink-950">
                {SECTION_LABELS[key]}
              </span>

              <button
                onClick={() =>
                  saveSections({
                    ...sections,
                    [key]:
                      !sections[key],
                  })
                }
                disabled={saving}
                className={`relative h-6 w-11 rounded-full transition-colors ${
                  sections[key]
                    ? 'bg-clay-600'
                    : 'bg-coffee-950/20'
                }`}
              >
                <span
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                    sections[key]
                      ? 'translate-x-5'
                      : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}