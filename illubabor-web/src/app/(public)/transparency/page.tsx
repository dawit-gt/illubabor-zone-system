'use client';

import { useLanguage } from '@/lib/language-provider';
import { selectByLanguage } from '@/lib/i18n';
import { useDocuments } from '@/hooks/useDocuments';

export default function TransparencyPage() {
  const { language } = useLanguage();
  const { documents, loading } = useDocuments();

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-3xl font-bold text-coffee-950">
        {language === 'om'
          ? "Ifa Ta'uu"
          : language === 'am'
            ? 'ግልጽነት'
            : 'Transparency'}
      </h1>

      <p className="mt-2 text-coffee-600">
        {language === 'om'
          ? 'Sanadootni bulchiinsaa kanneen uummataaf ifa ta’an as irratti argamu.'
          : language === 'am'
            ? 'ለህዝብ ግልጽ የሆኑ የአስተዳደር ሰነዶች እዚህ ይገኛሉ።'
            : 'Public administrative documents are available here.'}
      </p>

      {loading ? (
        <div className="mt-6 text-sm text-coffee-600">
          Loading…
        </div>
      ) : documents.length === 0 ? (
        <p className="mt-6 text-sm text-coffee-600">
          {language === 'om'
            ? 'Sanadni hin jiru.'
            : language === 'am'
              ? 'ምንም ሰነድ የለም።'
              : 'No documents published yet.'}
        </p>
      ) : (
        <div className="mt-6 divide-y divide-coffee-950/10 rounded-lg border border-coffee-950/10 bg-white">
          {documents.map((d) => (
            <a
              key={d.id}
              href={d.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-5 py-4 hover:bg-parchment-50"
            >
              <div>
                <p className="font-medium text-coffee-950">
                  {selectByLanguage(d, 'title', language)}
                </p>

                <p className="mt-0.5 text-xs text-coffee-600">
                  {d.type.replace(/_/g, ' ')} ·{' '}
                  {new Date(d.createdAt).toLocaleDateString()}
                </p>
              </div>

              <span className="text-sm text-clay-600">
                Download
              </span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}