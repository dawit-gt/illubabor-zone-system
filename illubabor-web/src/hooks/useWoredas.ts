'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

interface Woreda {
  id: string;
  name: string;
  slug: string;
  isTown: boolean;
  _count: { kebeles: number };
}

export function useWoredas() {
  const [woredas, setWoredas] = useState<Woreda[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/woredas')
      .then((res) => setWoredas(res.data))
      .catch(() => setWoredas([]))
      .finally(() => setLoading(false));
  }, []);

  return { woredas, loading };
}