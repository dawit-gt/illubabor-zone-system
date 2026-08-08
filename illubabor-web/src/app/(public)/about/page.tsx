'use client';

import { useState } from 'react';
import { useLanguage } from '@/lib/language-provider';
import { selectByLanguage } from '@/lib/i18n';
import { useZone } from '@/hooks/useZone';
import { useSiteConfig } from '@/hooks/useSiteConfig';

type TabKey = 'overview' | 'geography' | 'economy' | 'people';

const TABS: { key: TabKey; label: Record<'om' | 'am' | 'en', string> }[] = [
  { key: 'overview', label: { om: 'Waliigalaa', am: 'አጠቃላይ', en: 'Overview' } },
  { key: 'geography', label: { om: 'Naannoo fi Uumama', am: 'መልክዓ ምድር', en: 'Geography & Nature' } },
  { key: 'economy', label: { om: 'Dinagdee', am: 'ኢኮኖሚ', en: 'Economy' } },
  { key: 'people', label: { om: 'Uummata', am: 'ህዝብ', en: 'People' } },
];

const STATS_LABELS = {
  woredas: { om: 'Aanaalee', am: 'ወረዳዎች', en: 'Woredas' },
  population: { om: 'Uummata', am: 'ህዝብ ብዛት', en: 'Population' },
  area: { om: "Km² Bal'ina", am: 'ስፋት (ኪ.ሜ²)', en: 'Area (km²)' },
  departments: { om: 'Waajjiraalee', am: 'መምሪያዎች', en: 'Departments' },
};

const TAB_CONTENT: Record<TabKey, Record<'om' | 'am' | 'en', { title: string; body: string; imageKey: string }>> = {
  overview: {
    om: { title: 'Godina Illubaabor', body: "Metuun, magaalaa guddittii Godina Illubaabor, bara 1978 hanga 1995tti magaalaa guddittii Godina Illubaabor Provinsii turte. Magaalattiin bara dheeraaf gabaa jijjiirraa bunaa kan beekamtu turte.", imageKey: 'about_overview' },
    am: { title: 'ኢሉአባቦር ዞን', body: 'መቱ፣ የዞኑ ዋና ከተማ፣ ከ1978 እስከ 1995 ድረስ የቀድሞው የኢሉአባቦር ግዛት ዋና ከተማ ነበረች። ከተማዋ ለረጅም ጊዜ የቡና ገበያ ልውውጥ ማዕከል በመሆን ትታወቅ ነበር።', imageKey: 'about_overview' },
    en: { title: 'Illubabor Zone', body: 'Metu, the zone\'s capital, served as the capital of the former Illubabor Province from 1978 until Ethiopia\'s 1995 constitutional reorganization into today\'s regions and zones. The town has long been a center for coffee trading, drawing buyers to its market since as early as the 1930s.', imageKey: 'about_overview' },
  },
  geography: {
    om: { title: 'Bosona Buna Yaayoo fi Cascade Sooree', body: "Bosonni Yaayoo, kan UNESCO waggaa 2010 galmeesse, iddoo jalqaba bunaa (Coffea arabica) addunyaa keessatti guddaa dha, hektaara kuma dhibbaa ol qabateera. Cascadeen Sooree ammoo Aanaa Bachoo keessatti bosona guddaa keessatti dhokatee argama.", imageKey: 'about_geography' },
    am: { title: 'የያዩ ቡና ደን እና የሶር ፏፏቴ', body: 'እ.አ.አ. በ2010 በዩኔስኮ የተመዘገበው የያዩ ቡና ደን ለአረቢካ ቡና መገኛ ትልቅ ጠቀሜታ ያለው ከመቶ ሺህ ሄክታር በላይ ስፋት ያለው ስፍራ ነው። በባቾ ወረዳ የሚገኘው የሶር ፏፏቴ በጥቅጥቅ ደን ውስጥ የተደበቀ ነው።', imageKey: 'about_geography' },
    en: { title: 'Yayu Coffee Forest & Sor Falls', body: 'Designated by UNESCO in 2010, the Yayu Coffee Forest Biosphere Reserve is the global center of origin for wild Coffea arabica, spanning roughly 167,000 hectares across Hurumu, Yayu, Chora and neighboring woredas. Sor Falls, hidden within dense forest in Bacho woreda, is one of the zone\'s least-visited natural landmarks.', imageKey: 'about_geography' },
  },
  economy: {
    om: { title: 'Diinagdee Bunaa', body: "Godinni Illubaabor bunaa Oromiyaa keessaa dhibbeentaa 13 ol oomisha. Kana malees midhaan akka boqqolloo, xaafii, garbuu fi kudraa'aa fi damma oomishuun barbaachisaa dha.", imageKey: 'about_economy' },
    am: { title: 'የቡና ኢኮኖሚ', body: 'የኢሉአባቦር ዞን ከኦሮሚያ ቡና ምርት ውስጥ ከ13 በመቶ በላይ ያመርታል። ከዚህ በተጨማሪ በቆሎ፣ ጤፍ፣ ገብስ፣ ጥራጥሬ እና ማር ማምረት ጠቃሚ ሚና ይጫወታሉ።', imageKey: 'about_economy' },
    en: { title: 'A Coffee Economy', body: 'Illubabor produces roughly 13% of Oromia\'s total coffee output. Beyond coffee, maize, teff, sorghum, barley, pulses, and honey production round out a largely agricultural economy across the zone\'s 13 woredas.', imageKey: 'about_economy' },
  },
  people: {
    om: { title: 'Uummata fi Aadaa', body: "Godinni Illubaabor uummata dhibbeentaa 92 ol Oromoo fi Afaan Oromoo isaan hangafa dubbatan qaba, Afaan Amaaraatis akka afaan bulchiinsaa lammaffaatti tajaajila.", imageKey: 'about_people' },
    am: { title: 'ህዝብ እና ባህል', body: 'የኢሉአባቦር ዞን ከ92 በመቶ በላይ የኦሮሞ ህዝብ ያለው ሲሆን አፋን ኦሮሞ ዋነኛ ቋንቋቸው ነው፤ አማርኛም እንደ ሁለተኛ የአስተዳደር ቋንቋ ያገለግላል።', imageKey: 'about_people' },
    en: { title: 'People and Culture', body: 'Illubabor is home to a predominantly Oromo population (over 92%), with Afaan Oromoo as the first language for the large majority of residents, alongside Amharic serving as a secondary administrative language.', imageKey: 'about_people' },
  },
};

