'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

interface Zone {
  id: string;
  name: string;
  capital: string;
  population: number;
  populationMale?: number;
  populationFemale?: number;
  areaKm2: number;
  elevationMin?: number;
  elevationMax?: number;
  urbanKebeles?: number;
  ruralKebeles?: number;
  description: string;
  _count: { woredas: number; departments: number; news: number };
}

export function useZone() {
  const [zone, setZone] = useState<Zone | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/zones/current')
      .then((res) => setZone(res.data))
      .catch(() => setZone(null))
      .finally(() => setLoading(false));
  }, []);

  return { zone, loading };
}