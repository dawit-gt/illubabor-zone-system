'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { FileUpload } from '@/components/file-upload';

type Lang = 'en' | 'om' | 'am';
type HeroTextLang = { eyebrow: string; title: string; sub: string; cta: string };
type ContentSection = { title: string; body: string };
type ContentSectionsText = Record<'yayo' | 'sor' | 'coffee', Record<Lang, ContentSection>>;

const EMPTY_HERO_LANG: HeroTextLang = { eyebrow: '', title: '', sub: '', cta: '' };
const EMPTY_SECTION: Record<Lang, ContentSection> = {
  en: { title: '', body: '' }, om: { title: '', body: '' }, am: { title: '', body: '' },
};

interface Sections {
  stats: boolean; welcome: boolean; departments: boolean; heritage: boolean; economy: boolean; people: boolean;
}
const SECTION_DEFAULTS: Sections = { stats: true, welcome: true, departments: true, heritage: true, economy: true, people: true };
const SECTION_LABELS: Record<keyof Sections, string> = {
  stats: 'Stats strip (woredas / population / area / departments)',
  welcome: 'Administrator welcome message + quick statistics',
  departments: 'Departments grid',
  heritage: 'Yayu Biosphere & Sor Falls cards',
  economy: 'Coffee Economy section',
  people: 'People and Culture section',
};

