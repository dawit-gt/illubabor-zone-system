'use client';

import { useState } from 'react';
import { useLanguage } from '@/lib/language-provider';
import { useSiteConfig } from '@/hooks/useSiteConfig';

type Lang = 'om' | 'am' | 'en';

const TITLE = {
  om: 'Baga Nagaan Dhuftan',
  am: 'እንኳን ደህና መጡ',
  en: 'Welcome',
};

const READ_MORE = {
  om: 'Dabalataan dubbisi',
  am: 'ተጨማሪ ያንብቡ',
  en: 'Read more',
};

const READ_LESS = {
  om: 'Gabaabsi',
  am: 'አሳጥር',
  en: 'Show less',
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
  const [expanded, setExpanded] = useState(false);

  const { value: welcome, loading } = useSiteConfig<WelcomeData>(
    'admin_welcome_message',
    {
      text: { om: '', am: '', en: '' },
      adminName: '',
      adminTitle: { om: '', am: '', en: '' },
      adminPhotoUrl: '',
    }
  );

  if (loading) return null;

  const text =
    welcome.text[lang] ||
    welcome.text.en ||
    welcome.text.om ||
    welcome.text.am;

  if (!text) return null;

  return (
    <section className="mx-auto w-full max-w-6xl">
      <div className="overflow-hidden rounded-2xl border border-coffee-950/10 bg-white shadow-sm">
        <div className="flex flex-col md:flex-row">

          {welcome.adminPhotoUrl && (
            <div className="relative order-1 w-full shrink-0 md:order-2 md:w-[38%]">
              <div className="relative aspect-[16/10] w-full overflow-hidden md:aspect-auto md:h-full md:min-h-[320px]">
                <img
                  src={welcome.adminPhotoUrl}
                  alt={welcome.adminName || TITLE[lang]}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-[1.025]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
              </div>
            </div>
          )}

          <div
            className={`order-2 flex min-w-0 flex-1 flex-col justify-center px-6 py-7 sm:px-8 sm:py-8 md:order-1 md:px-10 md:py-9 ${
              !welcome.adminPhotoUrl ? 'md:w-full' : ''
            }`}
          >
            <div className="max-w-2xl">

              <div className="mb-4 flex items-center gap-3">
                <span className="h-px w-8 bg-clay-600" />

                <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-clay-700">
                  {TITLE[lang]}
                </span>
              </div>

              <h3 className="font-display text-2xl font-semibold leading-tight text-ink-950 sm:text-3xl">
                {TITLE[lang]}
              </h3>

              <div className="relative mt-4">
                <p
                  className={`whitespace-pre-line text-sm leading-6 text-ink-700 sm:text-[15px] sm:leading-7 ${
                    expanded ? '' : 'line-clamp-7'
                  }`}
                >
                  {text}
                </p>
              </div>

              {text.length > 500 && (
                <button
                  type="button"
                  onClick={() => setExpanded(!expanded)}
                  className="mt-3 text-sm font-semibold text-clay-700 transition-colors hover:text-clay-900"
                >
                  {expanded ? READ_LESS[lang] : READ_MORE[lang]}
                </button>
              )}

              {welcome.adminName && (
                <div className="mt-6 flex items-center gap-3">
                  <div className="h-px w-8 shrink-0 bg-clay-600" />

                  <div>
                    <p className="text-sm font-bold text-ink-950 sm:text-base">
                      {welcome.adminName}
                    </p>

                    {welcome.adminTitle[lang] && (
                      <p className="mt-0.5 text-xs text-ink-600 sm:text-sm">
                        {welcome.adminTitle[lang]}
                      </p>
                    )}
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}