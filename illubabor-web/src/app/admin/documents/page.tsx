'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { FileUpload } from '@/components/file-upload';

interface Doc {
  id: string;
  title: string;
  titleOm?: string;
  titleAm?: string;
  type: string;
  fileUrl: string;
}

interface Department {
  id: string;
  name: string;
}

const TYPES = [
  'POLICY',
  'REPORT',
  'BUDGET',
  'PROCUREMENT',
  'MEETING_MINUTES',
  'FORM',
  'LEGAL_NOTICE',
  'OTHER',
];

export default function AdminDocumentsPage() {
  const [documents, setDocuments] = useState<Doc[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  const [form, setForm] = useState({
    title: '',
    titleOm: '',
    titleAm: '',
    type: 'REPORT',
    fileUrl: '',
    departmentId: '',
  });

  const [saving, setSaving] = useState(false);
  const [zoneId, setZoneId] = useState<string | null>(null);

  const load = () => {
    setLoading(true);

    api
      .get('/documents')
      .then((res) => setDocuments(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();

    api
      .get('/zones/current')
      .then((res) => setZoneId(res.data.id));

    api
      .get('/departments')
      .then((res) => setDepartments(res.data));
  }, []);

  const startCreate = () => {
    setCreating(true);

    setForm({
      title: '',
      titleOm: '',
      titleAm: '',
      type: 'REPORT',
      fileUrl: '',
      departmentId: '',
    });
  };

  const save = async () => {
    if (!form.title.trim()) {
      alert('Title is required.');
      return;
    }

    if (!form.fileUrl.trim()) {
      alert('File is required.');
      return;
    }

    if (!zoneId) {
      alert('Zone information is not available.');
      return;
    }

    setSaving(true);

    try {
      await api.post('/documents', {
        title: form.title,
        titleOm: form.titleOm,
        titleAm: form.titleAm,
        type: form.type,
        fileUrl: form.fileUrl,
        departmentId: form.departmentId || undefined,
        zoneId,
        isPublic: true,
      });

      setCreating(false);
      load();
    } catch (error) {
      console.error(error);
      alert('Save failed — check required fields, especially File.');
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this document? This cannot be undone.')) {
      return;
    }

    try {
      await api.delete(`/documents/${id}`);
      load();
    } catch (error) {
      console.error(error);
      alert('Failed to delete the document.');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold text-coffee-950">
          Documents
        </h1>

        {!creating && (
          <button
            onClick={startCreate}
            className="rounded-md bg-clay-600 px-4 py-2 text-sm font-semibold text-white hover:bg-clay-500"
          >
            + New Document
          </button>
        )}
      </div>

      {creating && (
        <div className="mt-6 rounded-lg border border-coffee-950/10 bg-white p-6">
          <h2 className="font-display text-lg font-semibold text-coffee-950">
            New Document
          </h2>

          <p className="mt-1 text-xs text-coffee-600">
            File URL must point to an already-hosted file (e.g. Supabase
            Storage public URL). This form registers metadata only — it
            doesn't upload files.
          </p>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {/* English Title */}
            <div>
              <label className="block text-sm font-medium text-coffee-950">
                Title (English)
              </label>

              <input
                value={form.title}
                onChange={(e) =>
                  setForm({
                    ...form,
                    title: e.target.value,
                  })
                }
                className="mt-1 w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm"
              />
            </div>

            {/* Oromo Title */}
            <div>
              <label className="block text-sm font-medium text-coffee-950">
                Title (Oromiffa)
              </label>

              <input
                value={form.titleOm}
                onChange={(e) =>
                  setForm({
                    ...form,
                    titleOm: e.target.value,
                  })
                }
                className="mt-1 w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm"
              />
            </div>

            {/* Amharic Title */}
            <div>
              <label className="block text-sm font-medium text-coffee-950">
                Title (Amharic)
              </label>

              <input
                value={form.titleAm}
                onChange={(e) =>
                  setForm({
                    ...form,
                    titleAm: e.target.value,
                  })
                }
                className="mt-1 w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm"
              />
            </div>

            {/* Type */}
            <div>
              <label className="block text-sm font-medium text-coffee-950">
                Type
              </label>

              <select
                value={form.type}
                onChange={(e) =>
                  setForm({
                    ...form,
                    type: e.target.value,
                  })
                }
                className="mt-1 w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm"
              >
                {TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t.replace(/_/g, ' ')}
                  </option>
                ))}
              </select>
            </div>

            {/* Department */}
            <div>
              <label className="block text-sm font-medium text-coffee-950">
                Department (optional)
              </label>

              <select
                value={form.departmentId}
                onChange={(e) =>
                  setForm({
                    ...form,
                    departmentId: e.target.value,
                  })
                }
                className="mt-1 w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm"
              >
                <option value="">— Zone-wide —</option>

                {departments.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            {/* File */}
            <div className="sm:col-span-2">
              <FileUpload
                label="Document file"
                value={form.fileUrl}
                onChange={(url) =>
                  setForm({
                    ...form,
                    fileUrl: url,
                  })
                }
                accept=".pdf,.doc,.docx,.xls,.xlsx"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="mt-4 flex gap-3">
            <button
              onClick={save}
              disabled={saving}
              className="rounded-md bg-clay-600 px-4 py-2 text-sm font-semibold text-white hover:bg-clay-500 disabled:opacity-60"
            >
              {saving ? 'Saving…' : 'Save'}
            </button>

            <button
              onClick={() => setCreating(false)}
              disabled={saving}
              className="rounded-md border border-coffee-950/20 px-4 py-2 text-sm hover:bg-coffee-950/5 disabled:opacity-60"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Documents List */}
      {loading ? (
        <div className="mt-6 text-sm text-coffee-600">
          Loading…
        </div>
      ) : documents.length === 0 ? (
        <div className="mt-6 rounded-lg border border-coffee-950/10 bg-white p-6 text-sm text-coffee-600">
          No documents found.
        </div>
      ) : (
        <div className="mt-6 divide-y divide-coffee-950/10 rounded-lg border border-coffee-950/10 bg-white">
          {documents.map((d) => (
            <div
              key={d.id}
              className="flex items-center justify-between px-5 py-3"
            >
              <div>
                <p className="font-medium text-coffee-950">
                  {d.title}
                </p>

                <p className="text-xs text-coffee-600">
                  {d.type.replace(/_/g, ' ')}
                </p>
              </div>

              <button
                onClick={() => remove(d.id)}
                className="text-sm text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}