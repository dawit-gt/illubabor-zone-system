'use client';

import { useEffect, useState } from 'react';
import { useSiteConfig } from '@/hooks/useSiteConfig';

function ContourMotif() {
  return (
    <svg
      className="absolute inset-0 h-full w-full text-white/20"
      viewBox="0 0 800 360"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {[60, 110, 160, 210, 260, 310].map((y, i) => (
        <path
          key={y}
          d={`M0,${y} C150,${y - 40} 250,${y + 40} 400,${y} C550,${y - 40} 650,${y + 40} 800,${y}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          opacity={1 - i * 0.12}
        />
      ))}
    </svg>
  );
}

export function HeroCarousel() {
  const { value: images } = useSiteConfig<string[]>('hero_images', []);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;

    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [images.length]);

  useEffect(() => {
    if (index >= images.length) {
      setIndex(0);
    }
  }, [images.length, index]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-canopy-900">
      {images.length > 0 ? (
        images.map((src, i) => (
          <div
            key={`${src}-${i}`}
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
            style={{
              backgroundImage: `url("${src}")`,
              opacity: i === index ? 1 : 0,
            }}
          />
        ))
      ) : (
        <div className="absolute inset-0 bg-canopy-900" />
      )}

      <div className="absolute inset-0 bg-black/40" />

      <ContourMotif />

      {images.length > 1 && (
        <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === index
                  ? 'w-6 bg-parchment-50'
                  : 'w-1.5 bg-parchment-50/40'
              }`}
              aria-label={`Slide ${i + 1}`}
              aria-current={i === index}
            />
          ))}
        </div>
      )}
    </div>
  );
}