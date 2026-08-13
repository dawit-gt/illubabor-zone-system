'use client';

import { useLanguage } from '@/lib/language-provider';
import { useSiteConfig } from '@/hooks/useSiteConfig';
import { MessageCircleHeart } from 'lucide-react';

const TITLE = {
  om: 'Nagaa fi Baga Nagaan Dhuftan — Ergaa Bulchaa Godinaa',
  am: 'እንኳን ደህና መጡ — መልእክት ከዞኑ አስተዳዳሪ',
  en: 'Welcome Message from the Zone Administrator',
};

export function AdminWelcome() {
  const { language } = useLanguage();
  const { value: message, loading } = useSiteConfig<{ om: string; am: string; en: string }>(
    'admin_welcome_message',
    { om: '', am: '', en: '' },
  );

  if (loading) return null;

  // Prefer the active language, but fall back to whichever one actually has content
  const text = message[language] || message.en || message.om || message.om;
  if (!text) return null;

  return (
    <div className="group relative overflow-hidden rounded-lg border border-coffee-950/10 bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:ring-2 hover:ring-clay-600/30">
      {/* Decorative accent bar */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-clay-600 via-gold-500 to-canopy-700" />

      <div className="flex items-start gap-4">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-clay-600/10 text-3xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
          <span aria-hidden="true">🎙️</span>
        </span>

        <div className="min-w-0">
          <h3 className="flex flex-wrap items-center gap-2 font-display text-lg font-semibold text-coffee-950">
            {TITLE[language]}
            <MessageCircleHeart size={18} className="shrink-0 text-clay-600" aria-hidden="true" />
          </h3>
          <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-coffee-800">{text}</p>
        </div>
      </div>
    </div>
  );
}