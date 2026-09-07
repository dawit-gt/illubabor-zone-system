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
            <div className="group relative order-1 h-56 w-full overflow-hidden sm:h-64 md:order-2 md:h-[320px] md:w-[42%] lg:h-[340px]">
              <img
                src={welcome.adminPhotoUrl}
                alt={welcome.adminName || TITLE[lang]}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-coffee-950/30 via-transparent to-transparent" />
            </div>
          )}

          <div
            className={`relative order-2 flex w-full flex-col justify-center px-6 py-8 sm:px-8 sm:py-9 md:order-1 md:w-[58%] md:px-10 md:py-10 ${
              !welcome.adminPhotoUrl ? 'md:w-full' : ''
            }`}
          >
            <span className="pointer-events-none absolute -left-1 top-0 select-none font-display text-7xl leading-none text-clay-600/10 sm:text-8xl">
              "
            </span>

            <div className="relative max-w-2xl">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-clay-700">
                {TITLE[lang]}
              </p>

              <h3 className="font-display text-2xl font-semibold leading-tight text-ink-950 sm:text-3xl">
                {TITLE[lang]}
              </h3>

              <p className="mt-4 whitespace-pre-line text-sm leading-7 text-ink-700 sm:text-base">
                {text}
              </p>

              {welcome.adminName && (
                <div className="mt-6 flex items-center gap-3">
                  <span className="h-px w-8 shrink-0 bg-clay-600" />

                  <div>
                    <p className="text-sm font-semibold text-ink-950 sm:text-base">
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