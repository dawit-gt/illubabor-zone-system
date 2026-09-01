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
    if (!slug) return;

    api
      .get(`/news/${slug}`)
      .then((res) => setArticle(res.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-sm text-coffee-600">
        Loading…
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-sm text-coffee-600">
        Article not found.
      </div>
    );
  }

  const title = selectByLanguage(article, 'title', language);
  const content = selectByLanguage(article, 'content', language);

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Published Date */}
      {article.publishedAt && (
        <p className="font-mono text-xs uppercase tracking-wide text-clay-600">
          {new Date(article.publishedAt).toLocaleDateString(
            language === 'en' ? 'en-US' : undefined,
          )}
        </p>
      )}

      {/* Title */}
      <h1 className="mt-2 font-display text-3xl font-semibold text-coffee-950 sm:text-4xl">
        {title}
      </h1>

      {/* Cover Image */}
      {article.coverImage && (
        <div className="mt-6 overflow-hidden rounded-xl">
          <img
            src={article.coverImage}
            alt={title}
            className="h-auto max-h-[500px] w-full object-cover"
          />
        </div>
      )}

      {/* Article Content */}
      <div className="prose mt-8 max-w-none whitespace-pre-line text-coffee-900">
        {content}
      </div>

      {/* Image Gallery */}
      {article.images && article.images.length > 0 && (
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {article.images.map((url: string, i: number) => (
            <img
              key={i}
              src={url}
              alt=""
              className="w-full rounded-lg border border-coffee-950/10 object-cover"
            />
          ))}
        </div>
      )}
    </article>
  );
}