'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

interface Department {
  id: string;
  name: string;
  nameOm?: string;
  nameAm?: string;
  slug: string;
  description?: string;
  _count: {
    services: number;
  };
}

export function useDepartments() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/departments')
      .then((res) => {
        const validDepartments = Array.isArray(res.data)
          ? res.data.filter(
              (department: Department) =>
                department.name?.trim() && department.slug?.trim()
            )
          : [];

        setDepartments(validDepartments);
      })
      .catch(() => {
        setDepartments([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return {
    departments,
    loading,
  };
}