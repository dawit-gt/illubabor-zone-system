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

export function useDocuments(page: number = 1) {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    api
      .get('/documents', { params: { page } })
      .then((res) => {
        setDocuments(res.data.data);
        setTotalPages(res.data.totalPages);
      })
      .catch(() => {
        setDocuments([]);
        setTotalPages(1);
      })
      .finally(() => setLoading(false));
  }, [page]);

  return { documents, totalPages, loading };
}