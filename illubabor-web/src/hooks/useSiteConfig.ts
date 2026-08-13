'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

export function useSiteConfig<T>(key: string, fallback: T) {
  const [value, setValue] = useState<T>(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/site-config/${key}`)
      .then((res) => {
        try {
          const parsed = JSON.parse(res.data.value);
          // Merge object configs with their fallback so keys that were
          // never saved (e.g. a new toggle added after the config was
          // first written) fall back instead of silently disappearing.
          // Arrays and primitives are replaced as-is.
          if (isPlainObject(fallback) && isPlainObject(parsed)) {
            setValue({ ...fallback, ...parsed } as T);
          } else {
            setValue(parsed);
          }
        } catch {
          /* malformed JSON in DB — keep fallback */
        }
      })
      .catch(() => { /* not set yet — keep fallback */ })
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return { value, loading };
}
