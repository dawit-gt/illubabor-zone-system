'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/language-provider';
import { selectByLanguage } from '@/lib/i18n';
import { useZone } from '@/hooks/useZone';
import { useDepartments } from '@/hooks/useDepartments';
import { HeroCarousel } from '@/components/hero-carousel';
import { useSiteConfig } from '@/hooks/useSiteConfig';

const HERO_COPY = {
  om: {
    eyebrow: 'Godina Illubaabor',
    title: 'Bulchiinsa Godina Illubaabor',
    sub: 'Naannawa Oromiyaa keessatti bosona magariisaa fi buna isaatiin beekamu — tajaajila, oduu fi ifa ta\'insa bulchiinsaa gara uummataatti dhiyeessina.',
    cta: 'Tajaajila Ilaali',
  },
  am: {
    eyebrow: 'ኢሉአባቦር ዞን',
    title: 'የኢሉአባቦር ዞን አስተዳደር',
    sub: 'በደን እና በቡና ምርት በምትታወቀው በኦሮሚያ ክልል ውስጥ ላለው ዞን — አገልግሎቶችን፣ ዜናዎችን እና ግልጽነትን ለህዝብ እናቀርባለን።',
    cta: 'አገልግሎቶችን ይመልከቱ',
  },
  en: {
    eyebrow: 'Illubabor Zone',
    title: 'Illubabor Zone Administration',
    sub: 'A forested, coffee-growing zone in the Oromia Region — bringing public services, news, and transparency directly to residents.',
    cta: 'View Services',
  },
};

const HERITAGE_COPY = {
  om: {
    title: 'Dhaabbii fi Uumama Godina Keenyaa',
    yayoTitle: 'Bosona Buna Yaayoo',
    yayoBody:
      "Bosonni Yaayoo, kan UNESCO waggaa 2010 galmeesse, iddoo jalqaba bunaa addunyaa keessatti guddaa fi barbaachisaa ta'e dha.",
    sorTitle: 'Cascade Sooree',
    sorBody:
      "Cascadeen Sooree, kan Aanaa Bachoo keessatti argamu, dhoksaa uumamaa Godina Illubaabor keessaa isa tokko dha.",
  },
  am: {
    title: 'የዞናችን ቅርስ እና ተፈጥሮ',
    yayoTitle: 'የያዩ ቡና ደን',
    yayoBody:
      'እ.አ.አ. በ2010 በዩኔስኮ የተመዘገበው የያዩ ቡና ደን ለዓለም የአረቢካ ቡና መገኛ ትልቅ ጠቀሜታ ያለው ስፍራ ነው።',
    sorTitle: 'የሶር ፏፏቴ',
    sorBody:
      'በባቾ ወረዳ የሚገኘው የሶር ፏፏቴ ከኢሉአባቦር ዞን የተፈጥሮ ውበቶች አንዱ ነው።',
  },
  en: {
    title: "Our Zone's Heritage and Landscape",
    yayoTitle: 'Yayu Coffee Forest Biosphere Reserve',
    yayoBody:
      'The Yayu Coffee Forest Biosphere Reserve is recognized globally for its wild Coffea arabica populations and rich biodiversity.',
    sorTitle: 'Sor Falls',
    sorBody:
      "Hidden within dense forest in Bacho woreda, Sor Falls is one of the zone's natural landmarks.",
  },
};

const ECONOMY_COPY = {
  om: {
    title: 'Diinagdee Bunaa',
    body: "Godinni Illubaabor bunaa Oromiyaa keessaa dhibbeentaa 13 ol oomisha. Bunaan galii ijoo uummata hedduutiif ta'ee tajaajila.",
  },
  am: {
    title: 'የቡና ኢኮኖሚ',
    body: 'የኢሉአባቦር ዞን ከኦሮሚያ ቡና ምርት ውስጥ ከ13 በመቶ በላይ የሚያመርት ሲሆን ለብዙ ነዋሪዎች ዋና የገቢ ምንጭ ነው።',
  },
  en: {
    title: 'A Coffee Economy',
    body: "Illubabor produces a significant share of Oromia's coffee, making coffee an important source of income for many residents.",
  },
};

const PEOPLE_COPY = {
  om: {
    title: 'Uummata fi Aadaa',
    body: 'Godinni Illubaabor uummata fi aadaa Oromoo bal’aa kan qabu yoo ta’u, Afaan Oromoo afaan ijoo uummataati.',
  },
  am: {
    title: 'ህዝብ እና ባህል',
    body: 'የኢሉአባቦር ዞን የበለጸገ የኦሮሞ ባህልና ቋንቋ ያለው አካባቢ ነው።',
  },
  en: {
    title: 'People and Culture',
    body: 'Illubabor is home to a rich Oromo cultural heritage, with Afaan Oromoo widely spoken throughout the zone.',
  },
};

const HISTORY_COPY = {
  om: 'Metuun magaalaa guddittii Godina Illubaabor yoo taatu, magaalaan kun seenaa dheeraa gabaa bunaa fi daldalaatiin beekamti.',
  am: 'መቱ የኢሉአባቦር ዞን ዋና ከተማ ሲሆን ከተማዋ በቡና ገበያና ንግድ ረጅም ታሪክ አላት።',
  en: 'Metu is the capital of Illubabor Zone and has a long history as a center for coffee trading and commerce.',
};

