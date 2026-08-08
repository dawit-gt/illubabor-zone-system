'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

type ContentImages = {
  yayo?: string;
  sor?: string;
  coffee?: string;
};

export default function AdminHeroImagesPage() {
  const [images, setImages] = useState<string[]>([]);
  const [newUrl, setNewUrl] = useState('');
  const [contentImages, setContentImages] = useState<ContentImages>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    Promise.all([
      api.get('/site-config/hero_images'),
      api.get('/site-config/content_images'),
    ])
      .then(([heroRes, contentRes]) => {
        setImages(JSON.parse(heroRes.data.value));
        setContentImages(JSON.parse(contentRes.data.value));
      })
      .catch(() => {
        setImages([]);
        setContentImages({});
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

          <div className="mt-12 border-t border-coffee-950/10 pt-8">
            <h2 className="font-display text-xl font-semibold text-coffee-950">
              Homepage Content Images
            </h2>

            <p className="mt-1 text-sm text-coffee-600">
              Images shown in the Yayu Biosphere, Sor Falls, and Coffee Economy
              sections.
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
        </>
      )}
    </div>
  );
}
