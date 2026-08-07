export type Language = 'en' | 'om' | 'am';

export const LANGUAGES: { code: Language; label: string }[] = [
  { code: 'om', label: 'Afaan Oromoo' },
  { code: 'am', label: 'አማርኛ' },
  { code: 'en', label: 'English' },
];

export const DEFAULT_LANGUAGE: Language = 'om';

/**
 * Picks the localized value for a given base field name, falling back
 * to English, then to whatever is present, then to an empty string.
 * e.g. selectByLanguage(news, 'title', 'am') looks for titleAm -> title -> ''
 */
export function selectByLanguage<T extends object>(
  obj: T,
  field: string,
  lang: Language,
): string {
  const record = obj as Record<string, unknown>;
  if (lang === 'en') return (record[field] as string) ?? '';
  const suffix = lang === 'om' ? 'Om' : 'Am';
  const localizedKey = `${field}${suffix}`;
  return (record[localizedKey] as string) || (record[field] as string) || '';
}