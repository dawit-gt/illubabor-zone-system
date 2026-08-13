'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/language-provider';

const COPY = {
  om: {
    tagline: 'Karaa toora interneetii biyyoolessaa kan Godina Illubaabor',
    contact: 'Qunnamtii',
    quickLinks: 'Liinkii Ariifachiisaa',
    rights: 'Mirgi hundi seeraan eegamaadha.',
  },
  am: {
    tagline: 'የኢሉአባቦር ዞን ኦፊሴላዊ ድህረ ገጽ',
    contact: 'አድራሻ',
    quickLinks: 'ፈጣን ማገናኛዎች',
    rights: 'መብቱ በህግ የተጠበቀ ነው።',
  },
  en: {
    tagline: 'Official public portal of Ilu Abba bor Zone',
    contact: 'Contact',
    quickLinks: 'Quick Links',
    rights: 'All rights reserved.',
  },
};

export function PublicFooter() {
  const { language } = useLanguage();
  const t = COPY[language];

  return (
    <footer className="bg-coffee-950 text-parchment-100/80">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <div className="flex items-center gap-2.5">
            <img
              src="/logo.png"
              alt="Ilu Abba Bor Zone logo"
              className="h-10 w-10 shrink-0 rounded-full object-cover"
            />
            <h3 className="font-display text-lg font-semibold text-parchment-50">Ilu Abba bor Zone</h3>
          </div>
          <p className="mt-2 text-sm">{t.tagline}</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-parchment-50">{t.quickLinks}</h4>
          <ul className="mt-2 space-y-1 text-sm">
            <li><Link href="/services" className="hover:text-clay-500">Services</Link></li>
            <li><Link href="/news" className="hover:text-clay-500">News</Link></li>
            <li><Link href="/transparency" className="hover:text-clay-500">Transparency</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-parchment-50">{t.contact}</h4>
          <p className="mt-2 text-sm">Metu, Illubabor Zone, Oromia, Ethiopia</p>
        </div>
      </div>
      <div className="border-t border-parchment-100/10 py-4 text-center text-xs">
        © {new Date().getFullYear()} Illubabor Zone Administration. {t.rights}
      </div>
    </footer>
  );
}