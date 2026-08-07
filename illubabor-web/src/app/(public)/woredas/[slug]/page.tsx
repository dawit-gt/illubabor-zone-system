'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { api } from '@/lib/api';
import { useLanguage } from '@/lib/language-provider';
import { selectByLanguage } from '@/lib/i18n';

export default function WoredaDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { language } = useLanguage();
  const [woreda, setWoreda] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    api.get(`/woredas/${slug}`)
      .then((res) => setWoreda(res.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="mx-auto max-w-7xl px-4 py-16 text-sm text-coffee-600">Loading…</div>;
  if (error || !woreda) return <div className="mx-auto max-w-7xl px-4 py-16 text-sm text-coffee-600">Woreda not found.</div>;

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-semibold text-coffee-950">
        {selectByLanguage(woreda, 'name', language)}
      </h1>
      {woreda.description && <p className="mt-4 max-w-2xl text-coffee-800">{woreda.description}</p>}

      <h2 className="mt-10 font-display text-xl font-semibold text-coffee-950">Kebeles</h2>
      <ul className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {woreda.kebeles.map((k: any) => (
          <li key={k.id} className="rounded-md border border-coffee-950/10 bg-white px-4 py-2 text-sm">
            {selectByLanguage(k, 'name', language)}
          </li>
        ))}
      </ul>
    </div>
  );
}