'use client';

import { useState } from 'react';
import { useLanguage } from '@/lib/language-provider';
import { useContent, ContentEntry } from '@/hooks/useContent';
import { ContentList } from '@/components/content-list';

type Lang = 'om' | 'am' | 'en';

export default function InvestmentProjectsPage() {
  const { language } = useLanguage();
  const lang = language as Lang;
  const { entries, loading } = useContent('PROJECT' as any);
  const [selected, setSelected] = useState<ContentEntry | null>(null);

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-semibold text-ink-950">
        {lang === 'om' ? 'Pirojektoota' : lang === 'am' ? 'ፕሮጀክቶች' : 'Projects'}
      </h1>
      <div className="mt-8">
        <ContentList entries={entries} loading={loading} selected={selected} onSelect={setSelected} lang={lang} />
      </div>
    </div>
  );
}