export default function HomePage() {
  const { language } = useLanguage();
  const t = HERO_COPY[language];
  const h = HERITAGE_COPY[language];

  const { zone, loading: zoneLoading } = useZone();
  const { departments, loading: deptLoading } = useDepartments();

  const { value: contentImages } = useSiteConfig<{
    yayo?: string;
    sor?: string;
    coffee?: string;
  }>('content_images', {});

  const stats = [
    {
      value: zone ? String(zone._count.woredas) : '—',
      label:
        language === 'om'
          ? 'Aanaalee'
          : language === 'am'
            ? 'ወረዳዎች'
            : 'Woredas',
    },
    {
      value: zone ? zone.population.toLocaleString() : '—',
      label:
        language === 'om'
          ? 'Uummata'
          : language === 'am'
            ? 'ህዝብ ብዛት'
            : 'Population',
    },
    {
      value: zone ? zone.areaKm2.toLocaleString() : '—',
      label:
        language === 'om'
          ? "Km² Bal'ina"
          : language === 'am'
            ? 'ስፋት (ኪ.ሜ²)'
            : 'Area (km²)',
    },
    {
      value: zone ? String(zone._count.departments) : '—',
      label:
        language === 'om'
          ? 'Waajjiraalee'
          : language === 'am'
            ? 'መምሪያዎች'
            : 'Departments',
    },
  ];

  return (
    <main>
      <section className="relative min-h-[600px] overflow-hidden">
        <HeroCarousel />

        <div className="absolute inset-0 z-10 flex items-center">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <p className="font-mono text-sm uppercase tracking-wide text-white">
                {t.eyebrow}
              </p>

              <h1 className="mt-3 font-display text-4xl font-bold text-white sm:text-5xl">
                {t.title}
              </h1>

              <p className="mt-4 max-w-xl text-base leading-relaxed text-white/90">
                {t.sub}
              </p>

              <Link
                href="/services"
                className="mt-6 inline-block rounded-lg bg-clay-600 px-6 py-3 text-sm font-semibold text-white hover:bg-clay-700"
              >
                {t.cta}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-coffee-950/10 bg-parchment-100">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 md:grid-cols-4 lg:px-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display text-3xl font-semibold text-coffee-950">
                {zoneLoading ? '…' : s.value}
              </div>

              <div className="mt-1 text-sm text-coffee-800">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl font-semibold text-coffee-950">
          {language === 'om'
            ? 'Waajjiraalee'
            : language === 'am'
              ? 'መምሪያዎች'
              : 'Departments'}
        </h2>

        {deptLoading ? (
          <div className="mt-6 text-sm text-coffee-600">
            Loading…
          </div>
        ) : (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {departments.map((d) => (
              <Link
                key={d.id}
                href={`/departments/${d.slug}`}
                className="rounded-lg border border-coffee-950/10 bg-white p-5 transition-shadow hover:shadow-md"
              >
                <h3 className="font-display text-base font-semibold text-coffee-950">
                  {selectByLanguage(d, 'name', language)}
                </h3>

                <p className="mt-1 text-xs text-coffee-600">
                  {d._count.services} services
                </p>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="bg-parchment-100 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-semibold text-coffee-950">
            {h.title}
          </h2>

          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <div className="overflow-hidden rounded-lg border border-coffee-950/10 bg-white">
              {contentImages.yayo && (
                <img
                  src={contentImages.yayo}
                  alt={h.yayoTitle}
                  className="h-48 w-full object-cover"
                />
              )}

              <div className="p-6">
                <p className="font-mono text-xs uppercase tracking-wide text-clay-600">
                  UNESCO Biosphere Reserve
                </p>

                <h3 className="mt-2 font-display text-lg font-semibold text-coffee-950">
                  {h.yayoTitle}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-coffee-800">
                  {h.yayoBody}
                </p>
              </div>
            </div>

            <div className="overflow-hidden rounded-lg border border-coffee-950/10 bg-white">
              {contentImages.sor && (
                <img
                  src={contentImages.sor}
                  alt={h.sorTitle}
                  className="h-48 w-full object-cover"
                />
              )}

              <div className="p-6">
                <p className="font-mono text-xs uppercase tracking-wide text-sor-600">
                  Natural Landmark
                </p>

                <h3 className="mt-2 font-display text-lg font-semibold text-coffee-950">
                  {h.sorTitle}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-coffee-800">
                  {h.sorBody}
                </p>
              </div>
            </div>
          </div>

          <p className="mt-8 max-w-3xl text-sm leading-relaxed text-coffee-800">
            {HISTORY_COPY[language]}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div className="overflow-hidden rounded-lg">
            {contentImages.coffee && (
              <img
                src={contentImages.coffee}
                alt="Coffee economy"
                className="h-64 w-full rounded-lg object-cover"
              />
            )}
          </div>

          <div>
            <h2 className="font-display text-2xl font-semibold text-coffee-950">
              {ECONOMY_COPY[language].title}
            </h2>

            <p className="mt-4 text-sm leading-relaxed text-coffee-800">
              {ECONOMY_COPY[language].body}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-canopy-700 py-16 text-parchment-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-semibold">
            {PEOPLE_COPY[language].title}
          </h2>

          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-parchment-100/90">
            {PEOPLE_COPY[language].body}
          </p>
        </div>
      </section>
    </main>
  );
}