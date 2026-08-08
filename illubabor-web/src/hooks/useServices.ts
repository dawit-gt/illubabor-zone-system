'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

interface Service {
  id: string;
  name: string;
  nameOm?: string;
  nameAm?: string;
  slug: string;
  category: string;
  description: string;
  processTime?: string;
  fee?: string;
  isOnline: boolean;
  department: { name: string; slug: string };
}

export function useServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/services')
      .then((res) => setServices(res.data))
      .catch(() => setServices([]))
      .finally(() => setLoading(false));
  }, []);

  return { services, loading };
}