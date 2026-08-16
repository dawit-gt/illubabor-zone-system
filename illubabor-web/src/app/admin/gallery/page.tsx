'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { useGallery, GalleryPhoto } from '@/hooks/useGallery';
import { FileUpload } from '@/components/file-upload';

const CATEGORIES = ['ADMIN_OFFICE', 'PROJECTS', 'PUBLIC_EVENTS', 'INFRASTRUCTURE', 'PUBLIC_PARTICIPATION'] as const;

const CATEGORY_LABELS: Record<typeof CATEGORIES[number], string> = {
  ADMIN_OFFICE: 'Zone Administration Office',
  PROJECTS: 'Projects',
  PUBLIC_EVENTS: 'Public Events',
  INFRASTRUCTURE: 'Development Infrastructure',
  PUBLIC_PARTICIPATION: 'Public Participation & Consultation',
};

export default function AdminGalleryPage() {
  const { photos, loading, reload } = useGallery();
  const [zoneId, setZoneId] = useState<string | null>(null);
  const [form, setForm] = useState({ category: 'ADMIN_OFFICE' as typeof CATEGORIES[number], imageUrl: '', caption: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.get('/zones/current').then((res) => setZoneId(res.data.id));
  }, []);

  const add = async () => {
    if (!form.imageUrl.trim() || !zoneId) return;
    setSaving(true);
    try {
      await api.post('/gallery', { ...form, zoneId });
      setForm({ category: form.category, imageUrl: '', caption: '' });
      reload();
    } catch {
      alert('Failed to add photo — check the URL.');
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this photo?')) return;
    await api.delete(`/gallery/${id}`);
    reload();
  };

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-coffee-950">Gallery</h1>
      <p className="mt-1 text-sm text-coffee-600">Add photo URLs (Supabase Storage or another hosted source) by category.</p>

      <div className="mt-6 rounded-lg border border-coffee-950/10 bg-white p-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-coffee-950">Category</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value as typeof CATEGORIES[number] })}
              className="mt-1 w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm"
            >
              {CATEGORIES.map((c) => <option key={c} value={c}>{CATEGORY_LABELS[c]}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-coffee-950">Caption (optional)</label>
            <input
              value={form.caption}
              onChange={(e) => setForm({ ...form, caption: e.target.value })}
              className="mt-1 w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm"
            />
          </div>
          <div className="sm:col-span-2">
            <FileUpload
              label="Photo"
              value={form.imageUrl}
              onChange={(url) => setForm({ ...form, imageUrl: url })}
              accept="image/*"
            />
          </div>
        </div>
        <button
          onClick={add}
          disabled={saving}
          className="mt-4 rounded-md bg-clay-600 px-4 py-2 text-sm font-semibold text-white hover:bg-clay-500 disabled:opacity-60"
        >
          {saving ? 'Adding…' : 'Add Photo'}
        </button>
      </div>

      {loading ? (
        <div className="mt-6 text-sm text-coffee-600">Loading…</div>
      ) : (
        <div className="mt-8 space-y-8">
          {CATEGORIES.map((cat) => {
            const items = photos.filter((p: GalleryPhoto) => p.category === cat);
            return (
              <div key={cat}>
                <h2 className="font-display text-base font-semibold text-coffee-950">{CATEGORY_LABELS[cat]} ({items.length})</h2>
                <div className="mt-3 grid gap-3 sm:grid-cols-3">
                  {items.map((p) => (
                    <div key={p.id} className="overflow-hidden rounded-lg border border-coffee-950/10 bg-white">
                      <img src={p.imageUrl} alt="" className="h-32 w-full object-cover" onError={(e) => (e.currentTarget.style.display = 'none')} />
                      <div className="flex items-center justify-between p-2">
                        <p className="truncate text-xs text-coffee-600">{p.caption || '—'}</p>
                        <button onClick={() => remove(p.id)} className="text-xs text-red-600 hover:underline">Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}