'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/language-provider';
import { selectByLanguage } from '@/lib/i18n';
import { useZone } from '@/hooks/useZone';
import { useDepartments } from '@/hooks/useDepartments';
import { HeroCarousel } from '@/components/hero-carousel';
import { useSiteConfig } from '@/hooks/useSiteConfig';
import { AdminWelcome } from '@/components/admin-welcome';
import { LeadershipTeam } from '@/components/leadership-team';

type Lang = 'om' | 'am' | 'en';

const HERO_COPY = {
  om: {
    eyebrow: 'Godina Illubaabor — Misooma, Aadaa fi Uumama',
    title: 'Bulchiinsa Godina Illubaabor',
    sub: "Illubaabor handhuura Oromiyaa gara dhihaa kan bosona magariisaa, madda buna Arabikaa addunyaa fi uumama keessummeessituu dha. Tajaajila mootummaa, oduu fi ifa ta'insa bulchiinsaa kallattiin gara uummataatti dhiyeessina.",
    cta: 'Tajaajila Mootummaa Ilaali',
  },

  am: {
    eyebrow: 'ኢሉአባቦር ዞን — ልማት፣ ባህል እና ተፈጥሮ',
    title: 'የኢሉአባቦር ዞን አስተዳደር',
    sub: 'በደቡብ ምዕራብ ኦሮሚያ የምትገኘው ኢሉአባቦር በለምለም ደኗ፣ በዱር አረቢካ ቡናዋ እና በተፈጥሮ ሀብቷ ትታወቃለች። የመንግስት አገልግሎቶችን፣ ትኩስ ዜናዎችን እና ግልፅ የአስተዳደር መረጃዎችን ለህዝባችን እናቀርባለን።',
    cta: 'አገልግሎቶችን ይመልከቱ',
  },

  en: {
    eyebrow: 'Illubabor Zone — Governance, Culture & Nature',
    title: 'Illubabor Zone Administration',
    sub: "Nestled in southwestern Oromia, Illubabor is renowned for its lush Afromontane rainforests, wild Arabica coffee gene bank, and vibrant cultural heritage. We deliver accessible public services, official updates, and transparent governance directly to citizens.",
    cta: 'Explore Public Services',
  },
};

const HERITAGE_COPY = {
  om: {
    title: 'Dhaabbii, Seenaa fi Badhaadhina Uumama Godina Keenyaa',

    yayoTitle: 'Biyoosfeera Bosona Buna Yaayoo (UNESCO)',

    yayoBody:
      'Bosonni Buna Yaayoo, kan UNESCOn waggaa 2010 galmeesse, iddoo jalqabaa fi madda buna Arabikaa (Coffea arabica) addunyaa keessatti madda jeneetikiitiin adda duree dha. Laga Gabbaa, Doogii fi Saakii kan genga Barootti madaalan dabalatee, biyyoosfeerri kun badhaadhina xos-uumamaa (biodiversity) addunyaaf gumaacha dhiyeessa.',

    sorTitle: 'Cascade Sooree (Sor Waterfalls)',

    sorBody:
      "Aanaa Bachoo keessatti kan argamu Cascadeen Sooree dhoksaa uumamaa bosona gurraacha keessatti argamu dha. Bisaniin sooraa fi fageenyi qillensa isaa ijaarsaa fi turizimiif hawwata addaa kan qabu yoo ta'u, madda badhaadhina uumama Godina Illubaabor ta'iinsa isaatiin beekama.",
  },

  am: {
    title: 'የዞናችን ተፈጥሯዊና ባህላዊ ቅርሶች',

    yayoTitle: 'የያዩ ቡና ደን ባዮስፌር ሪዘርቭ (UNESCO)',

    yayoBody:
      'እ.አ.አ. በ2010 በዩኔስኮ የተመዘገበው የያዩ ቡና ደን የዓለም አረቢካ ቡና (Coffea arabica) መገኛና ዋና የጄኔቲክ ሀብት ማከማቻ ነው። እንደ ገባ፣ ዶጊ እና ሳኪ ያሉ ወንዞች ባሮ ወንዝን የሚቀላቀሉበት ይህ ስፍራ ለብዝሃ-ሕይወት ጥበቃ ከፍተኛ ዓለም አቀፍ ድርሻ አለው።',

    sorTitle: 'የሶር ፏፏቴ (Sor Falls)',

    sorBody:
      'በባቾ ወረዳ በጥቅጥቅ ደን ውስጥ የሚገኘው የሶር ፏፏቴ ከኢሉአባቦር ዞን እጅግ አስደናቂ የተፈጥሮ ውበቶች አንዱ ነው። ከፍተኛ የውሃ ፍሰትና ማራኪ የተፈጥሮ ከባቢ ያለው ይህ ፏፏቴ ለዞናችን የቱሪዝም ዘርፍ ትልቅ አቅም ነው።',
  },

  en: {
    title: "Our Zone's Natural Heritage & Landscapes",

    yayoTitle: 'Yayu Coffee Forest Biosphere Reserve (UNESCO)',

    yayoBody:
      "Designated as a UNESCO Biosphere Reserve in 2010, Yayu is one of the last remaining Afromontane rainforests housing the world's richest wild Coffea arabica genetic diversity. Drained by rivers like Geba, Dogi, and Saki into the Baro River basin, it serves as a critical hotspot for global biodiversity and conservation research.",

    sorTitle: 'Sor Waterfalls',

    sorBody:
      "Hidden within the dense evergreen rainforests of Bacho woreda, Sor Waterfalls is one of southwestern Ethiopia's most breathtaking natural wonders. Cascading from high cliffs into a serene forested basin, it offers tremendous potential for eco-tourism and environmental study.",
  },
};

