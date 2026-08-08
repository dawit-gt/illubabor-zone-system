'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth';

const NAV = [
  { href: '/admin/dashboard', label: 'Dashboard' },
  { href: '/admin/departments', label: 'Departments' },
  { href: '/admin/woredas', label: 'Woredas' },
  { href: '/admin/news', label: 'News' },
  { href: '/admin/services', label: 'Services' },
  { href: '/admin/documents', label: 'Documents' },
  { href: '/admin/users', label: 'Users' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) router.replace('/auth/login');
  }, [loading, user, router]);

  if (loading || !user) return null;

  return (
    <div className="flex min-h-screen bg-parchment-50">
      <aside className="w-56 shrink-0 border-r border-coffee-950/10 bg-coffee-950 text-parchment-100">
        <div className="px-5 py-5">
          <p className="font-display text-sm font-semibold text-parchment-50">Illubabor Admin</p>
          <p className="mt-1 text-xs text-parchment-100/60">{user.email}</p>
        </div>
        <nav className="mt-2 flex flex-col">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-5 py-2.5 text-sm ${
                pathname === item.href
                  ? 'bg-coffee-800 text-parchment-50'
                  : 'text-parchment-100/80 hover:bg-coffee-800/50'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <button
          onClick={logout}
          className="mx-5 mt-6 rounded-md border border-parchment-100/20 px-3 py-1.5 text-xs hover:bg-coffee-800"
        >
          Sign out
        </button>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}