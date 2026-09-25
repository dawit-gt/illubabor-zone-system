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

export function useNews(page: number = 1) {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    api
      .get('/news', { params: { page } })
      .then((res) => {
        setNews(res.data.data);
        setTotalPages(res.data.totalPages);
      })
      .catch(() => {
        setNews([]);
        setTotalPages(1);
      })
      .finally(() => setLoading(false));
  }, [page]);

  return { news, totalPages, loading };
}