'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

interface Department {
  id: string;
  name: string;
  nameOm?: string;
  nameAm?: string;
  slug: string;
  description?: string;
  headName?: string;
  contactEmail?: string;
  contactPhone?: string;
}

const ZONE_ID_STORAGE_KEY = 'illubabor-zone-id';

export default function AdminDepartmentsPage() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Department | null>(null);
  const [creating, setCreating] = useState(false);

  const [form, setForm] = useState({
    name: '',
    nameOm: '',
    nameAm: '',
    slug: '',
    description: '',
    headName: '',
    contactEmail: '',
    contactPhone: '',
  });

  const [saving, setSaving] = useState(false);
  const [zoneId, setZoneId] = useState<string | null>(null);

  const load = () => {
    setLoading(true);

    api
      .get('/departments')
      .then((res) => setDepartments(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();

    api
      .get('/zones/current')
      .then((res) => setZoneId(res.data.id));
  }, []);

  const startCreate = () => {
    setCreating(true);
    setEditing(null);

    setForm({
      name: '',
      nameOm: '',
      nameAm: '',
      slug: '',
      description: '',
      headName: '',
      contactEmail: '',
      contactPhone: '',
    });
  };

  const startEdit = (d: Department) => {
    setEditing(d);
    setCreating(false);

    setForm({
      name: d.name,
      nameOm: d.nameOm ?? '',
      nameAm: d.nameAm ?? '',
      slug: d.slug,
      description: d.description ?? '',
      headName: d.headName ?? '',
      contactEmail: d.contactEmail ?? '',
      contactPhone: d.contactPhone ?? '',
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
        await api.post('/departments', {
          ...form,
          zoneId,
        });
      } else if (editing) {
        const {
          name,
          nameOm,
          nameAm,
          description,
          headName,
          contactEmail,
          contactPhone,
        } = form;

        await api.patch(`/departments/${editing.id}`, {
          name,
          nameOm,
          nameAm,
          description,
          headName,
          contactEmail,
          contactPhone,
        });
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
    if (!confirm('Delete this department? This cannot be undone.')) {
      return;
    }

    await api.delete(`/departments/${id}`);
    load();
  };

  const showForm = creating || editing;

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold text-coffee-950">
          Sectors
        </h1>

        {!showForm && (
          <button
            onClick={startCreate}
            className="rounded-md bg-clay-600 px-4 py-2 text-sm font-semibold text-white hover:bg-clay-500"
          >
            + New Sector
          </button>
        )}
      </div>

      {showForm && (
        <div className="mt-6 rounded-lg border border-coffee-950/10 bg-white p-6">
          <h2 className="font-display text-lg font-semibold text-coffee-950">
            {creating ? 'New Department' : `Edit: ${editing?.name}`}
          </h2>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {/* English Name */}
            <div>
              <label className="block text-sm font-medium text-ink-950">
                Name
              </label>

              <input
                value={form.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: e.target.value,
                  })
                }
                className="mt-1 w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm"
              />
            </div>

            {/* Oromo Name */}
            <div>
              <label className="block text-sm font-medium text-ink-950">
                Name (Oromiffa)
              </label>

              <input
                value={form.nameOm}
                onChange={(e) =>
                  setForm({
                    ...form,
                    nameOm: e.target.value,
                  })
                }
                className="mt-1 w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm"
              />
            </div>

            {/* Amharic Name */}
            <div>
              <label className="block text-sm font-medium text-ink-950">
                Name (Amharic)
              </label>

              <input
                value={form.nameAm}
                onChange={(e) =>
                  setForm({
                    ...form,
                    nameAm: e.target.value,
                  })
                }
                className="mt-1 w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm"
              />
            </div>

            {/* Slug */}
            {creating && (
              <div>
                <label className="block text-sm font-medium text-ink-950">
                  Slug
                </label>

                <input
                  value={form.slug}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      slug: e.target.value,
                    })
                  }
                  placeholder="e.g. agriculture"
                  className="mt-1 w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm"
                />
              </div>
            )}

            {/* Head Name */}
            <div>
              <label className="block text-sm font-medium text-ink-950">
                Head Name
              </label>

              <input
                value={form.headName}
                onChange={(e) =>
                  setForm({
                    ...form,
                    headName: e.target.value,
                  })
                }
                className="mt-1 w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm"
              />
            </div>

            {/* Contact Email */}
            <div>
              <label className="block text-sm font-medium text-ink-950">
                Contact Email
              </label>

              <input
                value={form.contactEmail}
                onChange={(e) =>
                  setForm({
                    ...form,
                    contactEmail: e.target.value,
                  })
                }
                type="email"
                className="mt-1 w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm"
              />
            </div>

            {/* Contact Phone */}
            <div>
              <label className="block text-sm font-medium text-ink-950">
                Contact Phone
              </label>

              <input
                value={form.contactPhone}
                onChange={(e) =>
                  setForm({
                    ...form,
                    contactPhone: e.target.value,
                  })
                }
                className="mt-1 w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm"
              />
            </div>

            {/* Description */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-ink-950">
                Description
              </label>

              <textarea
                value={form.description}
                onChange={(e) =>
                  setForm({
                    ...form,
                    description: e.target.value,
                  })
                }
                rows={3}
                className="mt-1 w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm"
              />
            </div>
          </div>

          <div className="mt-4 flex gap-3">
            <button
              onClick={save}
              disabled={saving}
              className="rounded-md bg-clay-600 px-4 py-2 text-sm font-semibold text-white hover:bg-clay-500 disabled:opacity-60"
            >
              {saving ? 'Saving…' : 'Save'}
            </button>

            <button
              onClick={cancel}
              disabled={saving}
              className="rounded-md border border-coffee-950/20 px-4 py-2 text-sm hover:bg-coffee-950/5 disabled:opacity-60"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="mt-6 text-sm text-coffee-600">
          Loading…
        </div>
      ) : (
        <div className="mt-6 divide-y divide-coffee-950/10 rounded-lg border border-coffee-950/10 bg-white">
          {departments.map((d) => (
            <div
              key={d.id}
              className="flex items-center justify-between px-5 py-3"
            >
              <div>
                <p className="font-medium text-coffee-950">
                  {d.name}
                </p>

                <p className="text-xs text-coffee-600">
                  /{d.slug}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => startEdit(d)}
                  className="text-sm text-clay-600 hover:underline"
                >
                  Edit
                </button>

                <button
                  onClick={() => remove(d.id)}
                  className="text-sm text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

          {departments.length === 0 && (
            <p className="px-5 py-4 text-sm text-coffee-600">
              No departments found.
            </p>
          )}
        </div>
      )}
    </div>
  );
}