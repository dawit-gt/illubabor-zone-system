export type Language = 'en' | 'om' | 'am';

export const LANGUAGES: { code: Language; label: string }[] = [
  { code: 'om', label: 'Afaan Oromoo' },
  { code: 'am', label: 'አማርኛ' },
  { code: 'en', label: 'English' },
];

// Illubabor Zone: Oromiffa is the working language (~91% first-language
// speakers), so it's listed first and used as the default — unlike a
// zone/woreda site where Amharic might lead.
export const DEFAULT_LANGUAGE: Language = 'om';

interface Localized {
  [key: string]: unknown;
}

/**
 * Picks the localized value for a given base field name, falling back
 * to English, then to whatever is present, then to an empty string.
 * e.g. selectByLanguage(news, 'title', 'am') looks for titleAm -> title -> ''
 */
export function selectByLanguage<T extends Localized>(
  obj: T,
  field: string,
  lang: Language,
): string {
  if (lang === 'en') return (obj[field] as string) ?? '';
  const suffix = lang === 'om' ? 'Om' : 'Am';
  const localizedKey = `${field}${suffix}`;
  return (obj[localizedKey] as string) || (obj[field] as string) || '';
}
