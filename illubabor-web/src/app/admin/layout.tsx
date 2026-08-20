'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useAuth } from '@/lib/auth';

const NAV = [
  { href: '/admin/dashboard', label: 'Dashboard' },
  { href: '/admin/home', label: 'Home' },
  { href: '/admin/about', label: 'About' },
  { href: '/admin/woredas', label: 'Woredas' },
  { href: '/admin/departments', label: 'Departments' },
  { href: '/admin/services', label: 'Services' },
  { href: '/admin/news', label: 'News' },
  { href: '/admin/investment', label: 'Investment' },
  { href: '/admin/documents', label: 'Documents' },
  { href: '/admin/gallery', label: 'Gallery' },
  { href: '/admin/contact', label: 'Contact' },
  { href: '/admin/users', label: 'Users' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.replace('/auth/login');
  }, [loading, user, router]);

  useEffect(() => {
    setSidebarOpen(false); // close mobile sidebar on navigation
  }, [pathname]);

  if (loading || !user) return null;

  return (
    <div className="flex min-h-screen bg-parchment-50">
      {/* Mobile top bar */}
      <div className="fixed inset-x-0 top-0 z-40 flex items-center justify-between border-b border-coffee-950/10 bg-coffee-950 px-4 py-3 text-parchment-50 lg:hidden">
        <p className="font-display text-sm font-semibold">Illubabor Admin</p>
        <button onClick={() => setSidebarOpen((v) => !v)} aria-label="Toggle menu">
          {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Backdrop for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black/40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-56 shrink-0 border-r border-coffee-950/10 bg-coffee-950 text-parchment-100 transition-transform lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="px-5 py-5 pt-16 lg:pt-5">
          <p className="hidden font-display text-sm font-semibold text-parchment-50 lg:block">Illubabor Admin</p>
          <p className="mt-1 text-xs text-parchment-100/60">{user.email}</p>
        </div>
        <nav className="mt-2 flex flex-col overflow-y-auto">
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

      <main className="flex-1 p-4 pt-20 sm:p-8 lg:pt-8">{children}</main>
    </div>
  );
}