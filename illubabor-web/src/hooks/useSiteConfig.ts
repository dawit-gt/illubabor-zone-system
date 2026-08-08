'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

export function useSiteConfig<T>(key: string, fallback: T) {
  const [value, setValue] = useState<T>(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/site-config/${key}`)
      .then((res) => {
        try { setValue(JSON.parse(res.data.value)); } catch { /* keep fallback */ }
      })
      .catch(() => { /* not set yet — keep fallback */ })
      .finally(() => setLoading(false));
  }, [key]);

  return { value, loading };
}