export default function AdminHomePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [heroImages, setHeroImages] = useState<string[]>([]);
  const [heroText, setHeroText] = useState<Record<Lang, HeroTextLang>>({ en: { ...EMPTY_HERO_LANG }, om: { ...EMPTY_HERO_LANG }, am: { ...EMPTY_HERO_LANG } });
  const [contentImages, setContentImages] = useState<{ yayo?: string; sor?: string; coffee?: string }>({});
  const [contentText, setContentText] = useState<ContentSectionsText>({ yayo: { ...EMPTY_SECTION }, sor: { ...EMPTY_SECTION }, coffee: { ...EMPTY_SECTION } });
  const [sections, setSections] = useState<Sections>(SECTION_DEFAULTS);
  const [welcomeMessage, setWelcomeMessage] = useState<Record<Lang, string>>({ en: '', om: '', am: '' });
  const [stats, setStats] = useState<any>({});
  const [woredaCount, setWoredaCount] = useState<number | null>(null);

  useEffect(() => {
    Promise.all([
      api.get('/site-config/hero_images').then((r) => JSON.parse(r.data.value)).catch(() => []),
      api.get('/site-config/hero_text').then((r) => JSON.parse(r.data.value)).catch(() => null),
      api.get('/site-config/content_images').then((r) => JSON.parse(r.data.value)).catch(() => ({})),
      api.get('/site-config/content_sections_text').then((r) => JSON.parse(r.data.value)).catch(() => null),
      api.get('/site-config/homepage_sections').then((r) => ({ ...SECTION_DEFAULTS, ...JSON.parse(r.data.value) })).catch(() => SECTION_DEFAULTS),
      api.get('/site-config/admin_welcome_message').then((r) => JSON.parse(r.data.value)).catch(() => ({ en: '', om: '', am: '' })),
      api.get('/zones/current'),
    ]).then(([hImg, hTxt, cImg, cTxt, sect, welcome, zoneRes]) => {
      setHeroImages(hImg);
      if (hTxt) setHeroText(hTxt);
      setContentImages(cImg);
      if (cTxt) setContentText(cTxt);
      setSections(sect);
      setWelcomeMessage(welcome);
      setStats({
        population: zoneRes.data.population, populationMale: zoneRes.data.populationMale, populationFemale: zoneRes.data.populationFemale,
        areaKm2: zoneRes.data.areaKm2, elevationMin: zoneRes.data.elevationMin, elevationMax: zoneRes.data.elevationMax,
        urbanKebeles: zoneRes.data.urbanKebeles, ruralKebeles: zoneRes.data.ruralKebeles,
      });
      setWoredaCount(zoneRes.data._count?.woredas ?? null);
    }).finally(() => setLoading(false));
  }, []);

  const saveHeroImages = async (next: string[]) => {
    setSaving(true);
    try { await api.put('/site-config/hero_images', { value: JSON.stringify(next) }); setHeroImages(next); }
    finally { setSaving(false); }
  };
  const saveHeroText = async () => {
    setSaving(true);
    try { await api.put('/site-config/hero_text', { value: JSON.stringify(heroText) }); }
    finally { setSaving(false); }
  };
  const saveContentImages = async (next: typeof contentImages) => {
    setSaving(true);
    try { await api.put('/site-config/content_images', { value: JSON.stringify(next) }); setContentImages(next); }
    finally { setSaving(false); }
  };
  const saveContentText = async () => {
    setSaving(true);
    try { await api.put('/site-config/content_sections_text', { value: JSON.stringify(contentText) }); }
    finally { setSaving(false); }
  };
  const saveSections = async (next: Sections) => {
    setSaving(true);
    try { await api.put('/site-config/homepage_sections', { value: JSON.stringify(next) }); setSections(next); }
    finally { setSaving(false); }
  };
  const saveWelcomeMessage = async () => {
    setSaving(true);
    try { await api.put('/site-config/admin_welcome_message', { value: JSON.stringify(welcomeMessage) }); }
    finally { setSaving(false); }
  };
  const saveStats = async () => {
    setSaving(true);
    try { await api.patch('/zones/current', stats); }
    finally { setSaving(false); }
  };

  if (loading) return <div className="text-sm text-ink-600">Loading…</div>;

  return (
    <div className="space-y-14">
      <h1 className="font-display text-2xl font-semibold text-ink-950">Home Page</h1>

      {/* --- Hero --- */}
      <section>
        <h2 className="font-display text-xl font-semibold text-ink-950">Hero</h2>

        <h3 className="mt-4 text-sm font-semibold text-clay-600">Background Images</h3>
        <div className="mt-3 space-y-3">
          {heroImages.map((url) => (
            <div key={url} className="flex items-center gap-4 rounded-lg border border-coffee-950/10 bg-white p-3">
              <img src={url} alt="" className="h-16 w-24 rounded object-cover" onError={(e) => (e.currentTarget.style.display = 'none')} />
              <p className="flex-1 truncate text-xs text-ink-600">{url}</p>
              <button onClick={() => saveHeroImages(heroImages.filter((i) => i !== url))} className="text-sm text-red-600 hover:underline">Remove</button>
            </div>
          ))}
          <FileUpload label="Add a hero image" value="" onChange={(url) => { if (url) saveHeroImages([...heroImages, url]); }} accept="image/*" />
        </div>

        <h3 className="mt-8 text-sm font-semibold text-clay-600">Section Text</h3>
        <div className="mt-3 space-y-4">
          {(['en', 'om', 'am'] as Lang[]).map((lang) => (
            <div key={lang} className="rounded-lg border border-coffee-950/10 bg-white p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-600">{lang}</p>
              <div className="mt-3 space-y-3">
                <input placeholder="Eyebrow" value={heroText[lang].eyebrow} onChange={(e) => setHeroText({ ...heroText, [lang]: { ...heroText[lang], eyebrow: e.target.value } })} className="w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm" />
                <input placeholder="Title" value={heroText[lang].title} onChange={(e) => setHeroText({ ...heroText, [lang]: { ...heroText[lang], title: e.target.value } })} className="w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm" />
                <textarea placeholder="Subtitle" value={heroText[lang].sub} onChange={(e) => setHeroText({ ...heroText, [lang]: { ...heroText[lang], sub: e.target.value } })} rows={2} className="w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm" />
                <input placeholder="Button text" value={heroText[lang].cta} onChange={(e) => setHeroText({ ...heroText, [lang]: { ...heroText[lang], cta: e.target.value } })} className="w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm" />
              </div>
            </div>
          ))}
          <button onClick={saveHeroText} disabled={saving} className="rounded-md bg-clay-600 px-4 py-2 text-sm font-semibold text-white hover:bg-clay-500 disabled:opacity-60">
            {saving ? 'Saving…' : 'Save Hero Text'}
          </button>
        </div>
      </section>

      {/* --- Content Images + Text --- */}
      <section className="border-t border-coffee-950/10 pt-10">
        <h2 className="font-display text-xl font-semibold text-ink-950">Homepage Content Images</h2>
        <p className="mt-1 text-sm text-ink-600">Yayu Biosphere, Sor Falls, and Coffee Economy — each image plus its editable text per language.</p>

        <div className="mt-6 space-y-8">
          {(['yayo', 'sor', 'coffee'] as const).map((key) => (
            <div key={key} className="rounded-lg border border-coffee-950/10 bg-white p-4">
              <p className="text-sm font-semibold capitalize text-ink-950">{key}</p>
              <div className="mt-3">
                <FileUpload value={contentImages[key] ?? ''} onChange={(url) => saveContentImages({ ...contentImages, [key]: url })} accept="image/*" />
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {(['en', 'om', 'am'] as Lang[]).map((lang) => (
                  <div key={lang}>
                    <p className="text-xs font-semibold uppercase text-ink-600">{lang}</p>
                    <input
                      placeholder="Title"
                      value={contentText[key][lang].title}
                      onChange={(e) => setContentText({ ...contentText, [key]: { ...contentText[key], [lang]: { ...contentText[key][lang], title: e.target.value } } })}
                      className="mt-1 w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm"
                    />
                    <textarea
                      placeholder="Body text"
                      value={contentText[key][lang].body}
                      onChange={(e) => setContentText({ ...contentText, [key]: { ...contentText[key], [lang]: { ...contentText[key][lang], body: e.target.value } } })}
                      rows={4}
                      className="mt-2 w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
          <button onClick={saveContentText} disabled={saving} className="rounded-md bg-clay-600 px-4 py-2 text-sm font-semibold text-white hover:bg-clay-500 disabled:opacity-60">
            {saving ? 'Saving…' : 'Save Content Text'}
          </button>
        </div>
      </section>

      {/* --- Section Toggles --- */}
      <section className="border-t border-coffee-950/10 pt-10">
        <h2 className="font-display text-xl font-semibold text-ink-950">Homepage Sections</h2>
        <p className="mt-1 text-sm text-ink-600">Turn sections on or off. The hero stays above these always.</p>
        <div className="mt-4 divide-y divide-coffee-950/10 rounded-lg border border-coffee-950/10 bg-white">
          {(Object.keys(SECTION_LABELS) as (keyof Sections)[]).map((key) => (
            <div key={key} className="flex items-center justify-between px-5 py-4">
              <span className="text-sm text-ink-950">{SECTION_LABELS[key]}</span>
              <button
                onClick={() => saveSections({ ...sections, [key]: !sections[key] })}
                disabled={saving}
                className={`relative h-6 w-11 rounded-full transition-colors ${sections[key] ? 'bg-clay-600' : 'bg-coffee-950/20'}`}
              >
                <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${sections[key] ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* --- Site Settings (Welcome + Stats) --- */}
      <section className="border-t border-coffee-950/10 pt-10">
        <h2 className="font-display text-xl font-semibold text-ink-950">Administrator Welcome Message</h2>
        <div className="mt-4 space-y-4">
          {(['en', 'om', 'am'] as Lang[]).map((lang) => (
            <div key={lang}>
              <label className="block text-sm font-medium text-ink-950 uppercase">{lang}</label>
              <textarea value={welcomeMessage[lang]} onChange={(e) => setWelcomeMessage({ ...welcomeMessage, [lang]: e.target.value })} rows={4} className="mt-1 w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm" />
            </div>
          ))}
          <button onClick={saveWelcomeMessage} disabled={saving} className="rounded-md bg-clay-600 px-4 py-2 text-sm font-semibold text-white hover:bg-clay-500 disabled:opacity-60">
            {saving ? 'Saving…' : 'Save Message'}
          </button>
        </div>

        <h2 className="mt-10 font-display text-xl font-semibold text-ink-950">Quick Statistics</h2>
        <p className="mt-1 text-sm text-ink-600">Woreda count ({woredaCount ?? '—'}) comes from actual records in Woredas — add/remove there.</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {[
            ['Population — Male', 'populationMale'], ['Population — Female', 'populationFemale'], ['Population — Total', 'population'],
            ['Land area (km²)', 'areaKm2'], ['Rural kebeles', 'ruralKebeles'], ['Urban kebeles', 'urbanKebeles'],
            ['Elevation — Min (m)', 'elevationMin'], ['Elevation — Max (m)', 'elevationMax'],
          ].map(([label, key]) => (
            <div key={key}>
              <label className="block text-sm font-medium text-ink-950">{label}</label>
              <input type="number" value={stats[key] ?? ''} onChange={(e) => setStats({ ...stats, [key]: Number(e.target.value) })} className="mt-1 w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm" />
            </div>
          ))}
        </div>
        <button onClick={saveStats} disabled={saving} className="mt-4 rounded-md bg-clay-600 px-4 py-2 text-sm font-semibold text-white hover:bg-clay-500 disabled:opacity-60">
          {saving ? 'Saving…' : 'Save Statistics'}
        </button>
      </section>
    </div>
  );
}