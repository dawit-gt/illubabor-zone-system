'use client';

import { useLanguage } from '@/lib/language-provider';
import { GraduationCap, HeartPulse, Droplet, Zap, Wheat, type LucideIcon } from 'lucide-react';

type Lang = 'om' | 'am' | 'en';

type SectorKey = 'education' | 'health' | 'water' | 'electricity' | 'agriculture';

const L = (om: string, am: string, en: string): Record<Lang, string> => ({ om, am, en });

const SECTOR_LABELS: Record<SectorKey, Record<Lang, string>> = {
  education: L('Barnoota', 'ትምህርት', 'Education'),
  health: L('Fayyaa', 'ጤና', 'Health'),
  water: L('Bishaan', 'ውሃ', 'Water'),
  electricity: L('Ibsaa', 'ኤሌክትሪክ', 'Electricity'),
  agriculture: L('Qonna', 'ግብርና', 'Agriculture'),
};

const SECTORS: SectorKey[] = ['education', 'health', 'water', 'electricity', 'agriculture'];

// Icon + emoji + accent color per sector — used to give each section its
// own visual identity instead of an identical plain heading.
const SECTOR_ICON: Record<SectorKey, LucideIcon> = {
  education: GraduationCap,
  health: HeartPulse,
  water: Droplet,
  electricity: Zap,
  agriculture: Wheat,
};

const SECTOR_EMOJI: Record<SectorKey, string> = {
  education: '🎓',
  health: '🏥',
  water: '💧',
  electricity: '⚡',
  agriculture: '🌾',
};

const SECTOR_ACCENT: Record<SectorKey, { icon: string; ring: string }> = {
  education: { icon: 'bg-clay-600/10 text-clay-600', ring: 'hover:ring-clay-600/30' },
  health: { icon: 'bg-red-500/10 text-red-600', ring: 'hover:ring-red-500/30' },
  water: { icon: 'bg-sor-600/10 text-sor-600', ring: 'hover:ring-sor-600/30' },
  electricity: { icon: 'bg-gold-500/10 text-gold-500', ring: 'hover:ring-gold-500/30' },
  agriculture: { icon: 'bg-canopy-700/10 text-canopy-700', ring: 'hover:ring-canopy-700/30' },
};