const ECONOMY_COPY = {
  om: {
    title: 'Diinagdee Bunaa, Qonnaa fi Badhaadhina Badhee',

    body: 'Godinni Illubaabor qabeenya bunaa tiin Oromiyaa keessatti shoora olaanaa taphata. Oomisha buna bosonaa fi mantiisa (garden coffee) dabalatee, barbaree goda (korarima), damma bosonaa, qullubbii adiifi jinjibila madaaluun diinagdee uummataa fura. Kana malees, qonnaa agroforestry fi iddoowwan bunaa fi baala bunoota (tea estates) misoomsuun galii uummataa guddisaa jira.',
  },

  am: {
    title: 'የቡና፣ የግብርና እና የተፈጥሮ ሀብት ኢኮኖሚ',

    body: 'የኢሉአባቦር ዞን በኦሮሚያ ክልል የቡና ምርት ውስጥ ከፍተኛ ድርሻ ይይዛል። በዱር ደን ቡና እና በጓሮ ቡና ምርት የሚታወቅ ሲሆን እንደ ኮረሪማ፣ የደን ማር እና ዝንጅብል ያሉ ቅመማ ቅመሞች የነዋሪዎች ዋና የገቢ ምንጭ ናቸው። በተጨማሪም ዘመናዊ የአግሮ-ፎረስትሪ ልማትና የሻይ ቅጠል ማበጠሪያዎች ለዞኑ ኢኮኖሚ ዕድገት ትልቅ አስተዋጽኦ ያደርጋሉ።',
  },

  en: {
    title: 'A Vibrant Coffee & Agro-Forestry Economy',

    body: "Illubabor is a key economic driver in Oromia, producing a significant share of Ethiopia's premium forest and garden Arabica coffee. Beyond coffee, the region thrives on rich agro-forestry products, including high-grade forest honey, Ethiopian cardamom (korarima), ginger, spices, and commercial tea plantations, powering local livelihoods and national trade.",
  },
};

const HISTORY_COPY = {
  om: "Metuun magaalaa guddittii Godina Illubaabor yoo taatu, bara dheeraa irraa eegalee handhuura daldala bunaa, qabeenya uumamaa fi walitti dhufeenya Oromiyaa gara dhihaa ti. Magaalaan kun seenaa dheeraa gabaa, daldala giddu-galeessaa fi misooma dinagdee rejiiniikoo agarsiisti.",

  am: 'መቱ የኢሉአባቦር ዞን ዋና ከተማ ስትሆን ከረጅም ጊዜ ጀምሮ የደቡብ ምዕራብ ኢትዮጵያ የቡና ንግድ፣ የትራንስፖርት እና የኢኮኖሚ ማዕከል ሆና አገልግላለች። ከተማዋ ታሪካዊ የንግድ መስመሮችና የነዋሪዎች መስተጋብር የሚታይባት ውብ የዞኑ መዲና ናት።',

  en: 'Metu (Mettu) serves as the vibrant capital of Illubabor Zone. Historically renowned as a major commercial crossroads and coffee trading hub in southwestern Ethiopia, Metu continues to grow as an administrative, educational, and economic center nestled along the scenic Sor River valley.',
};

interface ExtraSection {
  id: string;
  imageUrl: string;
  title: Record<Lang, string>;
  body: Record<Lang, string>;
}

