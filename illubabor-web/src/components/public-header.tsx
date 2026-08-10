'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/lib/language-provider';
import { LANGUAGES } from '@/lib/i18n';

const NAV_LINKS = [
  { href: '/', label: { om: 'Mana', am: 'መነሻ', en: 'Home' } },
  { href: '/about', label: { om: 'Waa\'ee Keenya', am: 'ስለ እኛ', en: 'About' } },
  { href: '/woredas', label: { om: 'Aanaalee', am: 'ወረዳዎች', en: 'Woredas' } },
  { href: '/departments', label: { om: 'Waajjiraalee', am: 'መምሪያዎች', en: 'Departments' } },
  { href: '/services', label: { om: 'Tajaajila', am: 'አገልግሎቶች', en: 'Services' } },
  { href: '/news', label: { om: 'Oduu', am: 'ዜናዎች', en: 'News' } },
  { href: '/transparency', label: { om: 'Ifa Ta\'uu', am: 'ግልጽነት', en: 'Transparency' } },
  { href: '/contact', label: { om: 'Qunnamtii', am: 'አድራሻ', en: 'Contact' } },
];

export function PublicHeader() {
  const { language, setLanguage } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-coffee-950 text-parchment-50 shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="font-display text-lg font-semibold tracking-tight">
          Illubabor Zone
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-parchment-100/90 transition-colors hover:text-clay-500"
            >
              {link.label[language]}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              onClick={() => setLangOpen((v) => !v)}
              className="flex items-center gap-1 rounded-md border border-parchment-100/20 px-3 py-1.5 text-sm hover:border-clay-500"
            >
              {LANGUAGES.find((l) => l.code === language)?.label}
              <ChevronDown size={14} />
            </button>

            {langOpen && (
              <div className="absolute right-0 mt-1 w-40 rounded-md bg-coffee-800 py-1 shadow-lg">
                {LANGUAGES.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLanguage(l.code);
                      setLangOpen(false);
                    }}
                    className="block w-full px-4 py-2 text-left text-sm hover:bg-coffee-600"
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            className="lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="flex flex-col gap-1 border-t border-parchment-100/10 px-4 py-3 lg:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded px-2 py-2 text-sm hover:bg-coffee-800"
              onClick={() => setMobileOpen(false)}
            >
              {link.label[language]}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}