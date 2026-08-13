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

export function useGallery() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [loading, setLoading] = useState(true);

  const reload = () => {
    setLoading(true);
    api.get('/gallery').then((res) => setPhotos(res.data)).finally(() => setLoading(false));
  };

  useEffect(() => { reload(); }, []);

  return { photos, loading, reload };
}