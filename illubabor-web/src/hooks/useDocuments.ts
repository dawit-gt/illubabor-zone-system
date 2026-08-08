'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

interface Document {
  id: string;
  title: string;
  titleOm?: string;
  titleAm?: string;
  type: string;
  fileUrl: string;
  fileSizeKb?: number;
  createdAt: string;
}

export function useDocuments() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/documents')
      .then((res) => setDocuments(res.data))
      .catch(() => setDocuments([]))
      .finally(() => setLoading(false));
  }, []);

  return { documents, loading };
}