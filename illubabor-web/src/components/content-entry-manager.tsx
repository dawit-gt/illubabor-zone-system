'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { useContent, ContentEntry } from '@/hooks/useContent';
import { FileUpload } from '@/components/file-upload';

type ContentType =
  | 'HISTORICAL_SITE'
  | 'CULTURAL_TOPIC'
  | 'INVESTMENT_OPPORTUNITY'
  | 'PROJECT';

export function ContentEntryManager({ type }: { type: ContentType }) {
  const { entries, loading } = useContent(type);

  const [zoneId, setZoneId] = useState<string | null>(null);
  const [editing, setEditing] = useState<ContentEntry | null>(null);
  const [creating, setCreating] = useState(false);

  const [form, setForm] = useState({
    title: '',
    titleOm: '',
    titleAm: '',
    summary: '',
    summaryOm: '',
    summaryAm: '',
    body: '',
    bodyOm: '',
    bodyAm: '',
    imageUrl: '',
    tag: '',
    status: '',
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.get('/zones/current').then((res) => setZoneId(res.data.id));
  }, []);

  const startCreate = () => {
    setCreating(true);
    setEditing(null);

    setForm({
      title: '',
      titleOm: '',
      titleAm: '',
      summary: '',
      summaryOm: '',
      summaryAm: '',
      body: '',
      bodyOm: '',
      bodyAm: '',
      imageUrl: '',
      tag: '',
      status: '',
    });
  };

  const startEdit = (e: ContentEntry) => {
    setEditing(e);
    setCreating(false);

    setForm({
      title: e.title,
      titleOm: e.titleOm ?? '',
      titleAm: e.titleAm ?? '',
      summary: e.summary ?? '',
      summaryOm: e.summaryOm ?? '',
      summaryAm: e.summaryAm ?? '',
      body: e.body,
      bodyOm: e.bodyOm ?? '',
      bodyAm: e.bodyAm ?? '',
      imageUrl: e.imageUrl ?? '',
      tag: (e as any).tag ?? '',
      status: (e as any).status ?? '',
    });
  };

  const cancel = () => {
    setEditing(null);
    setCreating(false);
  };

  const save = async () => {
    setSaving(true);

    try {
      if (creating) {
        await api.post('/content', {
          ...form,
          type,
          zoneId,
        });
      } else if (editing) {
        await api.patch(`/content/${editing.id}`, form);
      }

      cancel();
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
      {!showForm && (
        <button
          onClick={startCreate}
          className="rounded-md bg-clay-600 px-4 py-2 text-sm font-semibold text-white hover:bg-clay-500"
        >
          + New Entry
        </button>
      )}

      {showForm && (
        <div className="mt-4 rounded-lg border border-coffee-950/10 bg-white p-6">
          <div className="mt-4 space-y-6">
            <div className="grid gap-3 sm:grid-cols-3">
              <div>
                <label className="block text-xs font-semibold uppercase text-ink-600">
                  Title (English)
                </label>
                <input
                  value={form.title}
                  onChange={(e) =>
                    setForm({ ...form, title: e.target.value })
                  }
                  className="mt-1 w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-ink-600">
                  Title (Oromiffa)
                </label>
                <input
                  value={form.titleOm}
                  onChange={(e) =>
                    setForm({ ...form, titleOm: e.target.value })
                  }
                  className="mt-1 w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-ink-600">
                  Title (Amharic)
                </label>
                <input
                  value={form.titleAm}
                  onChange={(e) =>
                    setForm({ ...form, titleAm: e.target.value })
                  }
                  className="mt-1 w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm"
                />
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div>
                <label className="block text-xs font-semibold uppercase text-ink-600">
                  Summary (English)
                </label>
                <input
                  value={form.summary}
                  onChange={(e) =>
                    setForm({ ...form, summary: e.target.value })
                  }
                  className="mt-1 w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-ink-600">
                  Summary (Oromiffa)
                </label>
                <input
                  value={form.summaryOm}
                  onChange={(e) =>
                    setForm({ ...form, summaryOm: e.target.value })
                  }
                  className="mt-1 w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-ink-600">
                  Summary (Amharic)
                </label>
                <input
                  value={form.summaryAm}
                  onChange={(e) =>
                    setForm({ ...form, summaryAm: e.target.value })
                  }
                  className="mt-1 w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-ink-950">
                Tag / Category
              </label>
              <input
                value={form.tag}
                onChange={(e) =>
                  setForm({ ...form, tag: e.target.value })
                }
                className="mt-1 w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-ink-950">
                Status (e.g. Open, Planned)
              </label>
              <input
                value={form.status}
                onChange={(e) =>
                  setForm({ ...form, status: e.target.value })
                }
                className="mt-1 w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm"
              />
            </div>

            <FileUpload
              label="Image"
              value={form.imageUrl}
              onChange={(url) =>
                setForm({ ...form, imageUrl: url })
              }
              accept="image/*"
            />

            <div className="grid gap-3 sm:grid-cols-3">
              <div>
                <label className="block text-xs font-semibold uppercase text-ink-600">
                  Full Body (English)
                </label>
                <textarea
                  value={form.body}
                  onChange={(e) =>
                    setForm({ ...form, body: e.target.value })
                  }
                  rows={8}
                  className="mt-1 w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-ink-600">
                  Full Body (Oromiffa)
                </label>
                <textarea
                  value={form.bodyOm}
                  onChange={(e) =>
                    setForm({ ...form, bodyOm: e.target.value })
                  }
                  rows={8}
                  className="mt-1 w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-ink-600">
                  Full Body (Amharic)
                </label>
                <textarea
                  value={form.bodyAm}
                  onChange={(e) =>
                    setForm({ ...form, bodyAm: e.target.value })
                  }
                  rows={8}
                  className="mt-1 w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm"
                />
              </div>
            </div>
          </div>

          <div className="mt-4 flex gap-3">
            <button
              onClick={save}
              disabled={saving || !zoneId}
              className="rounded-md bg-clay-600 px-4 py-2 text-sm font-semibold text-white hover:bg-clay-500 disabled:opacity-60"
            >
              {saving
                ? 'Saving…'
                : !zoneId
                  ? 'Loading…'
                  : 'Save'}
            </button>

            <button
              onClick={cancel}
              disabled={saving}
              className="rounded-md border border-coffee-950/20 px-4 py-2 text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="mt-6 text-sm text-ink-600">
          Loading…
        </div>
      ) : (
        <div className="mt-6 divide-y divide-coffee-950/10 rounded-lg border border-coffee-950/10 bg-white">
          {entries.map((e) => (
            <div
              key={e.id}
              className="flex items-center justify-between px-5 py-3"
            >
              <p className="font-medium text-ink-950">
                {e.title}
              </p>

              <div className="flex gap-2">
                <button
                  onClick={() => startEdit(e)}
                  className="text-sm text-clay-600 hover:underline"
                >
                  Edit
                </button>

                <button
                  onClick={() => remove(e.id)}
                  className="text-sm text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

          {entries.length === 0 && (
            <p className="px-5 py-4 text-sm text-ink-600">
              Nothing added yet.
            </p>
          )}
        </div>
      )}
    </div>
  );
}