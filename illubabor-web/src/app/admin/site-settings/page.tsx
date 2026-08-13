'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

interface WelcomeMessage { om: string; am: string; en: string }
interface QuickStats {
  population?: number; populationMale?: number; populationFemale?: number;
  areaKm2?: number; elevationMin?: number; elevationMax?: number;
  urbanKebeles?: number; ruralKebeles?: number;
}

type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

export default function SiteSettingsPage() {
  const [message, setMessage] = useState<WelcomeMessage>({ om: '', am: '', en: '' });
  const [stats, setStats] = useState<QuickStats>({});
  const [loading, setLoading] = useState(true);
  const [messageStatus, setMessageStatus] = useState<SaveStatus>('idle');
  const [messageError, setMessageError] = useState<string | null>(null);
  const [statsStatus, setStatsStatus] = useState<SaveStatus>('idle');
  const [statsError, setStatsError] = useState<string | null>(null);
  const [woredaCount, setWoredaCount] = useState<number | null>(null);

  useEffect(() => {
    Promise.all([
      api.get('/site-config/admin_welcome_message').then((r) => JSON.parse(r.data.value)).catch(() => ({ om: '', am: '', en: '' })),
      api.get('/zones/current'),
    ]).then(([msg, zoneRes]) => {
      setMessage(msg);
      setStats({
        population: zoneRes.data.population,
        populationMale: zoneRes.data.populationMale,
        populationFemale: zoneRes.data.populationFemale,
        areaKm2: zoneRes.data.areaKm2,
        elevationMin: zoneRes.data.elevationMin,
        elevationMax: zoneRes.data.elevationMax,
        urbanKebeles: zoneRes.data.urbanKebeles,
        ruralKebeles: zoneRes.data.ruralKebeles,
      });
      setWoredaCount(zoneRes.data._count?.woredas ?? null);
    }).finally(() => setLoading(false));
  }, []);

  // Helper: turn an axios error into a readable message so failures are
  // never silent again. 401/403 almost always mean the admin's session
  // expired or their role doesn't have permission for this endpoint.
  function describeError(err: any): string {
    const status = err?.response?.status;
    if (status === 401) return 'Your session has expired. Please sign in again.';
    if (status === 403) return "You don't have permission to change this (requires SUPER_ADMIN or ZONE_ADMIN).";
    if (status) return `Save failed (HTTP ${status}). ${err?.response?.data?.message ?? ''}`.trim();
    return 'Save failed — could not reach the server. Check your connection.';
  }

  const saveMessage = async () => {
    setMessageStatus('saving');
    setMessageError(null);
    try {
      await api.put('/site-config/admin_welcome_message', { value: JSON.stringify(message) });
      setMessageStatus('saved');
      // Clear the "saved" confirmation after a few seconds so it doesn't linger forever.
      setTimeout(() => setMessageStatus((s) => (s === 'saved' ? 'idle' : s)), 3000);
    } catch (err: any) {
      console.error('Failed to save welcome message:', err);
      setMessageStatus('error');
      setMessageError(describeError(err));
    }
  };

  const saveStats = async () => {
    setStatsStatus('saving');
    setStatsError(null);
    try {
      await api.patch('/zones/current', stats);
      setStatsStatus('saved');
      setTimeout(() => setStatsStatus((s) => (s === 'saved' ? 'idle' : s)), 3000);
    } catch (err: any) {
      console.error('Failed to save statistics:', err);
      setStatsStatus('error');
      setStatsError(describeError(err));
    }
  };

  if (loading) return <div className="text-sm text-coffee-600">Loading…</div>;

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-display text-2xl font-semibold text-coffee-950">Administrator Welcome Message</h1>
        <p className="mt-1 text-sm text-coffee-600">Shown on the homepage, one version per language.</p>

        <div className="mt-4 space-y-4">
          {(['en', 'om', 'am'] as const).map((lang) => (
            <div key={lang}>
              <label className="block text-sm font-medium text-coffee-950 uppercase">{lang}</label>
              <textarea
                value={message[lang]}
                onChange={(e) => setMessage({ ...message, [lang]: e.target.value })}
                rows={4}
                className="mt-1 w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm"
              />
            </div>
          ))}

          <div className="flex items-center gap-3">
            <button
              onClick={saveMessage}
              disabled={messageStatus === 'saving'}
              className="rounded-md bg-clay-600 px-4 py-2 text-sm font-semibold text-white hover:bg-clay-500 disabled:opacity-60"
            >
              {messageStatus === 'saving' ? 'Saving…' : 'Save Message'}
            </button>
            {messageStatus === 'saved' && (
              <span className="text-sm font-medium text-green-700">✓ Saved</span>
            )}
            {messageStatus === 'error' && (
              <span className="text-sm font-medium text-red-600">{messageError}</span>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-coffee-950/10 pt-10">
        <h2 className="font-display text-2xl font-semibold text-coffee-950">Quick Statistics</h2>
        <p className="mt-1 text-sm text-coffee-600">
          Woreda count ({woredaCount ?? '—'}) comes from actual woreda records in {'/admin/woredas'} — add or remove woredas there.
        </p>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-coffee-950">Population — Male</label>
            <input type="number" value={stats.populationMale ?? ''} onChange={(e) => setStats({ ...stats, populationMale: Number(e.target.value) })} className="mt-1 w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-coffee-950">Population — Female</label>
            <input type="number" value={stats.populationFemale ?? ''} onChange={(e) => setStats({ ...stats, populationFemale: Number(e.target.value) })} className="mt-1 w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-coffee-950">Population — Total</label>
            <input type="number" value={stats.population ?? ''} onChange={(e) => setStats({ ...stats, population: Number(e.target.value) })} className="mt-1 w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-coffee-950">Land area (km²)</label>
            <input type="number" step="0.01" value={stats.areaKm2 ?? ''} onChange={(e) => setStats({ ...stats, areaKm2: Number(e.target.value) })} className="mt-1 w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-coffee-950">Rural kebeles</label>
            <input type="number" value={stats.ruralKebeles ?? ''} onChange={(e) => setStats({ ...stats, ruralKebeles: Number(e.target.value) })} className="mt-1 w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-coffee-950">Urban kebeles</label>
            <input type="number" value={stats.urbanKebeles ?? ''} onChange={(e) => setStats({ ...stats, urbanKebeles: Number(e.target.value) })} className="mt-1 w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-coffee-950">Elevation — Min (m)</label>
            <input type="number" value={stats.elevationMin ?? ''} onChange={(e) => setStats({ ...stats, elevationMin: Number(e.target.value) })} className="mt-1 w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-coffee-950">Elevation — Max (m)</label>
            <input type="number" value={stats.elevationMax ?? ''} onChange={(e) => setStats({ ...stats, elevationMax: Number(e.target.value) })} className="mt-1 w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm" />
          </div>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <button
            onClick={saveStats}
            disabled={statsStatus === 'saving'}
            className="rounded-md bg-clay-600 px-4 py-2 text-sm font-semibold text-white hover:bg-clay-500 disabled:opacity-60"
          >
            {statsStatus === 'saving' ? 'Saving…' : 'Save Statistics'}
          </button>
          {statsStatus === 'saved' && (
            <span className="text-sm font-medium text-green-700">✓ Saved</span>
          )}
          {statsStatus === 'error' && (
            <span className="text-sm font-medium text-red-600">{statsError}</span>
          )}
        </div>
      </div>
    </div>
  );
}