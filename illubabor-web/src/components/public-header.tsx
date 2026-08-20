'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/lib/language-provider';
import { LANGUAGES } from '@/lib/i18n';

type NavItem = {
  href?: string;
  label: { om: string; am: string; en: string };
  children?: {
    href: string;
    label: { om: string; am: string; en: string };
  }[];
};

const NAV_LINKS: NavItem[] = [
  {
    href: '/',
    label: { om: 'Mana', am: 'መነሻ', en: 'Home' },
  },
  {
    href: '/about',
    label: { om: "Waa'ee Keenya", am: 'ስለ እኛ', en: 'About' },
  },
  {
    href: '/woredas',
    label: { om: 'Aanaalee', am: 'ወረዳዎች', en: 'Woredas' },
  },
  {
    href: '/departments',
    label: { om: 'Waajjiraalee', am: 'መምሪያዎች', en: 'Departments' },
  },
  {
    href: '/services',
    label: { om: 'Tajaajila', am: 'አገልግሎቶች', en: 'Services' },
  },
  {
    href: '/news',
    label: { om: 'Oduu', am: 'ዜናዎች', en: 'News' },
  },
  {
    href: '/investment',
    label: {
      om: 'Invastimantii',
      am: 'ኢንቨስትመንት',
      en: 'Investment',
    },
    children: [
      {
        href: '/investment/opportunities',
        label: {
          om: 'Carraalee Invastimantii',
          am: 'የኢንቨስትመንት እድሎች',
          en: 'Investment Opportunities',
        },
      },
      {
        href: '/investment/how-to-invest',
        label: {
          om: 'Akkaataa Invastimantii',
          am: 'እንዴት ኢንቨስት ማድረግ እንደሚቻል',
          en: 'How to Invest',
        },
      },
      {
        href: '/investment/land-plots',
        label: {
          om: 'Lafa fi Bakka Invastimantii',
          am: 'መሬትና የኢንቨስትመንት ቦታዎች',
          en: 'Land & Investment Plots',
        },
      },
      {
        href: '/investment/projects',
        label: {
          om: 'Pirojektoota',
          am: 'ፕሮጀክቶች',
          en: 'Projects',
        },
      },
    ],
  },
  {
    href: '/transparency',
    label: { om: "Ifa Ta'uu", am: 'ግልጽነት', en: 'Transparency' },
  },
  {
    href: '/gallery',
    label: { om: 'Suuraalee', am: 'ፎቶ ማዕከል', en: 'Gallery' },
  },
  {
    href: '/contact',
    label: { om: 'Qunnamtii', am: 'አድራሻ', en: 'Contact' },
  },
];

export function PublicHeader() {
  const { language, setLanguage } = useLanguage();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 bg-coffee-950 text-parchment-50 shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="font-display text-lg font-semibold tracking-tight"
        >
          Illubabor Zone
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((item) => {
            const key = item.href ?? item.label.en;

            if (item.children) {
              const isOpen = openDropdown === key;

              return (
                <div
                  key={key}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(key)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <div className="flex items-center">
                    {/* Investment landing page */}
                    <Link
                      href={item.href!}
                      className="text-sm font-medium text-parchment-100/90 transition-colors hover:text-clay-500"
                    >
                      {item.label[language]}
                    </Link>

                    {/* Dropdown toggle */}
                    <button
                      onClick={() =>
                        setOpenDropdown(isOpen ? null : key)
                      }
                      className="ml-1 flex items-center text-parchment-100/90 transition-colors hover:text-clay-500"
                      aria-label={`${item.label[language]} menu`}
                    >
                      <ChevronDown
                        size={14}
                        className={`transition-transform ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  </div>

                  {isOpen && (
                    <div className="absolute left-0 top-full mt-2 w-64 overflow-hidden rounded-lg bg-white py-2 shadow-lg">
                      {/* Landing page shortcut */}
                      <Link
                        href={item.href!}
                        className="block border-b border-gray-100 px-4 py-2.5 text-sm font-semibold text-clay-600 hover:bg-gray-50"
                        onClick={() => setOpenDropdown(null)}
                      >
                        {item.label[language]}
                      </Link>

                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2.5 text-sm text-ink-900 hover:bg-gray-100"
                          onClick={() => setOpenDropdown(null)}
                        >
                          {child.label[language]}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={key}
                href={item.href!}
                className="text-sm font-medium text-parchment-100/90 transition-colors hover:text-clay-500"
              >
                {item.label[language]}
              </Link>
            );
          })}
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-3">
          {/* Language */}
          <div className="relative">
            <button
              onClick={() => setLangOpen((v) => !v)}
              className="flex items-center gap-1 rounded-md border border-parchment-100/20 px-3 py-1.5 text-sm hover:border-clay-500"
            >
              {
                LANGUAGES.find((l) => l.code === language)
                  ?.label
              }
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

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <nav className="flex flex-col gap-1 border-t border-parchment-100/10 px-4 py-3 lg:hidden">
          {NAV_LINKS.map((item) => {
            const key = item.href ?? item.label.en;

            if (item.children) {
              const isExpanded = mobileExpanded === key;

              return (
                <div key={key}>
                  <div className="flex items-center">
                    {/* Mobile landing page link */}
                    <Link
                      href={item.href!}
                      onClick={() => setMobileOpen(false)}
                      className="flex-1 rounded px-2 py-2 text-sm hover:bg-coffee-800"
                    >
                      {item.label[language]}
                    </Link>

                    {/* Expand dropdown */}
                    <button
                      onClick={() =>
                        setMobileExpanded(
                          isExpanded ? null : key
                        )
                      }
                      className="rounded px-2 py-2 hover:bg-coffee-800"
                      aria-label={`Expand ${item.label[language]}`}
                    >
                      <ChevronDown
                        size={16}
                        className={`transition-transform ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="ml-3 flex flex-col gap-1 border-l border-parchment-100/10 pl-3">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="rounded px-2 py-2 text-sm text-parchment-100/80 hover:bg-coffee-800"
                          onClick={() => setMobileOpen(false)}
                        >
                          {child.label[language]}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={key}
                href={item.href!}
                className="rounded px-2 py-2 text-sm hover:bg-coffee-800"
                onClick={() => setMobileOpen(false)}
              >
                {item.label[language]}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}