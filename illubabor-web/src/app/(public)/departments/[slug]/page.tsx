'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { api } from '@/lib/api';
import { useLanguage } from '@/lib/language-provider';
import { selectByLanguage } from '@/lib/i18n';

export default function DepartmentDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { language } = useLanguage();
  const [dept, setDept] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    api.get(`/departments/${slug}`)
      .then((res) => setDept(res.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="mx-auto max-w-7xl px-4 py-16 text-sm text-coffee-600">Loading…</div>;
  if (error || !dept) return <div className="mx-auto max-w-7xl px-4 py-16 text-sm text-coffee-600">Department not found.</div>;

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-semibold text-coffee-950">
        {selectByLanguage(dept, 'name', language)}
      </h1>
      {dept.description && <p className="mt-4 max-w-2xl text-coffee-800">{dept.description}</p>}
      {(dept.headName || dept.contactEmail || dept.contactPhone) && (
        <div className="mt-4 text-sm text-coffee-600">
          {dept.headName && <p>Head: {dept.headName}</p>}
          {dept.contactEmail && <p>Email: {dept.contactEmail}</p>}
          {dept.contactPhone && <p>Phone: {dept.contactPhone}</p>}
        </div>
      )}

      <h2 className="mt-10 font-display text-xl font-semibold text-coffee-950">Services</h2>
      {dept.services.length === 0 ? (
        <p className="mt-3 text-sm text-coffee-600">No services listed yet.</p>
      ) : (
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {dept.services.map((s: any) => (
            <div key={s.id} className="rounded-md border border-coffee-950/10 bg-white p-4">
              <h3 className="font-semibold text-coffee-950">{selectByLanguage(s, 'name', language)}</h3>
              <p className="mt-1 text-xs text-coffee-600">{s.category.replace(/_/g, ' ')}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}