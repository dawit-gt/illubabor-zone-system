'use client';

import { useLanguage } from '@/lib/language-provider';
import { useSiteConfig } from '@/hooks/useSiteConfig';

type Lang = 'om' | 'am' | 'en';

const TITLE = {
  om: 'Baga Nagaan Dhuftan',
  am: 'እንኳን ደህና መጡ',
  en: 'Welcome',
};

interface WelcomeData {
  text: Record<Lang, string>;
  adminName: string;
  adminTitle: Record<Lang, string>;
  adminPhotoUrl: string;
}

export function AdminWelcome() {
  const { language } = useLanguage();
  const lang = language as Lang;
  const { value: welcome, loading } = useSiteConfig<WelcomeData>('admin_welcome_message', {
    text: { om: '', am: '', en: '' }, adminName: '', adminTitle: { om: '', am: '', en: '' }, adminPhotoUrl: '',
  });

  if (loading) return null;
  const text = welcome.text[lang] || welcome.text.en || welcome.text.om || welcome.text.am;
  if (!text) return null;

  return (
    <div className="overflow-hidden rounded-2xl border border-coffee-950/10 bg-white shadow-sm">
      <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)]">
        <div className="relative flex flex-col justify-center px-8 py-10 sm:px-10">
          <span className="pointer-events-none absolute left-4 top-2 select-none font-display text-8xl leading-none text-clay-600/10">
            "
          </span>
          <h3 className="relative font-display text-2xl font-semibold text-ink-950">{TITLE[lang]}</h3>
          <p className="relative mt-4 whitespace-pre-line text-sm leading-relaxed text-ink-800">{text}</p>
          {welcome.adminName && (
            <div className="relative mt-6 flex items-center gap-3">
              <span className="h-px w-8 bg-clay-600" />
              <div>
                <p className="font-semibold text-ink-950">{welcome.adminName}</p>
                {welcome.adminTitle[lang] && <p className="text-sm text-ink-600">{welcome.adminTitle[lang]}</p>}
              </div>
            </div>
          )}
        </div>

        {welcome.adminPhotoUrl && (
          <div className="group relative min-h-[260px] overflow-hidden md:min-h-full">
            <img
              src={welcome.adminPhotoUrl}
              alt={welcome.adminName}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-coffee-950/30 via-transparent to-transparent" />
          </div>
        )}
      </div>
    </div>
  );
}