export default function AboutPage() {
  const { language } = useLanguage();
  const { zone, loading } = useZone();
  const { value: images } = useSiteConfig<Record<string, string>>('about_images', {});
  const [tab, setTab] = useState<TabKey>('overview');

  const active = TAB_CONTENT[tab][language];
  const imageUrl = images[active.imageKey];

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-semibold text-coffee-950">
        {language === 'om' ? "Waaʼee Godina Illubaabor" : language === 'am' ? 'ስለ ኢሉአባቦር ዞን' : 'About Illubabor Zone'}
      </h1>

      {loading ? (
        <div className="mt-6 text-sm text-coffee-600">Loading…</div>
      ) : zone ? (
        <>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { label: STATS_LABELS.woredas[language], value: zone._count.woredas },
              { label: STATS_LABELS.population[language], value: zone.population?.toLocaleString() ?? '—' },
              { label: STATS_LABELS.area[language], value: zone.areaKm2?.toLocaleString() ?? '—' },
              { label: STATS_LABELS.departments[language], value: zone._count.departments },
            ].map((s) => (
              <div key={s.label} className="rounded-lg border border-coffee-950/10 bg-white p-4 text-center">
                <div className="font-display text-2xl font-semibold text-coffee-950">{s.value}</div>
                <div className="mt-1 text-xs text-coffee-600">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="mt-10 flex gap-1 overflow-x-auto border-b border-coffee-950/10">
            {TABS.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`whitespace-nowrap px-4 py-2.5 text-sm font-medium transition-colors ${
                  tab === t.key
                    ? 'border-b-2 border-clay-600 text-coffee-950'
                    : 'text-coffee-600 hover:text-coffee-950'
                }`}
              >
                {t.label[language]}
              </button>
            ))}
          </div>

          <div className="mt-6 overflow-hidden rounded-lg border border-coffee-950/10 bg-white">
            {imageUrl && <img src={imageUrl} alt={active.title} className="h-64 w-full object-cover" />}
            <div className="p-6">
              <h2 className="font-display text-xl font-semibold text-coffee-950">{active.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-coffee-800">{active.body}</p>
            </div>
          </div>
        </>
      ) : (
        <p className="mt-6 text-sm text-coffee-600">Zone information unavailable.</p>
      )}
    </div>
  );
}