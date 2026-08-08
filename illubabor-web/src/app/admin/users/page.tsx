'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

interface User { id: string; email: string; fullName: string; role: string; isActive: boolean }

const ROLES = ['SUPER_ADMIN', 'ZONE_ADMIN', 'WOREDA_ADMIN', 'DEPARTMENT_HEAD', 'STAFF', 'PUBLIC'];

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({ email: '', password: '', fullName: '', role: 'STAFF' });
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    api.get('/users').then((res) => setUsers(res.data)).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const startCreate = () => {
    setCreating(true);
    setForm({ email: '', password: '', fullName: '', role: 'STAFF' });
  };

  const save = async () => {
    setSaving(true);
    try {
      await api.post('/users', form);
      setCreating(false);
      load();
    } catch {
      alert('Save failed — email may already be in use.');
    } finally { setSaving(false); }
  };

  const changeRole = async (id: string, role: string) => {
    await api.patch(`/users/${id}`, { role });
    load();
  };

  const deactivate = async (id: string) => {
    if (!confirm('Deactivate this user? They will no longer be able to log in.')) return;
    await api.delete(`/users/${id}`);
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold text-coffee-950">Users</h1>
        {!creating && (
          <button onClick={startCreate} className="rounded-md bg-clay-600 px-4 py-2 text-sm font-semibold text-white hover:bg-clay-500">
            + New User
          </button>
        )}
      </div>

      {creating && (
        <div className="mt-6 rounded-lg border border-coffee-950/10 bg-white p-6">
          <h2 className="font-display text-lg font-semibold text-coffee-950">New User</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-coffee-950">Full Name</label>
              <input value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} className="mt-1 w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-coffee-950">Email</label>
              <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} type="email" className="mt-1 w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-coffee-950">Password</label>
              <input value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} type="password" className="mt-1 w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-coffee-950">Role</label>
              <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="mt-1 w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm">
                {ROLES.map((r) => <option key={r} value={r}>{r.replace(/_/g, ' ')}</option>)}
              </select>
            </div>
          </div>
          <div className="mt-4 flex gap-3">
            <button onClick={save} disabled={saving} className="rounded-md bg-clay-600 px-4 py-2 text-sm font-semibold text-white hover:bg-clay-500 disabled:opacity-60">
              {saving ? 'Saving…' : 'Save'}
            </button>
            <button onClick={() => setCreating(false)} className="rounded-md border border-coffee-950/20 px-4 py-2 text-sm hover:bg-coffee-950/5">Cancel</button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="mt-6 text-sm text-coffee-600">Loading…</div>
      ) : (
        <div className="mt-6 divide-y divide-coffee-950/10 rounded-lg border border-coffee-950/10 bg-white">
          {users.map((u) => (
            <div key={u.id} className="flex items-center justify-between px-5 py-3">
              <div>
                <p className="font-medium text-coffee-950">{u.fullName} {!u.isActive && <span className="ml-2 rounded bg-red-100 px-2 py-0.5 text-xs text-red-700">Inactive</span>}</p>
                <p className="text-xs text-coffee-600">{u.email}</p>
              </div>
              <div className="flex items-center gap-3">
                <select value={u.role} onChange={(e) => changeRole(u.id, e.target.value)} className="rounded-md border border-coffee-950/20 px-2 py-1 text-xs">
                  {ROLES.map((r) => <option key={r} value={r}>{r.replace(/_/g, ' ')}</option>)}
                </select>
                <button onClick={() => deactivate(u.id)} className="text-sm text-red-600 hover:underline">Deactivate</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}