const UI = {
  male: L('Dhiira', 'ወንድ', 'Male'),
  female: L('Dhalaa', 'ጓድ', 'Female'),
  total: L('Waliigalaa', 'ጠቅላላ', 'Total'),
  certificate: L('Waraqaa Ragaa', 'ሰርተፍኬት', 'Certificate'),
  diploma: L('Dippiloomaa', 'ዲፕሎማ', 'Diploma'),
  bachelors: L("Digrii Jalqabaa", 'የመጀመሪያ ዲግሪ', "Bachelor's Degree"),
  masters: L('Digrii Lammaffaa', 'ሁለተኛ ዲግሪ', "Master's Degree"),
  level: L('Sadarkaa', 'ደረጃ', 'Level'),
  byQualification: L('Aadaan Ogummaa', 'በብቃት ደረጃ', 'By Qualification'),

  basicSchools: L("Mana Barumsaa Bu'uuraa", 'መሠረታዊ ትምህርት ቤቶች', 'Basic education schools'),
  primarySchools: L('Mana Barumsaa Sadarkaa 1ffaa', 'አንደኛ ደረጃ ትምህርት ቤቶች', 'Primary schools'),
  secondarySchools: L('Mana Barumsaa Sadarkaa 2ffaa', 'ሁለተኛ ደረጃ ትምህርት ቤቶች', 'Secondary schools'),
  studentData: L('Ragaa Baratootaa (2018)', 'የተማሪ መረጃ (2018)', 'Student Data (2018 E.C.)'),
  basicEducation: L("Barnoota Bu'uuraa", 'መሠረታዊ ትምህርት', 'Basic Education'),
  primarySchool: L('Sadarkaa 1ffaa', 'አንደኛ ደረጃ', 'Primary School'),
  secondarySchool: L('Sadarkaa 2ffaa', 'ሁለተኛ ደረጃ', 'Secondary School'),
  teacherData: L('Ragaa Barsiisotaa', 'የመምህራን መረጃ', 'Teacher Data'),
  basicEdTeachers: L("Barsiisota Barnoota Bu'uuraa", 'የመሠረታዊ ትምህርት መምህራን', 'Basic Education Teachers'),
  primaryTeachers: L('Barsiisota Sadarkaa 1ffaa', 'የአንደኛ ደረጃ መምህራን', 'Primary School Teachers'),
  secondaryTeachers: L('Barsiisota Sadarkaa 2ffaa', 'የሁለተኛ ደረጃ መምህራን', 'Secondary School Teachers'),

  govFacilities: L('Dhaabbilee Mootummaa', 'የመንግስት ተቋማት', 'Government Facilities'),
  govHospitals: L('Hospitaala Mootummaa', 'የመንግስት ሆስፒታሎች', 'Government hospitals'),
  healthCenters: L('Giddugala Fayyaa', 'ጤና ጣቢያዎች', 'Health centers'),
  healthPosts: L('Buufata Fayyaa', 'ጤና ኬላዎች', 'Health posts'),
  privateFacilities: L('Dhaabbilee Dhuunfaa fi Mit-Mootummaa', 'የግልና መንግስታዊ ያልሆኑ ተቋማት', 'Private & Non-Governmental Facilities'),
  clinics: L('Kiliinikoota', 'ክሊኒኮች', 'Clinics (various levels)'),
  pharmacies: L('Farmaasiiwwan', 'ፋርማሲዎች', 'Pharmacies / drugstores'),
  totalHealthInst: L('Dhaabbilee Fayyaa Waliigalaa', 'ጠቅላላ የጤና ተቋማት', 'Total public & non-public institutions'),
  coverageNeeds: L('Barbaachisummaa Uwwisaa', 'የሽፋን ፍላጎቶች', 'Coverage Needs'),
  hospitalCoverage: L('Uwwisa Hospitaalaa', 'የሆስፒታል ሽፋን', 'Hospital coverage vs. need'),
  healthCenterCoverage: L('Uwwisa Giddugala Fayyaa', 'የጤና ጣቢያ ሽፋን', 'Health center coverage vs. need'),

  operationalSchemes: L('Sirna Bishaanii Hojjetaa Jiran (Waliigalaa: 5,348)', 'ስራ ላይ ያሉ የውሃ ፕሮጀክቶች (ጠቅላላ: 5,348)', 'Operational Water Schemes (Total: 5,348)'),
  deepWells: L('Boolla Bishaanii Gadi Fagoo', 'ጥልቅ ጉድጓዶች', 'Deep wells'),
  handDugWells: L('Boolla Bishaanii Harkaan Qotame', 'በእጅ የተቆፈሩ ጉድጓዶች', 'Hand-dug wells'),
  developedSprings: L('Burqaa Fooyya\'e', 'የተሻሻሉ ምንጮች', 'Developed springs'),
  peopleReached: L('Uummata Bishaan Haaraa Argatan', 'አዲስ ውሃ ያገኙ ሰዎች', 'People newly reached with clean water'),
  zoneCoverage: L("Uwwisa Godinaa Waliigalaa (73.5% irraa dabale)", 'የዞን አጠቃላይ ሽፋን (ከ73.5% አድጓል)', 'Zone-wide coverage (up from 73.5%)'),
  nonOperational: L('Sirna Hin Hojjenne (Ragaa 2017)', 'ስራ ላይ ያልዋሉ (የ2017 መረጃ)', 'Non-operational schemes (2017 data)'),

  urbanElectricity: L('Uwwisa Ibsaa Magaalaa', 'የከተማ ኤሌክትሪክ ሽፋን', 'Urban (town) electricity coverage'),
  ruralElectricity: L('Kebeleewwan Baadiyyaa Ibsaa Qaban', 'የገጠር ቀበሌዎች ኤሌክትሪክ ተጠቃሚ', 'Rural kebeles with electricity access'),

  ftcs: L("Wiirtuu Leenjii Qonnaan Bultootaa (FTC)", 'የገበሬ ማሰልጠኛ ማዕከላት (FTC)', 'Farmer Training Centers (FTCs)'),
};

