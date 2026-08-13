'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { useContent, ContentEntry } from '@/hooks/useContent';

type ContentType = 'HISTORICAL_SITE' | 'CULTURAL_TOPIC';

export default function AdminContentPage() {
  const [activeType, setActiveType] = useState<ContentType>('HISTORICAL_SITE');
  const { entries, loading } = useContent(activeType);
  const [zoneId, setZoneId] = useState<string | null>(null);
  const [editing, setEditing] = useState<ContentEntry | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({ title: '', titleOm: '', summary: '', body: '', bodyOm: '', imageUrl: '' });
  const [saving, setSaving] = useState(false);
  const [, forceReload] = useState(0);

  useEffect(() => {
    api.get('/zones/current').then((res) => setZoneId(res.data.id));
  }, []);

  const startCreate = () => {
    setCreating(true); setEditing(null);
    setForm({ title: '', titleOm: '', summary: '', body: '', bodyOm: '', imageUrl: '' });
  };

  const startEdit = (e: ContentEntry) => {
    setEditing(e); setCreating(false);
    setForm({
      title: e.title, titleOm: e.titleOm ?? '', summary: e.summary ?? '',
      body: e.body, bodyOm: e.bodyOm ?? '', imageUrl: e.imageUrl ?? '',
    });
  };

  const cancel = () => { setEditing(null); setCreating(false); };

  const save = async () => {
    setSaving(true);
    try {
      if (creating) {
        await api.post('/content', { ...form, type: activeType, zoneId });
      } else if (editing) {
        await api.patch(`/content/${editing.id}`, form);
      }
      cancel();
      forceReload((n) => n + 1);
      window.location.reload();
    } catch {
      alert('Save failed.');
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this entry?')) return;
    await api.delete(`/content/${id}`);
    window.location.reload();
  };

  const showForm = creating || editing;

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-ink-950">Historical Places & Cultural Attractions</h1>

      <div className="mt-4 flex gap-2">
        <button
          onClick={() => { setActiveType('HISTORICAL_SITE'); cancel(); }}
          className={`rounded-md px-4 py-2 text-sm ${activeType === 'HISTORICAL_SITE' ? 'bg-clay-600 text-white' : 'border border-coffee-950/20'}`}
        >
          Historical Places
        </button>
        <button
          onClick={() => { setActiveType('CULTURAL_TOPIC'); cancel(); }}
          className={`rounded-md px-4 py-2 text-sm ${activeType === 'CULTURAL_TOPIC' ? 'bg-clay-600 text-white' : 'border border-coffee-950/20'}`}
        >
          Cultural Attractions
        </button>
      </div>

      {!showForm && (
        <button onClick={startCreate} className="mt-4 rounded-md bg-clay-600 px-4 py-2 text-sm font-semibold text-white hover:bg-clay-500">
          + New Entry
        </button>
      )}

      {showForm && (
        <div className="mt-4 rounded-lg border border-coffee-950/10 bg-white p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-ink-950">Title (English)</label>
              <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="mt-1 w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink-950">Title (Oromiffa)</label>
              <input value={form.titleOm} onChange={(e) => setForm({ ...form, titleOm: e.target.value })} className="mt-1 w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-ink-950">Summary (shown in list view)</label>
              <input value={form.summary} onChange={(e) => setForm({ ...form, summary: e.target.value })} className="mt-1 w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-ink-950">Image URL</label>
              <input value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} className="mt-1 w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink-950">Full Body (English)</label>
              <textarea value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} rows={8} className="mt-1 w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink-950">Full Body (Oromiffa)</label>
              <textarea value={form.bodyOm} onChange={(e) => setForm({ ...form, bodyOm: e.target.value })} rows={8} className="mt-1 w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm" />
            </div>
          </div>
          <div className="mt-4 flex gap-3">
            <button onClick={save} disabled={saving} className="rounded-md bg-clay-600 px-4 py-2 text-sm font-semibold text-white hover:bg-clay-500 disabled:opacity-60">
              {saving ? 'Saving…' : 'Save'}
            </button>
            <button onClick={cancel} className="rounded-md border border-coffee-950/20 px-4 py-2 text-sm">Cancel</button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="mt-6 text-sm text-ink-600">Loading…</div>
      ) : (
        <div className="mt-6 divide-y divide-coffee-950/10 rounded-lg border border-coffee-950/10 bg-white">
          {entries.map((e) => (
            <div key={e.id} className="flex items-center justify-between px-5 py-3">
              <p className="font-medium text-ink-950">{e.title}</p>
              <div className="flex gap-2">
                <button onClick={() => startEdit(e)} className="text-sm text-clay-600 hover:underline">Edit</button>
                <button onClick={() => remove(e.id)} className="text-sm text-red-600 hover:underline">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}