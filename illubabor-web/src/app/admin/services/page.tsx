'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

interface Service {
  id: string; name: string; slug: string; category: string; description: string;
  requirements?: string; processTime?: string; fee?: string; isOnline: boolean;
  department: { id: string; name: string };
}
interface Department { id: string; name: string }

const CATEGORIES = [
  'CIVIL_REGISTRATION', 'LAND_ADMINISTRATION', 'BUSINESS_LICENSING', 'AGRICULTURE_SUPPORT',
  'HEALTH_SERVICES', 'EDUCATION_SERVICES', 'SOCIAL_AFFAIRS', 'JUSTICE_LEGAL', 'INFRASTRUCTURE', 'OTHER',
];

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Service | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({
    name: '', slug: '', category: 'OTHER', description: '', requirements: '',
    processTime: '', fee: '', isOnline: false, departmentId: '',
  });
  const [saving, setSaving] = useState(false);
  const [zoneId, setZoneId] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    api.get('/services').then((res) => setServices(res.data)).finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
    api.get('/zones/current').then((res) => setZoneId(res.data.id));
    api.get('/departments').then((res) => setDepartments(res.data));
  }, []);

  const startCreate = () => {
    setCreating(true); setEditing(null);
    setForm({ name: '', slug: '', category: 'OTHER', description: '', requirements: '', processTime: '', fee: '', isOnline: false, departmentId: departments[0]?.id ?? '' });
  };

  const startEdit = (s: Service) => {
    setEditing(s); setCreating(false);
    setForm({
      name: s.name, slug: s.slug, category: s.category, description: s.description,
      requirements: s.requirements ?? '', processTime: s.processTime ?? '', fee: s.fee ?? '',
      isOnline: s.isOnline, departmentId: s.department.id,
    });
  };

  const cancel = () => { setEditing(null); setCreating(false); };

  const save = async () => {
    setSaving(true);
    try {
      const payload = {
        name: form.name, description: form.description, requirements: form.requirements,
        processTime: form.processTime, fee: form.fee, isOnline: form.isOnline,
      };
      if (creating) {
        await api.post('/services', { ...payload, slug: form.slug, category: form.category, zoneId, departmentId: form.departmentId });
      } else if (editing) {
        await api.patch(`/services/${editing.id}`, payload);
      }
      cancel(); load();
    } catch {
      alert('Save failed — check required fields.');
    } finally { setSaving(false); }
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this service? This cannot be undone.')) return;
    await api.delete(`/services/${id}`);
    load();
  };

  const showForm = creating || editing;

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold text-coffee-950">Services</h1>
        {!showForm && (
          <button onClick={startCreate} className="rounded-md bg-clay-600 px-4 py-2 text-sm font-semibold text-white hover:bg-clay-500">
            + New Service
          </button>
        )}
      </div>

      {showForm && (
        <div className="mt-6 rounded-lg border border-coffee-950/10 bg-white p-6">
          <h2 className="font-display text-lg font-semibold text-coffee-950">
            {creating ? 'New Service' : `Edit: ${editing?.name}`}
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-coffee-950">Name</label>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1 w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm" />
            </div>
            {creating && (
              <div>
                <label className="block text-sm font-medium text-coffee-950">Slug</label>
                <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="mt-1 w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm" />
              </div>
            )}
            {creating && (
              <div>
                <label className="block text-sm font-medium text-coffee-950">Department</label>
                <select value={form.departmentId} onChange={(e) => setForm({ ...form, departmentId: e.target.value })} className="mt-1 w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm">
                  {departments.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
                </select>
              </div>
            )}
            {creating && (
              <div>
                <label className="block text-sm font-medium text-coffee-950">Category</label>
                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="mt-1 w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm">
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c.replace(/_/g, ' ')}</option>)}
                </select>
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-coffee-950">Processing Time</label>
              <input value={form.processTime} onChange={(e) => setForm({ ...form, processTime: e.target.value })} placeholder="e.g. 3 business days" className="mt-1 w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-coffee-950">Fee</label>
              <input value={form.fee} onChange={(e) => setForm({ ...form, fee: e.target.value })} placeholder="e.g. 50 ETB" className="mt-1 w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm" />
            </div>
            <label className="flex items-center gap-2 text-sm text-coffee-950">
              <input type="checkbox" checked={form.isOnline} onChange={(e) => setForm({ ...form, isOnline: e.target.checked })} />
              Available to apply online
            </label>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-coffee-950">Description</label>
              <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="mt-1 w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-coffee-950">Requirements</label>
              <textarea value={form.requirements} onChange={(e) => setForm({ ...form, requirements: e.target.value })} rows={3} className="mt-1 w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm" />
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
          {services.map((s) => (
            <div key={s.id} className="flex items-center justify-between px-5 py-3">
              <div>
                <p className="font-medium text-coffee-950">{s.name}</p>
                <p className="text-xs text-coffee-600">{s.department.name} · {s.category.replace(/_/g, ' ')}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => startEdit(s)} className="text-sm text-clay-600 hover:underline">Edit</button>
                <button onClick={() => remove(s.id)} className="text-sm text-red-600 hover:underline">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}