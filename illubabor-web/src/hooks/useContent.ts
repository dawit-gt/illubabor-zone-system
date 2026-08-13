'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

export interface ContentEntry {
  id: string;
  type: 'HISTORICAL_SITE' | 'CULTURAL_TOPIC';
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
}

export function useContent(type?: 'HISTORICAL_SITE' | 'CULTURAL_TOPIC') {
  const [entries, setEntries] = useState<ContentEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/content', { params: type ? { type } : {} })
      .then((res) => setEntries(res.data))
      .catch(() => setEntries([]))
      .finally(() => setLoading(false));
  }, [type]);

  return { entries, loading };
}