'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

interface Sections {
  stats: boolean;
  welcome: boolean;
  departments: boolean;
  heritage: boolean;
  economy: boolean;
  people: boolean;
}

const DEFAULTS: Sections = { stats: true, welcome: true, departments: true, heritage: true, economy: true, people: true };

const LABELS: Record<keyof Sections, string> = {
  stats: 'Stats strip (woredas / population / area / departments)',
  welcome: 'Administrator welcome message & quick stats table',
  departments: 'Departments grid',
  heritage: 'Yayu Biosphere & Sor Falls cards',
  economy: 'Coffee Economy section',
  people: 'People and Culture section',
};

export default function HomepageSettingsPage() {
  const [sections, setSections] = useState<Sections>(DEFAULTS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.get('/site-config/homepage_sections')
      .then((res) => setSections({ ...DEFAULTS, ...JSON.parse(res.data.value) }))
      .catch(() => setSections(DEFAULTS))
      .finally(() => setLoading(false));
  }, []);

  const toggle = async (key: keyof Sections) => {
    const next = { ...sections, [key]: !sections[key] };
    setSections(next); // optimistic
    setSaving(true);
    setError(null);
    try {
      await api.put('/site-config/homepage_sections', { value: JSON.stringify(next) });
    } catch (err: any) {
      // Roll back the optimistic toggle since the save actually failed —
      // otherwise the UI shows a state that was never persisted.
      setSections(sections);
      const status = err?.response?.status;
      setError(
        status === 401
          ? 'Your session has expired. Please sign in again.'
          : status === 403
            ? "You don't have permission to change this."
            : 'Save failed — please try again.',
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-coffee-950">Homepage Sections</h1>
      <p className="mt-2 text-sm text-coffee-600">
        Turn sections on or off on the public homepage. The hero and stats strip stay above these.
      </p>

      {error && <p className="mt-3 text-sm font-medium text-red-600">{error}</p>}

      {loading ? (
        <div className="mt-6 text-sm text-coffee-600">Loading…</div>
      ) : (
        <div className="mt-6 divide-y divide-coffee-950/10 rounded-lg border border-coffee-950/10 bg-white">
          {(Object.keys(LABELS) as (keyof Sections)[]).map((key) => (
            <div key={key} className="flex items-center justify-between px-5 py-4">
              <span className="text-sm text-coffee-950">{LABELS[key]}</span>
              <button
                onClick={() => toggle(key)}
                disabled={saving}
                className={`relative h-6 w-11 rounded-full transition-colors ${sections[key] ? 'bg-clay-600' : 'bg-coffee-950/20'}`}
              >
                <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${sections[key] ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
