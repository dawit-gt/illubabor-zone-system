'use client';

import { useEffect, useState } from 'react';

import { api } from '@/lib/api';

export interface GalleryPhoto {
  id: string;
  category: string;
  imageUrl: string;
  caption?: string;
  captionOm?: string;
  captionAm?: string;
}

export function useGallery(page: number = 1, limit: number = 24) {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const reload = () => {
    setLoading(true);

    api
      .get('/gallery', { params: { page, limit } })
      .then((res) => {
        setPhotos(res.data.data);
        setTotalPages(res.data.totalPages);
      })
      .catch(() => {
        setPhotos([]);
        setTotalPages(1);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    reload();
  }, [page, limit]);

  return { photos, totalPages, loading, reload };
}