const INTRO: Record<SectorKey, Record<Lang, string>> = {
  education: L(
    "Godinni Illubaabor mana barumsaa bu'uuraa 660, mana barumsaa sadarkaa tokkoffaa 440 fi mana barumsaa sadarkaa lammaffaa 45 qaba.",
    'ዞኑ 660 መሠረታዊ ትምህርት ቤቶች፣ 440 አንደኛ ደረጃ ትምህርት ቤቶች እና 45 ሁለተኛ ደረጃ ትምህርት ቤቶች አሉት።',
    'The zone operates 660 basic education schools, 440 primary schools, and 45 secondary schools.',
  ),
  health: L(
    'Godina keenya keessatti dhaabbilee fayyaa sadarkaa garaagaraa ijaaruuf baasiin guddaan taasifameera.',
    'በዞናችን ውስጥ የተለያዩ ደረጃ ያላቸው የጤና ተቋማትን ለመገንባት ከፍተኛ ወጪ ወጥቷል።',
    'Significant investment has gone into constructing health facilities at various levels across the zone.',
  ),
  water: L(
    'Waggoota shan darban keessatti, Waajjirri Bishaanii fi Anniisaa Godina Illubaabor pirojektoota gurguddaa fi xixiqqaa 1,250 ol hojjechuun rakkoo dhabamuu bishaan dhugaatii furuuf hojjeteera.',
    'ባለፉት አምስት ዓመታት፣ የኢሉአባቦር ዞን ውሃና ኢነርጂ ጽ/ቤት ከ1,250 በላይ ትላልቅና ትናንሽ ፕሮጀክቶችን በመገንባት የመጠጥ ውሃ እጥረት ችግርን ለመፍታት ሰርቷል።',
    "Over the past five years, the Illubabor Zone Water and Energy Office constructed and commissioned over 1,250 major and minor projects worth over half a billion Birr to resolve drinking water supply shortages in the zone. Working with community participation and stakeholders, the office completed 16 major schemes and 1,239 small schemes (hand pumps and developed springs) at a cost of 648,650,960.83 Birr, providing clean drinking water to 198,518 people and raising coverage from 73.5% (end of 2013 E.C.) to 83%.",
  ),
  electricity: L('', '', ''),
  agriculture: L(
    'Wiirtuuwwan Leenjii Qonnaan Bultootaa (FTC) 229 godina keessatti argamu.',
    '229 የገበሬ ማሰልጠኛ ማዕከላት (FTC) በዞኑ ውስጥ ይገኛሉ።',
    'The zone has 229 Farmer Training Centers (FTCs) located across its rural kebeles.',
  ),
};

function StatCard({ value, label, accent }: { value: string; label: string; accent: SectorKey }) {
  const { ring } = SECTOR_ACCENT[accent];
  return (
    <div
      className={`group rounded-lg border border-coffee-950/10 bg-white p-4 text-center transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:ring-2 ${ring}`}
    >
      <div className="font-display text-xl font-semibold text-coffee-950 transition-transform duration-200 group-hover:scale-110">
        {value}
      </div>
      <div className="mt-1 text-xs text-coffee-600">{label}</div>
    </div>
  );
}

function TeacherRow({
  title, cert, dip, ba, ma, lang,
}: { title: string; cert?: string; dip?: string; ba?: string; ma?: string; lang: Lang }) {
  return (
    <div className="rounded-lg border border-coffee-950/10 bg-white p-4 transition-shadow duration-200 hover:shadow-md">
      <p className="font-medium text-coffee-950">{title}</p>
      <div className="mt-2 grid grid-cols-1 gap-2 text-xs text-coffee-700 sm:grid-cols-2">
        {cert && <p>{UI.certificate[lang]}: {cert}</p>}
        {dip && <p>{UI.diploma[lang]}: {dip}</p>}
        {ba && <p>{UI.bachelors[lang]}: {ba}</p>}
        {ma && <p>{UI.masters[lang]}: {ma}</p>}
      </div>
    </div>
  );
}

function teacherStat(male: string, female: string, total: string, lang: Lang) {
  return `${UI.male[lang]} ${male} / ${UI.female[lang]} ${female} / ${UI.total[lang]} ${total}`;
}

