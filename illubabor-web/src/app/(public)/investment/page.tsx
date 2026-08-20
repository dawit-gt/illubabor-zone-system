'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/language-provider';

type Lang = 'om' | 'am' | 'en';

const ITEMS: { href: string; label: Record<Lang, string>; desc: Record<Lang, string> }[] = [
  {
    href: '/investment/opportunities',
    label: { om: 'Carraalee Invastimantii', am: 'የኢንቨስትመንት እድሎች', en: 'Investment Opportunities' },
    desc: { om: 'Damee invastimantii godinicha keessatti banaa jiran', am: 'ክፍት የኢንቨስትመንት ዘርፎች በዞኑ ውስጥ', en: 'Open investment sectors across the zone' },
  },
  {
    href: '/investment/how-to-invest',
    label: { om: 'Akkaataa Invastimantii', am: 'እንዴት ኢንቨስት ማድረግ እንደሚቻል', en: 'How to Invest' },
    desc: { om: 'Tarkaanfiiwwan fi ragaalee barbaachisan', am: 'ደረጃዎችና የሚያስፈልጉ ሰነዶች', en: 'Steps and requirements to get started' },
  },
  {
    href: '/investment/land-plots',
    label: { om: 'Lafa fi Bakka Invastimantii', am: 'መሬትና የኢንቨስትመንት ቦታዎች', en: 'Land & Investment Plots' },
    desc: { om: 'Lafa invastimantiif qophaa\'e', am: 'ለኢንቨስትመንት የተዘጋጀ መሬት', en: 'Land prepared and available for investment' },
  },
  {
    href: '/investment/projects',
    label: { om: 'Pirojektoota', am: 'ፕሮጀክቶች', en: 'Projects' },
    desc: { om: 'Pirojektoota godinichaa keessatti hojjetamaa jiran', am: 'በዞኑ ውስጥ እየተከናወኑ ያሉ ፕሮጀክቶች', en: 'Projects underway across the zone' },
  },
];

export default function InvestmentLandingPage() {
  const { language } = useLanguage();
  const lang = language as Lang;

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-semibold text-ink-950">
        {lang === 'om' ? 'Invastimantii' : lang === 'am' ? 'ኢንቨስትመንት' : 'Investment'}
      </h1>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-lg border border-coffee-950/10 bg-white p-6 transition-shadow hover:shadow-md"
          >
            <h2 className="font-display text-lg font-semibold text-ink-950">{item.label[lang]}</h2>
            <p className="mt-2 text-sm text-ink-600">{item.desc[lang]}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}