'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';

export default function AdminDashboardPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.replace('/auth/login');
  }, [loading, user, router]);

  if (loading || !user) return null;

  return (
    <div className="min-h-screen bg-parchment-50 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-coffee-950">Dashboard</h1>
          <p className="text-sm text-coffee-800">
            Signed in as {user.email} ({user.role})
          </p>
        </div>
        <button
          onClick={logout}
          className="rounded-md border border-coffee-950/20 px-4 py-2 text-sm hover:bg-coffee-950/5"
        >
          Sign out
        </button>
      </div>

      <div className="mt-8 rounded-lg border border-dashed border-coffee-600/30 p-8 text-center text-sm text-coffee-600">
        {/* Admin CRUD panels (departments, news, services, documents, users)
            land here in Phase 2, once the corresponding backend modules exist. */}
        Admin management panels will render here in Phase 2.
      </div>
    </div>
  );
}
