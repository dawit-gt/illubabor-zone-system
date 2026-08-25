'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

export interface ContentEntry {
  id: string;

  type:
    | 'HISTORICAL_SITE'
    | 'CULTURAL_TOPIC'
    | 'INVESTMENT_OPPORTUNITY'
    | 'PROJECT';

  title: string;
  titleOm?: string;
  titleAm?: string;

  summary?: string;
  summaryOm?: string;
  summaryAm?: string;

  body: string;
  bodyOm?: string;
  bodyAm?: string;

  imageUrl?: string;

  tag?: string;
  status?: string;
}

export function useContent(type?: ContentEntry['type']) {
  const [entries, setEntries] = useState<ContentEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    api
      .get('/content', {
        params: type ? { type } : {},
      })
      .then((res) => setEntries(res.data))
      .catch(() => setEntries([]))
      .finally(() => setLoading(false));
  }, [type]);

  return {
    entries,
    loading,
  };
}