function SectorHeading({ sectorKey, lang }: { sectorKey: SectorKey; lang: Lang }) {
  const Icon = SECTOR_ICON[sectorKey];
  const { icon } = SECTOR_ACCENT[sectorKey];
  return (
    <div className="flex items-center gap-3">
      <span
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-lg transition-transform duration-300 hover:rotate-6 hover:scale-110 ${icon}`}
      >
        <Icon size={20} strokeWidth={2} />
      </span>
      <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-coffee-950">
        {SECTOR_LABELS[sectorKey][lang]}
        <span aria-hidden="true">{SECTOR_EMOJI[sectorKey]}</span>
      </h3>
    </div>
  );
}

export function SectorStats({ only }: { only?: SectorKey } = {}) {
  const { language } = useLanguage();
  const lang = language as Lang;
  const sectorsToShow = only ? [only] : SECTORS;

  return (
    <div className="space-y-12">
      {sectorsToShow.map((key) => (
        <div key={key} className="border-t border-coffee-950/10 pt-8 first:border-t-0 first:pt-0">
          <SectorHeading sectorKey={key} lang={lang} />
          {INTRO[key][lang] && <p className="mt-3 text-sm text-coffee-800">{INTRO[key][lang]}</p>}

          {key === 'education' && (
            <div className="mt-6 space-y-8">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                <StatCard value="660" label={UI.basicSchools[lang]} accent={key} />
                <StatCard value="440" label={UI.primarySchools[lang]} accent={key} />
                <StatCard value="45" label={UI.secondarySchools[lang]} accent={key} />
              </div>

              <div>
                <h4 className="font-display text-base font-semibold text-coffee-950">{UI.studentData[lang]}</h4>
                <div className="mt-3 overflow-x-auto rounded-lg border border-coffee-950/10 bg-white">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-coffee-950/10 text-left text-xs text-coffee-600">
                        <th className="p-3">{UI.level[lang]}</th>
                        <th className="p-3">{UI.male[lang]}</th>
                        <th className="p-3">{UI.female[lang]}</th>
                        <th className="p-3">{UI.total[lang]}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-coffee-950/5">
                      <tr className="transition-colors hover:bg-parchment-50"><td className="p-3 font-medium text-coffee-950">{UI.basicEducation[lang]}</td><td className="p-3">27,535</td><td className="p-3">26,276</td><td className="p-3 font-medium">53,811</td></tr>
                      <tr className="transition-colors hover:bg-parchment-50"><td className="p-3 font-medium text-coffee-950">{UI.primarySchool[lang]}</td><td className="p-3">84,608</td><td className="p-3">78,632</td><td className="p-3 font-medium">163,240</td></tr>
                      <tr className="transition-colors hover:bg-parchment-50"><td className="p-3 font-medium text-coffee-950">{UI.secondarySchool[lang]}</td><td className="p-3">8,697</td><td className="p-3">8,332</td><td className="p-3 font-medium">17,029</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h4 className="font-display text-base font-semibold text-coffee-950">{UI.teacherData[lang]}</h4>
                <div className="mt-3 space-y-4">
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-clay-600">{UI.basicEdTeachers[lang]}</p>
                    <TeacherRow
                      lang={lang}
                      title={UI.byQualification[lang]}
                      cert={teacherStat('12', '163', '175', lang)}
                      dip={teacherStat('179', '439', '618', lang)}
                      ba={teacherStat('3', '10', '13', lang)}
                    />
                  </div>
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-clay-600">{UI.primaryTeachers[lang]}</p>
                    <TeacherRow
                      lang={lang}
                      title={UI.byQualification[lang]}
                      cert={teacherStat('111', '200', '311', lang)}
                      dip={teacherStat('1,578', '1,934', '3,512', lang)}
                      ba={teacherStat('694', '894', '1,591', lang)}
                      ma={teacherStat('19', '4', '23', lang)}
                    />
                  </div>
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-clay-600">{UI.secondaryTeachers[lang]}</p>
                    <TeacherRow
                      lang={lang}
                      title={UI.byQualification[lang]}
                      dip={teacherStat('21', '8', '29', lang)}
                      ba={teacherStat('864', '266', '1,130', lang)}
                      ma={teacherStat('178', '29', '207', lang)}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {key === 'health' && (
            <div className="mt-6 space-y-6">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-clay-600">{UI.govFacilities[lang]}</p>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  <StatCard value="1" label={UI.govHospitals[lang]} accent={key} />
                  <StatCard value="39" label={UI.healthCenters[lang]} accent={key} />
                  <StatCard value="273+" label={UI.healthPosts[lang]} accent={key} />
                </div>
              </div>
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-clay-600">{UI.privateFacilities[lang]}</p>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  <StatCard value="134" label={UI.clinics[lang]} accent={key} />
                  <StatCard value="126" label={UI.pharmacies[lang]} accent={key} />
                  <StatCard value="573+" label={UI.totalHealthInst[lang]} accent={key} />
                </div>
              </div>
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-clay-600">{UI.coverageNeeds[lang]}</p>
                <div className="grid grid-cols-2 gap-3">
                  <StatCard value="1 / 10 (10%)" label={UI.hospitalCoverage[lang]} accent={key} />
                  <StatCard value="39 / 52 (77%)" label={UI.healthCenterCoverage[lang]} accent={key} />
                </div>
              </div>
            </div>
          )}

          {key === 'water' && (
            <div className="mt-6 space-y-6">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-clay-600">{UI.operationalSchemes[lang]}</p>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  <StatCard value="41" label={UI.deepWells[lang]} accent={key} />
                  <StatCard value="2,431" label={UI.handDugWells[lang]} accent={key} />
                  <StatCard value="2,870" label={UI.developedSprings[lang]} accent={key} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                <StatCard value="198,518" label={UI.peopleReached[lang]} accent={key} />
                <StatCard value="83%" label={UI.zoneCoverage[lang]} accent={key} />
                <StatCard value="659" label={UI.nonOperational[lang]} accent={key} />
              </div>
            </div>
          )}

          {key === 'electricity' && (
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <StatCard value="62%+" label={UI.urbanElectricity[lang]} accent={key} />
              <StatCard value="71 / 260 (8.8%)" label={UI.ruralElectricity[lang]} accent={key} />
            </div>
          )}

          {key === 'agriculture' && (
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
              <StatCard value="229" label={UI.ftcs[lang]} accent={key} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}