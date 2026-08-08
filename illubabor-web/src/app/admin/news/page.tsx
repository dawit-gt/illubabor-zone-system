'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

interface NewsItem {
  id: string; title: string; slug: string; status: string; excerpt?: string; content: string;
}

export default function AdminNewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<NewsItem | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({ title: '', slug: '', excerpt: '', content: '', status: 'DRAFT' });
  const [saving, setSaving] = useState(false);
  const [zoneId, setZoneId] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    api.get('/news/admin/all').then((res) => setNews(res.data)).finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
    api.get('/zones/current').then((res) => setZoneId(res.data.id));
  }, []);

  const startCreate = () => {
    setCreating(true); setEditing(null);
    setForm({ title: '', slug: '', excerpt: '', content: '', status: 'DRAFT' });
  };

  const startEdit = (n: NewsItem) => {
    setEditing(n); setCreating(false);
    setForm({ title: n.title, slug: n.slug, excerpt: n.excerpt ?? '', content: n.content, status: n.status });
  };

  const cancel = () => { setEditing(null); setCreating(false); };

  const save = async () => {
    setSaving(true);
    try {
      if (creating) {
        await api.post('/news', { title: form.title, slug: form.slug, excerpt: form.excerpt, content: form.content, zoneId });
      } else if (editing) {
        await api.patch(`/news/${editing.id}`, { title: form.title, excerpt: form.excerpt, content: form.content, status: form.status });
      }
      cancel(); load();
    } catch {
      alert('Save failed — check required fields.');
    } finally { setSaving(false); }
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this article? This cannot be undone.')) return;
    await api.delete(`/news/${id}`);
    load();
  };

  const showForm = creating || editing;

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold text-coffee-950">News</h1>
        {!showForm && (
          <button onClick={startCreate} className="rounded-md bg-clay-600 px-4 py-2 text-sm font-semibold text-white hover:bg-clay-500">
            + New Article
          </button>
        )}
      </div>

      {showForm && (
        <div className="mt-6 rounded-lg border border-coffee-950/10 bg-white p-6">
          <h2 className="font-display text-lg font-semibold text-coffee-950">
            {creating ? 'New Article' : `Edit: ${editing?.title}`}
          </h2>
          <div className="mt-4 grid gap-4">
            <div>
              <label className="block text-sm font-medium text-coffee-950">Title</label>
              <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="mt-1 w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm" />
            </div>
            {creating && (
              <div>
                <label className="block text-sm font-medium text-coffee-950">Slug</label>
                <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="mt-1 w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm" />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-coffee-950">Excerpt</label>
              <input value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} className="mt-1 w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-coffee-950">Content</label>
              <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={8} className="mt-1 w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm" />
            </div>
            {editing && (
              <div>
                <label className="block text-sm font-medium text-coffee-950">Status</label>
                <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="mt-1 rounded-md border border-coffee-950/20 px-3 py-2 text-sm">
                  <option value="DRAFT">Draft</option>
                  <option value="PUBLISHED">Published</option>
                  <option value="ARCHIVED">Archived</option>
                </select>
              </div>
            )}
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
          {news.map((n) => (
            <div key={n.id} className="flex items-center justify-between px-5 py-3">
              <div>
                <p className="font-medium text-coffee-950">{n.title}</p>
                <p className="text-xs text-coffee-600">{n.status}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => startEdit(n)} className="text-sm text-clay-600 hover:underline">Edit</button>
                <button onClick={() => remove(n.id)} className="text-sm text-red-600 hover:underline">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}