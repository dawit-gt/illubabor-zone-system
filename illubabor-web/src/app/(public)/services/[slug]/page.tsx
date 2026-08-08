'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { api } from '@/lib/api';
import { useLanguage } from '@/lib/language-provider';
import { useAuth } from '@/lib/auth';
import { selectByLanguage } from '@/lib/i18n';

export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { language } = useLanguage();
  const { user } = useAuth();
  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    api.get(`/services/${slug}`)
      .then((res) => setService(res.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [slug]);

  const handleApply = async () => {
    if (!service) return;
    setApplying(true);
    try {
      await api.post(`/services/${service.id}/apply`, {});
      setApplied(true);
    } catch {
      // not logged in or request failed — user stays on page, button re-enables
    } finally {
      setApplying(false);
    }
  };

  if (loading) return <div className="mx-auto max-w-3xl px-4 py-16 text-sm text-coffee-600">Loading…</div>;
  if (error || !service) return <div className="mx-auto max-w-3xl px-4 py-16 text-sm text-coffee-600">Service not found.</div>;

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="font-mono text-xs uppercase tracking-wide text-clay-600">
        {service.category.replace(/_/g, ' ')}
      </p>
      <h1 className="mt-2 font-display text-3xl font-semibold text-coffee-950">
        {selectByLanguage(service, 'name', language)}
      </h1>
      <p className="mt-1 text-sm text-coffee-600">{service.department.name}</p>

      <p className="mt-6 text-coffee-900">{selectByLanguage(service, 'description', language)}</p>

      {service.requirements && (
        <div className="mt-6">
          <h2 className="font-display text-lg font-semibold text-coffee-950">Requirements</h2>
          <p className="mt-2 whitespace-pre-line text-sm text-coffee-800">{service.requirements}</p>
        </div>
      )}

      <div className="mt-6 flex gap-6 text-sm text-coffee-600">
        {service.processTime && <span>Processing time: {service.processTime}</span>}
        {service.fee && <span>Fee: {service.fee}</span>}
      </div>

      {service.isOnline && (
        <div className="mt-8">
          {applied ? (
            <p className="text-sm font-medium text-canopy-700">Application submitted successfully.</p>
          ) : user ? (
            <button
              onClick={handleApply}
              disabled={applying}
              className="rounded-md bg-clay-600 px-6 py-3 text-sm font-semibold text-white hover:bg-clay-500 disabled:opacity-60"
            >
              {applying ? 'Submitting…' : 'Apply for this service'}
            </button>
          ) : (
            <p className="text-sm text-coffee-600">
              Please <a href="/auth/login" className="text-clay-600 underline">sign in</a> to apply online.
            </p>
          )}
        </div>
      )}
    </div>
  );
}