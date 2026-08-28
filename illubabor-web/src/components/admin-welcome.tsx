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
    <div className="grid gap-8 md:grid-cols-2 md:items-center">
      <div>
        <h3 className="font-display text-2xl font-semibold text-ink-950">
          {TITLE[lang]}
        </h3>

        <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-ink-800">
          {text}
        </p>

        {welcome.adminName && (
          <div className="mt-6">
            <p className="font-semibold text-ink-950">
              {welcome.adminName}
            </p>

            {welcome.adminTitle[lang] && (
              <p className="text-sm text-ink-600">
                {welcome.adminTitle[lang]}
              </p>
            )}
          </div>
        )}
      </div>

      {welcome.adminPhotoUrl && (
        <div className="flex justify-center md:justify-end">
          <img
            src={welcome.adminPhotoUrl}
            alt={welcome.adminName}
            className="aspect-[4/5] w-full max-w-xs rounded-lg object-cover"
          />
        </div>
      )}
    </div>
  );
}