export default function HomePage() {
  const { language } = useLanguage();

  /* Hero text */
  const { value: heroTextOverride } = useSiteConfig<
    Record<
      Lang,
      {
        eyebrow: string;
        title: string;
        sub: string;
        cta: string;
      }
    > | null
  >('hero_text', null);

  const override = heroTextOverride?.[language];

  const t = {
    eyebrow: override?.eyebrow || HERO_COPY[language].eyebrow,
    title: override?.title || HERO_COPY[language].title,
    sub: override?.sub || HERO_COPY[language].sub,
    cta: override?.cta || HERO_COPY[language].cta,
  };

  /* Content text overrides */
  const { value: contentText } = useSiteConfig<
    Record<
      'yayo' | 'sor' | 'coffee',
      Record<
        Lang,
        {
          title: string;
          body: string;
        }
      >
    > | null
  >('content_sections_text', null);

  /* Content images */
  const { value: contentImages } = useSiteConfig<{
    yayo?: string;
    sor?: string;
    coffee?: string;
  }>('content_images', {});

  /* Flexible extra content blocks */
  const { value: extraSections } = useSiteConfig<ExtraSection[]>(
    'homepage_extra_sections',
    []
  );

  /* Homepage section visibility */
  const { value: sections } = useSiteConfig<Record<string, boolean>>(
    'homepage_sections',
    {
      stats: true,
      welcome: true,
      departments: true,
      heritage: true,
      economy: true,
      extraContent: true,
    }
  );

  const h = HERITAGE_COPY[language];

  const { zone, loading: zoneLoading } = useZone();
  const { departments, loading: deptLoading } = useDepartments();

  const STATIC_DEPARTMENT_OFFSET = 5;

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
      value: deptLoading
        ? '—'
        : String(departments.length + STATIC_DEPARTMENT_OFFSET),
      label:
        language === 'om'
          ? 'Dameewwan'
          : language === 'am'
            ? 'ዘርፎች'
            : 'Sectors',
    },
  ];

  return (
    <main>
      {/* Hero Section */}
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
                className="mt-6 inline-block rounded-lg bg-clay-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-clay-700"
              >
                {t.cta}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      {sections.stats && (
        <section className="border-b border-coffee-950/10 bg-parchment-100">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-12 sm:px-6 md:grid-cols-4 lg:px-8">
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
      )}

      {/* Welcome */}
      {sections.welcome && (
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <AdminWelcome />
          <LeadershipTeam />
        </section>
      )}

      {/* Departments */}
      {sections.departments && (
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-semibold text-coffee-950">
            {language === 'om'
              ? 'Dameewwan fi Tajaajiloota'
              : language === 'am'
                ? 'ዘርፎች እና አገልግሎቶች'
                : 'Sectors & Services'}
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
      )}

      {/* Heritage */}
      {sections.heritage && (
        <section className="bg-parchment-100 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl font-semibold text-coffee-950">
              {h.title}
            </h2>

            <div className="mt-8 grid gap-8 md:grid-cols-2">
              {/* Yayo */}
              <div className="overflow-hidden rounded-lg border border-coffee-950/10 bg-white">
                {contentImages.yayo && (
                  <img
                    src={contentImages.yayo}
                    alt={
                      contentText?.yayo?.[language]?.title ||
                      h.yayoTitle
                    }
                    className="h-56 w-full object-cover"
                  />
                )}

                <div className="p-6">
                  <p className="font-mono text-xs uppercase tracking-wide text-clay-600">
                    UNESCO Biosphere Reserve
                  </p>

                  <h3 className="mt-2 font-display text-lg font-semibold text-coffee-950">
                    {contentText?.yayo?.[language]?.title ||
                      h.yayoTitle}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-coffee-800">
                    {contentText?.yayo?.[language]?.body ||
                      h.yayoBody}
                  </p>
                </div>
              </div>

              {/* Sor */}
              <div className="overflow-hidden rounded-lg border border-coffee-950/10 bg-white">
                {contentImages.sor && (
                  <img
                    src={contentImages.sor}
                    alt={
                      contentText?.sor?.[language]?.title ||
                      h.sorTitle
                    }
                    className="h-56 w-full object-cover"
                  />
                )}

                <div className="p-6">
                  <p className="font-mono text-xs uppercase tracking-wide text-sor-600">
                    Natural Landmark
                  </p>

                  <h3 className="mt-2 font-display text-lg font-semibold text-coffee-950">
                    {contentText?.sor?.[language]?.title ||
                      h.sorTitle}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-coffee-800">
                    {contentText?.sor?.[language]?.body ||
                      h.sorBody}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Economy */}
      {sections.economy && (
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div className="overflow-hidden rounded-lg border border-coffee-950/10">
              {contentImages.coffee && (
                <img
                  src={contentImages.coffee}
                  alt="Coffee economy"
                  className="h-72 w-full rounded-lg object-cover"
                />
              )}
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold text-coffee-950">
                {contentText?.coffee?.[language]?.title ||
                  ECONOMY_COPY[language].title}
              </h2>

              <p className="mt-4 text-sm leading-relaxed text-coffee-800">
                {contentText?.coffee?.[language]?.body ||
                  ECONOMY_COPY[language].body}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Extra Content Blocks */}
      {sections.extraContent &&
        extraSections.map((s) => (
          <section
            key={s.id}
            className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
          >
            <div className="grid gap-8 md:grid-cols-2 md:items-center">
              {s.imageUrl && (
                <img
                  src={s.imageUrl}
                  alt={s.title[language] || ''}
                  className="h-64 w-full rounded-lg object-cover"
                />
              )}

              <div>
                <h2 className="font-display text-2xl font-semibold text-coffee-950">
                  {s.title[language]}
                </h2>

                <p className="mt-4 text-sm leading-relaxed text-coffee-800">
                  {s.body[language]}
                </p>
              </div>
            </div>
          </section>
        ))}
    </main>
  );
}