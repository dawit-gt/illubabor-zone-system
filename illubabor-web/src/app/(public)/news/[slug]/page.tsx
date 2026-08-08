'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { api } from '@/lib/api';
import { useLanguage } from '@/lib/language-provider';
import { selectByLanguage } from '@/lib/i18n';

export default function NewsDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { language } = useLanguage();
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    api.get(`/news/${slug}`)
      .then((res) => setArticle(res.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="mx-auto max-w-3xl px-4 py-16 text-sm text-coffee-600">Loading…</div>;
  if (error || !article) return <div className="mx-auto max-w-3xl px-4 py-16 text-sm text-coffee-600">Article not found.</div>;

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="font-mono text-xs uppercase tracking-wide text-clay-600">
        {new Date(article.publishedAt).toLocaleDateString(language === 'en' ? 'en-US' : undefined)}
      </p>
      <h1 className="mt-2 font-display text-3xl font-semibold text-coffee-950">
        {selectByLanguage(article, 'title', language)}
      </h1>
      <div className="prose mt-6 max-w-none whitespace-pre-line text-coffee-900">
        {selectByLanguage(article, 'content', language)}
      </div>
    </article>
  );
}