'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

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

export function useNews() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/news')
      .then((res) => setNews(res.data))
      .catch(() => setNews([]))
      .finally(() => setLoading(false));
  }, []);

  return { news, loading };
}