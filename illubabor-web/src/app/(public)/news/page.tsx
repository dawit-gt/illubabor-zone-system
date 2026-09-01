'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/language-provider';
import { selectByLanguage } from '@/lib/i18n';
import { useNews } from '@/hooks/useNews';

interface NewsItem {
  id: string;
  title: string;
  titleOm?: string;
  titleAm?: string;
  slug: string;
  excerpt?: string;
  coverImage?: string;
  tags: string[];
  publishedAt: string;
}

export default function NewsPage() {
  const { language } = useLanguage();
  const { news, loading } = useNews();

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-semibold text-coffee-950">
        {language === 'om'
          ? 'Oduu'
          : language === 'am'
            ? 'ዜናዎች'
            : 'News'}
      </h1>

      {loading ? (
        <div className="mt-6 text-sm text-coffee-600">
          Loading…
        </div>
      ) : news.length === 0 ? (
        <p className="mt-6 text-sm text-coffee-600">
          {language === 'om'
            ? 'Oduun hin jiru.'
            : language === 'am'
              ? 'ምንም ዜና የለም።'
              : 'No news published yet.'}
        </p>
      ) : (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {news.map((n) => (
            <Link
              key={n.id}
              href={`/news/${n.slug}`}
              className="overflow-hidden rounded-lg border border-coffee-950/10 bg-white transition-shadow hover:shadow-md"
            >
              {n.coverImage && (
                <img
                  src={n.coverImage}
                  alt=""
                  className="h-40 w-full object-cover"
                />
              )}

              <div className="p-5">
                <p className="font-mono text-xs uppercase tracking-wide text-clay-600">
                  {new Date(n.publishedAt).toLocaleDateString(
                    language === 'en' ? 'en-US' : undefined,
                  )}
                </p>

                <h3 className="mt-2 font-display text-lg font-semibold text-coffee-950">
                  {selectByLanguage(n, 'title', language)}
                </h3>

                {n.excerpt && (
                  <p className="mt-2 line-clamp-3 text-sm text-coffee-600">
                    {n.excerpt}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}