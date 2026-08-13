'use client';

import { useLanguage } from '@/lib/language-provider';
import { selectByLanguage } from '@/lib/i18n';
import { useGallery, GalleryPhoto } from '@/hooks/useGallery';

type Lang = 'om' | 'am' | 'en';

const CATEGORIES = ['ADMIN_OFFICE', 'PROJECTS', 'PUBLIC_EVENTS', 'INFRASTRUCTURE', 'PUBLIC_PARTICIPATION'] as const;

const CATEGORY_LABELS: Record<typeof CATEGORIES[number], Record<Lang, string>> = {
  ADMIN_OFFICE: { om: 'Waajjira Bulchiinsa Godinaa', am: 'የዞን አስተዳደር ጽ/ቤት', en: 'Zone Administration Office' },
  PROJECTS: { om: 'Pirojektoota', am: 'ፕሮጀክቶች', en: 'Projects' },
  PUBLIC_EVENTS: { om: 'Sagantaalee Ummataa', am: 'የህዝብ ዝግጅቶች', en: 'Public Events' },
  INFRASTRUCTURE: { om: 'Misooma Bu\'uuraalee Misoomaa', am: 'የመሠረተ ልማት ግንባታ', en: 'Development Infrastructure' },
  PUBLIC_PARTICIPATION: { om: 'Hirmaannaa fi Mari\'achiisa Ummataa', am: 'የህዝብ ተሳትፎና ምክክር', en: 'Public Participation & Consultation' },
};

export default function GalleryPage() {
  const { language } = useLanguage();
  const lang = language as Lang;
  const { photos, loading } = useGallery();

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-semibold text-coffee-950">
        {lang === 'om' ? 'Suuraalee' : lang === 'am' ? 'ፎቶ ማዕከል' : 'Gallery'}
      </h1>

      {loading ? (
        <div className="mt-6 text-sm text-coffee-600">Loading…</div>
      ) : (
        <div className="mt-10 space-y-14">
          {CATEGORIES.map((cat) => {
            const items = photos.filter((p) => p.category === cat);
            if (items.length === 0) return null;
            return (
              <section key={cat}>
                <h2 className="font-display text-xl font-semibold text-coffee-950">{CATEGORY_LABELS[cat][lang]}</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((p: GalleryPhoto) => (
                    <figure key={p.id} className="overflow-hidden rounded-lg border border-coffee-950/10 bg-white">
                      <img src={p.imageUrl} alt={p.caption ?? ''} className="h-48 w-full object-cover" />
                      {(p.caption || p.captionOm || p.captionAm) && (
                        <figcaption className="p-3 text-xs text-coffee-700">
                          {selectByLanguage(p, 'caption', language)}
                        </figcaption>
                      )}
                    </figure>
                  ))}
                </div>
              </section>
            );
          })}
          {photos.length === 0 && (
            <p className="text-sm text-coffee-600">No photos added yet.</p>
          )}
        </div>
      )}
    </div>
  );
}