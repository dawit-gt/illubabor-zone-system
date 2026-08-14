'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

type ContentImages = {
  yayo?: string;
  sor?: string;
  coffee?: string;
};

type AboutImages = {
  about_overview?: string;
  about_geography?: string;
  about_economy?: string;
  about_people?: string;
};

type HeroText = {
  en: {
    eyebrow: string;
    title: string;
    sub: string;
    cta: string;
  };
  om: {
    eyebrow: string;
    title: string;
    sub: string;
    cta: string;
  };
  am: {
    eyebrow: string;
    title: string;
    sub: string;
    cta: string;
  };
};

export default function AdminHeroImagesPage() {
  const [images, setImages] = useState<string[]>([]);
  const [newUrl, setNewUrl] = useState('');
  const [contentImages, setContentImages] = useState<ContentImages>({});
  const [aboutImages, setAboutImages] = useState<AboutImages>({});
  const [heroText, setHeroText] = useState<HeroText>({
    en: { eyebrow: '', title: '', sub: '', cta: '' },
    om: { eyebrow: '', title: '', sub: '', cta: '' },
    am: { eyebrow: '', title: '', sub: '', cta: '' },
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    Promise.all([
      api.get('/site-config/hero_images'),
      api.get('/site-config/content_images'),
      api.get('/site-config/about_images'),
      api.get('/site-config/hero_text'),
    ])
      .then(([heroRes, contentRes, aboutRes, heroTextRes]) => {
        setImages(JSON.parse(heroRes.data.value));
        setContentImages(JSON.parse(contentRes.data.value));
        setAboutImages(JSON.parse(aboutRes.data.value));
        setHeroText(JSON.parse(heroTextRes.data.value));
      })
      .catch(() => {
        setImages([]);
        setContentImages({});
        setAboutImages({});
      })
      .finally(() => setLoading(false));
  }, []);

  const save = async (next: string[]) => {
    setSaving(true);

    try {
      await api.put('/site-config/hero_images', {
        value: JSON.stringify(next),
      });

      setImages(next);
    } finally {
      setSaving(false);
    }
  };

  const saveContentImages = async (next: ContentImages) => {
    setSaving(true);

    try {
      await api.put('/site-config/content_images', {
        value: JSON.stringify(next),
      });

      setContentImages(next);
    } finally {
      setSaving(false);
    }
  };

  const saveAboutImages = async (next: AboutImages) => {
    setSaving(true);

    try {
      await api.put('/site-config/about_images', {
        value: JSON.stringify(next),
      });

      setAboutImages(next);
    } finally {
      setSaving(false);
    }
  };

  const saveHeroText = async () => {
    setSaving(true);

    try {
      await api.put('/site-config/hero_text', {
        value: JSON.stringify(heroText),
      });
    } finally {
      setSaving(false);
    }
  };

  const addImage = () => {
    if (!newUrl.trim()) return;

    save([...images, newUrl.trim()]);
    setNewUrl('');
  };

  const removeImage = (url: string) => {
    save(images.filter((i) => i !== url));
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="font-display text-2xl font-semibold text-coffee-950">
        Homepage Hero Images
      </h1>

      <p className="mt-1 text-sm text-coffee-600">
        Add image URLs hosted elsewhere, such as Supabase Storage, to rotate
        through the homepage hero.
      </p>

      {loading ? (
        <div className="mt-6 text-sm text-coffee-600">
          Loading…
        </div>
      ) : (
        <>
          {/* HERO IMAGES */}

          <div className="mt-6 flex gap-2">
            <input
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              placeholder="https://..."
              className="flex-1 rounded-md border border-coffee-950/20 px-3 py-2 text-sm"
            />

            <button
              type="button"
              onClick={addImage}
              disabled={saving}
              className="rounded-md bg-clay-600 px-4 py-2 text-sm font-semibold text-white hover:bg-clay-500 disabled:opacity-60"
            >
              Add
            </button>
          </div>

          <div className="mt-6 space-y-3">
            {images.map((url) => (
              <div
                key={url}
                className="flex items-center gap-4 rounded-lg border border-coffee-950/10 bg-white p-3"
              >
                <img
                  src={url}
                  alt=""
                  className="h-16 w-24 rounded object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />

                <p className="flex-1 truncate text-xs text-coffee-600">
                  {url}
                </p>

                <button
                  type="button"
                  onClick={() => removeImage(url)}
                  className="text-sm text-red-600 hover:underline"
                >
                  Remove
                </button>
              </div>
            ))}

            {images.length === 0 && (
              <p className="text-sm text-coffee-600">
                No images added yet.
              </p>
            )}
          </div>

          {/* HERO TEXT */}

          <div className="mt-12 border-t border-coffee-950/10 pt-8">
            <h2 className="font-display text-xl font-semibold text-coffee-950">
              Hero Section Text
            </h2>

            <p className="mt-1 text-sm text-coffee-600">
              Editable per language. Leave blank to use the site's built-in
              default.
            </p>

            <div className="mt-6 space-y-6">
              {(['en', 'om', 'am'] as const).map((lang) => (
                <div
                  key={lang}
                  className="rounded-lg border border-coffee-950/10 bg-white p-4"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-clay-600">
                    {lang}
                  </p>

                  <div className="mt-3 space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-coffee-950">
                        Eyebrow (small label above title)
                      </label>

                      <input
                        value={heroText[lang].eyebrow}
                        onChange={(e) =>
                          setHeroText({
                            ...heroText,
                            [lang]: {
                              ...heroText[lang],
                              eyebrow: e.target.value,
                            },
                          })
                        }
                        className="mt-1 w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-coffee-950">
                        Title
                      </label>

                      <input
                        value={heroText[lang].title}
                        onChange={(e) =>
                          setHeroText({
                            ...heroText,
                            [lang]: {
                              ...heroText[lang],
                              title: e.target.value,
                            },
                          })
                        }
                        className="mt-1 w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-coffee-950">
                        Subtitle
                      </label>

                      <textarea
                        value={heroText[lang].sub}
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
                        className="mt-1 w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-coffee-950">
                        Button text
                      </label>

                      <input
                        value={heroText[lang].cta}
                        onChange={(e) =>
                          setHeroText({
                            ...heroText,
                            [lang]: {
                              ...heroText[lang],
                              cta: e.target.value,
                            },
                          })
                        }
                        className="mt-1 w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm"
                      />
                    </div>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={saveHeroText}
                disabled={saving}
                className="rounded-md bg-clay-600 px-4 py-2 text-sm font-semibold text-white hover:bg-clay-500 disabled:opacity-60"
              >
                {saving ? 'Saving…' : 'Save Hero Text'}
              </button>
            </div>
          </div>

          {/* CONTENT IMAGES */}

          <div className="mt-12 border-t border-coffee-950/10 pt-8">
            <h2 className="font-display text-xl font-semibold text-coffee-950">
              Homepage Content Images
            </h2>

            <p className="mt-1 text-sm text-coffee-600">
              Images shown in the Yayu Biosphere, Sor Falls, and Coffee
              Economy sections.
            </p>

            <div className="mt-6 space-y-4">
              {(['yayo', 'sor', 'coffee'] as const).map((key) => (
                <div
                  key={key}
                  className="rounded-lg border border-coffee-950/10 bg-white p-4"
                >
                  <div className="flex items-center gap-4">
                    <span className="w-20 text-sm font-medium capitalize text-coffee-950">
                      {key}
                    </span>

                    <input
                      value={contentImages[key] ?? ''}
                      onChange={(e) =>
                        setContentImages({
                          ...contentImages,
                          [key]: e.target.value,
                        })
                      }
                      placeholder="https://..."
                      className="flex-1 rounded-md border border-coffee-950/20 px-3 py-2 text-sm"
                    />

                    <button
                      type="button"
                      onClick={() => saveContentImages(contentImages)}
                      disabled={saving}
                      className="rounded-md bg-clay-600 px-3 py-2 text-sm text-white hover:bg-clay-500 disabled:opacity-60"
                    >
                      Save
                    </button>
                  </div>

                  {contentImages[key] && (
                    <div className="mt-4">
                      <img
                        src={contentImages[key]}
                        alt={key}
                        className="h-40 w-full rounded-md object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ABOUT IMAGES */}

          <div className="mt-12 border-t border-coffee-950/10 pt-8">
            <h2 className="font-display text-xl font-semibold text-coffee-950">
              About Page Images
            </h2>

            <p className="mt-1 text-sm text-coffee-600">
              Images shown in each tab of the About page (Overview,
              Geography, Economy, People).
            </p>

            <div className="mt-6 space-y-4">
              {(
                [
                  'about_overview',
                  'about_geography',
                  'about_economy',
                  'about_people',
                ] as const
              ).map((key) => (
                <div
                  key={key}
                  className="rounded-lg border border-coffee-950/10 bg-white p-4"
                >
                  <div className="flex items-center gap-4">
                    <span className="w-32 text-sm font-medium text-coffee-950">
                      {key.replace('about_', '')}
                    </span>

                    <input
                      value={aboutImages[key] ?? ''}
                      onChange={(e) =>
                        setAboutImages({
                          ...aboutImages,
                          [key]: e.target.value,
                        })
                      }
                      placeholder="https://..."
                      className="flex-1 rounded-md border border-coffee-950/20 px-3 py-2 text-sm"
                    />

                    <button
                      type="button"
                      onClick={() => saveAboutImages(aboutImages)}
                      disabled={saving}
                      className="rounded-md bg-clay-600 px-3 py-2 text-sm text-white hover:bg-clay-500 disabled:opacity-60"
                    >
                      Save
                    </button>
                  </div>

                  {aboutImages[key] && (
                    <div className="mt-4">
                      <img
                        src={aboutImages[key]}
                        alt={key}
                        className="h-40 w-full rounded-md object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}