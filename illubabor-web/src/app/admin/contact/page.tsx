'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

type Lang = 'en' | 'om' | 'am';
interface Message { id: string; name: string; email: string; message: string; status: string; createdAt: string }

export default function AdminContactPage() {
  const [info, setInfo] = useState<{ address: Record<Lang, string>; email: string; phone: string }>({
    address: { en: '', om: '', am: '' }, email: '', phone: '',
  });
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const loadMessages = () => {
    api.get('/contact').then((res) => setMessages(res.data));
  };

  useEffect(() => {
    Promise.all([
      api.get('/site-config/contact_info').then((r) => JSON.parse(r.data.value)).catch(() => null),
    ]).then(([savedInfo]) => {
      if (savedInfo) setInfo(savedInfo);
    }).finally(() => setLoading(false));
    loadMessages();
  }, []);

  const saveInfo = async () => {
    setSaving(true);
    try { await api.put('/site-config/contact_info', { value: JSON.stringify(info) }); }
    finally { setSaving(false); }
  };

  const markRead = async (id: string) => { await api.patch(`/contact/${id}/status`, { status: 'READ' }); loadMessages(); };
  const archive = async (id: string) => { await api.patch(`/contact/${id}/status`, { status: 'ARCHIVED' }); loadMessages(); };
  const remove = async (id: string) => { if (!confirm('Delete this message permanently?')) return; await api.delete(`/contact/${id}`); loadMessages(); };

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-ink-950">Contact Page</h1>

      {loading ? (
        <div className="mt-6 text-sm text-ink-600">Loading…</div>
      ) : (
        <div className="mt-6 space-y-4">
          {(['en', 'om', 'am'] as Lang[]).map((lang) => (
            <div key={lang}>
              <label className="block text-sm font-medium text-ink-950 uppercase">{lang} — Office Address</label>
              <input value={info.address[lang]} onChange={(e) => setInfo({ ...info, address: { ...info.address, [lang]: e.target.value } })} className="mt-1 w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm" />
            </div>
          ))}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-ink-950">Contact Email</label>
              <input value={info.email} onChange={(e) => setInfo({ ...info, email: e.target.value })} className="mt-1 w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink-950">Contact Phone</label>
              <input value={info.phone} onChange={(e) => setInfo({ ...info, phone: e.target.value })} className="mt-1 w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm" />
            </div>
          </div>
          <button onClick={saveInfo} disabled={saving} className="rounded-md bg-clay-600 px-4 py-2 text-sm font-semibold text-white hover:bg-clay-500 disabled:opacity-60">
            {saving ? 'Saving…' : 'Save Contact Info'}
          </button>
        </div>
      )}

      <h2 className="mt-12 font-display text-xl font-semibold text-ink-950">Messages</h2>
      {messages.length === 0 ? (
        <p className="mt-4 text-sm text-ink-600">No messages yet.</p>
      ) : (
        <div className="mt-4 divide-y divide-coffee-950/10 rounded-lg border border-coffee-950/10 bg-white">
          {messages.map((m) => (
            <div key={m.id} className="px-5 py-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-ink-950">
                    {m.name} {m.status === 'NEW' && <span className="ml-2 rounded bg-clay-600/10 px-2 py-0.5 text-xs text-clay-600">New</span>}
                  </p>
                  <p className="text-xs text-ink-600">{m.email} · {new Date(m.createdAt).toLocaleString()}</p>
                </div>
                <div className="flex gap-2 text-sm">
                  {m.status === 'NEW' && <button onClick={() => markRead(m.id)} className="text-clay-600 hover:underline">Mark read</button>}
                  {m.status !== 'ARCHIVED' && <button onClick={() => archive(m.id)} className="text-ink-600 hover:underline">Archive</button>}
                  <button onClick={() => remove(m.id)} className="text-red-600 hover:underline">Delete</button>
                </div>
              </div>
              <p className="mt-2 text-sm text-ink-900">{m.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}