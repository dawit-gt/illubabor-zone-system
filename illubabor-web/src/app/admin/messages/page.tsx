'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

interface Message { id: string; name: string; email: string; message: string; status: string; createdAt: string }

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    api.get('/contact').then((res) => setMessages(res.data)).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const markRead = async (id: string) => {
    await api.patch(`/contact/${id}/status`, { status: 'READ' });
    load();
  };

  const archive = async (id: string) => {
    await api.patch(`/contact/${id}/status`, { status: 'ARCHIVED' });
    load();
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this message permanently?')) return;
    await api.delete(`/contact/${id}`);
    load();
  };

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-coffee-950">Messages</h1>

      {loading ? (
        <div className="mt-6 text-sm text-coffee-600">Loading…</div>
      ) : messages.length === 0 ? (
        <p className="mt-6 text-sm text-coffee-600">No messages yet.</p>
      ) : (
        <div className="mt-6 divide-y divide-coffee-950/10 rounded-lg border border-coffee-950/10 bg-white">
          {messages.map((m) => (
            <div key={m.id} className="px-5 py-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-coffee-950">
                    {m.name} {m.status === 'NEW' && <span className="ml-2 rounded bg-clay-600/10 px-2 py-0.5 text-xs text-clay-600">New</span>}
                  </p>
                  <p className="text-xs text-coffee-600">{m.email} · {new Date(m.createdAt).toLocaleString()}</p>
                </div>
                <div className="flex gap-2 text-sm">
                  {m.status === 'NEW' && <button onClick={() => markRead(m.id)} className="text-clay-600 hover:underline">Mark read</button>}
                  {m.status !== 'ARCHIVED' && <button onClick={() => archive(m.id)} className="text-coffee-600 hover:underline">Archive</button>}
                  <button onClick={() => remove(m.id)} className="text-red-600 hover:underline">Delete</button>
                </div>
              </div>
              <p className="mt-2 text-sm text-coffee-900">{m.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}