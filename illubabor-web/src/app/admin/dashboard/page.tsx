'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';

interface Stats {
  woredas: number;
  departments: number;
  news: number;
  services: number;
  documents: number;
  newMessages: number;
  users: number;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    Promise.all([
      api.get('/woredas'),
      api.get('/departments'),
      api.get('/news/admin/all'),
      api.get('/services'),
      api.get('/documents'),
      api.get('/contact'),
      api.get('/users'),
    ]).then(([woredas, departments, news, services, documents, messages, users]) => {
      setStats({
        woredas: woredas.data.length,
        departments: departments.data.length,
        news: news.data.length,
        services: services.data.length,
        documents: documents.data.length,
        newMessages: messages.data.filter((m: any) => m.status === 'NEW').length,
        users: users.data.length,
      });
    });
  }, []);

  const cards = stats
    ? [
        { label: 'Woredas', value: stats.woredas, href: '/admin/woredas' },
        { label: 'Sectors', value: stats.departments, href: '/admin/departments' },
        { label: 'News Articles', value: stats.news, href: '/admin/news' },
        { label: 'Services', value: stats.services, href: '/admin/services' },
        { label: 'Documents', value: stats.documents, href: '/admin/documents' },
        { label: 'New Messages', value: stats.newMessages, href: '/admin/messages', highlight: stats.newMessages > 0 },
        { label: 'Users', value: stats.users, href: '/admin/users' },
      ]
    : [];

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-coffee-950">Dashboard</h1>
      <p className="mt-2 text-sm text-coffee-800">
        Use the sidebar to manage content, or jump straight in below.
      </p>

      {!stats ? (
        <div className="mt-6 text-sm text-coffee-600">Loading…</div>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {cards.map((c) => (
            <Link
              key={c.label}
              href={c.href}
              className={`rounded-lg border p-4 text-center transition-shadow hover:shadow-md ${
                c.highlight ? 'border-clay-600 bg-clay-600/5' : 'border-coffee-950/10 bg-white'
              }`}
            >
              <div className={`font-display text-2xl font-semibold ${c.highlight ? 'text-clay-600' : 'text-coffee-950'}`}>
                {c.value}
              </div>
              <div className="mt-1 text-xs text-coffee-600">{c.label}</div>
            </Link>
          ))}
        </div>
      )}

    </div>
  );
}