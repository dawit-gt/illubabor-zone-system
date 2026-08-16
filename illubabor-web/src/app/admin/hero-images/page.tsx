'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { FileUpload } from '@/components/file-upload';

type ContentImages = { yayo?: string; sor?: string; coffee?: string };
type AboutImages = { about_overview?: string; about_geography?: string; about_economy?: string; about_people?: string };
type HeroTextLang = { eyebrow: string; title: string; sub: string; cta: string };
type HeroText = { en: HeroTextLang; om: HeroTextLang; am: HeroTextLang };

const EMPTY_HERO_TEXT_LANG: HeroTextLang = { eyebrow: '', title: '', sub: '', cta: '' };

export default function AdminHeroImagesPage() {
  const [images, setImages] = useState<string[]>([]);
  const [contentImages, setContentImages] = useState<ContentImages>({});
  const [aboutImages, setAboutImages] = useState<AboutImages>({});
  const [heroText, setHeroText] = useState<HeroText>({
    en: { ...EMPTY_HERO_TEXT_LANG }, om: { ...EMPTY_HERO_TEXT_LANG }, am: { ...EMPTY_HERO_TEXT_LANG },
  });
  const [mapImageUrl, setMapImageUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    Promise.all([
      api.get('/site-config/hero_images').then((r) => JSON.parse(r.data.value)).catch(() => []),
      api.get('/site-config/content_images').then((r) => JSON.parse(r.data.value)).catch(() => ({})),
      api.get('/site-config/about_images').then((r) => JSON.parse(r.data.value)).catch(() => ({})),
      api.get('/site-config/hero_text').then((r) => JSON.parse(r.data.value)).catch(() => null),
      api.get('/site-config/geography_map_url').then((r) => JSON.parse(r.data.value)).catch(() => ''),
    ]).then(([hero, content, about, text, mapUrl]) => {
      setImages(hero);
      setContentImages(content);
      setAboutImages(about);
      if (text) setHeroText(text);
      setMapImageUrl(mapUrl || '');
    }).finally(() => setLoading(false));
  }, []);

  const saveHeroImages = async (next: string[]) => {
    setSaving(true);
    try {
      await api.put('/site-config/hero_images', { value: JSON.stringify(next) });
      setImages(next);
    } finally {
      setSaving(false);
    }
  };

  const saveContentImages = async (next: ContentImages) => {
    setSaving(true);
    try {
      await api.put('/site-config/content_images', { value: JSON.stringify(next) });
      setContentImages(next);
    } finally {
      setSaving(false);
    }
  };

  const saveAboutImages = async (next: AboutImages) => {
    setSaving(true);
    try {
      await api.put('/site-config/about_images', { value: JSON.stringify(next) });
      setAboutImages(next);
    } finally {
      setSaving(false);
    }
  };

  const saveHeroText = async () => {
    setSaving(true);
    try {
      await api.put('/site-config/hero_text', { value: JSON.stringify(heroText) });
    } finally {
      setSaving(false);
    }
  };

  const saveMapImage = async (url: string) => {
    setSaving(true);
    try {
      await api.put('/site-config/geography_map_url', { value: JSON.stringify(url) });
      setMapImageUrl(url);
    } finally {
      setSaving(false);
    }
  };

  const removeHeroImage = (url: string) => saveHeroImages(images.filter((i) => i !== url));

  if (loading) return <div className="mx-auto max-w-4xl px-4 py-8 text-sm text-ink-600">Loading…</div>;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="font-display text-2xl font-semibold text-ink-950">Homepage Hero</h1>

      <div className="mt-6">
        <h2 className="font-display text-lg font-semibold text-ink-950">Hero Background Images</h2>
        <p className="mt-1 text-sm text-ink-600">Upload photos to rotate through the homepage hero.</p>

        <div className="mt-4 space-y-3">
          {images.map((url) => (
            <div key={url} className="flex items-center gap-4 rounded-lg border border-coffee-950/10 bg-white p-3">
              <img src={url} alt="" className="h-16 w-24 rounded object-cover" onError={(e) => (e.currentTarget.style.display = 'none')} />
              <p className="flex-1 truncate text-xs text-ink-600">{url}</p>
              <button onClick={() => removeHeroImage(url)} className="text-sm text-red-600 hover:underline">Remove</button>
            </div>
          ))}
          <FileUpload
            label="Add a hero image"
            value=""
            onChange={(url) => { if (url) saveHeroImages([...images, url]); }}
            accept="image/*"
          />
        </div>
      </div>

      <div className="mt-12 border-t border-coffee-950/10 pt-8">
        <h2 className="font-display text-xl font-semibold text-ink-950">Hero Section Text</h2>
        <p className="mt-1 text-sm text-ink-600">Editable per language. Leave blank to use the site's built-in default.</p>

        <div className="mt-4 space-y-6">
          {(['en', 'om', 'am'] as const).map((lang) => (
            <div key={lang} className="rounded-lg border border-coffee-950/10 bg-white p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-clay-600">{lang}</p>
              <div className="mt-3 space-y-3">
                <div>
                  <label className="block text-xs font-medium text-ink-950">Eyebrow (small label above title)</label>
                  <input
                    value={heroText[lang].eyebrow}
                    onChange={(e) => setHeroText({ ...heroText, [lang]: { ...heroText[lang], eyebrow: e.target.value } })}
                    className="mt-1 w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-ink-950">Title</label>
                  <input
                    value={heroText[lang].title}
                    onChange={(e) => setHeroText({ ...heroText, [lang]: { ...heroText[lang], title: e.target.value } })}
                    className="mt-1 w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-ink-950">Subtitle</label>
                  <textarea
                    value={heroText[lang].sub}
                    onChange={(e) => setHeroText({ ...heroText, [lang]: { ...heroText[lang], sub: e.target.value } })}
                    rows={2}
                    className="mt-1 w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-ink-950">Button text</label>
                  <input
                    value={heroText[lang].cta}
                    onChange={(e) => setHeroText({ ...heroText, [lang]: { ...heroText[lang], cta: e.target.value } })}
                    className="mt-1 w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm"
                  />
                </div>
              </div>
            </div>
          ))}
          <button
            onClick={saveHeroText}
            disabled={saving}
            className="rounded-md bg-clay-600 px-4 py-2 text-sm font-semibold text-white hover:bg-clay-500 disabled:opacity-60"
          >
            {saving ? 'Saving…' : 'Save Hero Text'}
          </button>
        </div>
      </div>

      <div className="mt-12 border-t border-coffee-950/10 pt-8">
        <h2 className="font-display text-xl font-semibold text-ink-950">Homepage Content Images</h2>
        <p className="mt-1 text-sm text-ink-600">Images shown in the Yayu Biosphere, Sor Falls, and Coffee Economy sections.</p>

        <div className="mt-6 space-y-4">
          {(['yayo', 'sor', 'coffee'] as const).map((key) => (
            <div key={key} className="rounded-lg border border-coffee-950/10 bg-white p-4">
              <FileUpload
                label={key.charAt(0).toUpperCase() + key.slice(1)}
                value={contentImages[key] ?? ''}
                onChange={(url) => saveContentImages({ ...contentImages, [key]: url })}
                accept="image/*"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 border-t border-coffee-950/10 pt-8">
        <h2 className="font-display text-xl font-semibold text-ink-950">About Page Images</h2>
        <p className="mt-1 text-sm text-ink-600">Images shown in each tab of the About page (Overview, Geography, Economy, People).</p>

        <div className="mt-6 space-y-4">
          {(['about_overview', 'about_geography', 'about_economy', 'about_people'] as const).map((key) => (
            <div key={key} className="rounded-lg border border-coffee-950/10 bg-white p-4">
              <FileUpload
                label={key.replace('about_', '')}
                value={aboutImages[key] ?? ''}
                onChange={(url) => saveAboutImages({ ...aboutImages, [key]: url })}
                accept="image/*"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 border-t border-coffee-950/10 pt-8">
        <h2 className="font-display text-xl font-semibold text-ink-950">Geography Tab — Zone Map</h2>
        <p className="mt-1 text-sm text-ink-600">The map image shown on the About page's Geography tab.</p>

        <div className="mt-4 rounded-lg border border-coffee-950/10 bg-white p-4">
          <FileUpload label="Zone map" value={mapImageUrl} onChange={saveMapImage} accept="image/*" />
        </div>
      </div>
    </div>
  );
}