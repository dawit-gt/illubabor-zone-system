'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

interface Woreda {
  id: string;
  name: string;
  slug: string;
  isTown: boolean;
  population?: number;
  description?: string;
}

export default function AdminWoredasPage() {
  const [woredas, setWoredas] = useState<Woreda[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Woreda | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({ name: '', slug: '', isTown: false, population: '', description: '' });
  const [saving, setSaving] = useState(false);
  const [zoneId, setZoneId] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    api.get('/woredas').then((res) => setWoredas(res.data)).finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
    api.get('/zones/current').then((res) => setZoneId(res.data.id));
  }, []);

  const startCreate = () => {
    setCreating(true);
    setEditing(null);
    setForm({ name: '', slug: '', isTown: false, population: '', description: '' });
  };

  const startEdit = (w: Woreda) => {
    setEditing(w);
    setCreating(false);
    setForm({
      name: w.name, slug: w.slug, isTown: w.isTown,
      population: w.population ? String(w.population) : '', description: w.description ?? '',
    });
  };

  const cancel = () => { setEditing(null); setCreating(false); };

  const save = async () => {
    setSaving(true);
    try {
      const payload = {
        name: form.name,
        description: form.description,
        population: form.population ? Number(form.population) : undefined,
      };
      if (creating) {
        await api.post('/woredas', { ...payload, slug: form.slug, isTown: form.isTown, zoneId });
      } else if (editing) {
        await api.patch(`/woredas/${editing.id}`, payload);
      }
      cancel();
      load();
    } catch {
      alert('Save failed — check required fields.');
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this woreda? This cannot be undone.')) return;
    await api.delete(`/woredas/${id}`);
    load();
  };

  const showForm = creating || editing;

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold text-coffee-950">Woredas</h1>
        {!showForm && (
          <button onClick={startCreate} className="rounded-md bg-clay-600 px-4 py-2 text-sm font-semibold text-white hover:bg-clay-500">
            + New Woreda
          </button>
        )}
      </div>

      {showForm && (
        <div className="mt-6 rounded-lg border border-coffee-950/10 bg-white p-6">
          <h2 className="font-display text-lg font-semibold text-coffee-950">
            {creating ? 'New Woreda' : `Edit: ${editing?.name}`}
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-coffee-950">Name</label>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1 w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm" />
            </div>
            {creating && (
              <div>
                <label className="block text-sm font-medium text-coffee-950">Slug</label>
                <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="e.g. bure" className="mt-1 w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm" />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-coffee-950">Population</label>
              <input value={form.population} onChange={(e) => setForm({ ...form, population: e.target.value })} type="number" className="mt-1 w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm" />
            </div>
            {creating && (
              <label className="flex items-center gap-2 text-sm text-coffee-950">
                <input type="checkbox" checked={form.isTown} onChange={(e) => setForm({ ...form, isTown: e.target.checked })} />
                Is a town administration
              </label>
            )}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-coffee-950">Description</label>
              <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="mt-1 w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm" />
            </div>
          </div>
          <div className="mt-4 flex gap-3">
            <button onClick={save} disabled={saving} className="rounded-md bg-clay-600 px-4 py-2 text-sm font-semibold text-white hover:bg-clay-500 disabled:opacity-60">
              {saving ? 'Saving…' : 'Save'}
            </button>
            <button onClick={cancel} className="rounded-md border border-coffee-950/20 px-4 py-2 text-sm hover:bg-coffee-950/5">Cancel</button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="mt-6 text-sm text-coffee-600">Loading…</div>
      ) : (
        <div className="mt-6 divide-y divide-coffee-950/10 rounded-lg border border-coffee-950/10 bg-white">
          {woredas.map((w) => (
            <div key={w.id} className="flex items-center justify-between px-5 py-3">
              <div>
                <p className="font-medium text-coffee-950">{w.name} {w.isTown && <span className="ml-2 rounded bg-gold-500/20 px-2 py-0.5 text-xs font-normal">Town</span>}</p>
                <p className="text-xs text-coffee-600">/{w.slug}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => startEdit(w)} className="text-sm text-clay-600 hover:underline">Edit</button>
                <button onClick={() => remove(w.id)} className="text-sm text-red-600 hover:underline">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}