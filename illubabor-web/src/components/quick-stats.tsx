'use client';

import { useLanguage } from '@/lib/language-provider';
import { useZone } from '@/hooks/useZone';
import { Users, Mountain, Landmark, MapPinned, type LucideIcon } from 'lucide-react';

type Lang = 'om' | 'am' | 'en';

const LABELS = {
  population: { om: 'Uummata (2019)', am: 'ህዝብ ብዛት (2019)', en: 'Population (2019)' },
  male: { om: 'Dhiira', am: 'ወንድ', en: 'Male' },
  female: { om: 'Dhalaa', am: 'ሴት', en: 'Female' },
  total: { om: 'Idaáma', am: 'ጠቅላላ', en: 'Total' },
  area: { om: 'Bal\'ina Lafaa', am: 'የመሬት ስፋት', en: 'Land Area' },
  divisions: { om: 'Aanaalee fi Gandoota', am: 'ወረዳዎችና ቀበሌዎች', en: 'Woredas & Kebeles' },
  woredas: { om: 'Aanaalee', am: 'ወረዳዎች', en: 'woredas' },
  ruralKebeles: { om: 'Gandoota Baadiyyaa', am: 'የገጠር ቀበሌዎች', en: 'rural kebeles' },
  urbanKebeles: { om: 'Gandoota Magaalaa', am: 'የከተማ ቀበሌዎች', en: 'urban kebeles' },
  elevation: { om: 'Ol\'aantummaa', am: 'ከፍታ', en: 'Elevation' },
  includingTown: { om: '(Magaalaa Metuu dabalatee)', am: '(መቱ ከተማን ጨምሮ)', en: '(including Mettu Town Administration)' },
};

type RowKey = 'population' | 'area' | 'divisions' | 'elevation';

const ROW_ICON: Record<RowKey, LucideIcon> = {
  population: Users,
  area: MapPinned,
  divisions: Landmark,
  elevation: Mountain,
};

const ROW_EMOJI: Record<RowKey, string> = {
  population: '👥',
  area: '🗺️',
  divisions: '🏘️',
  elevation: '⛰️',
};

const ROW_ACCENT: Record<RowKey, string> = {
  population: 'bg-clay-600/10 text-clay-600',
  area: 'bg-sor-600/10 text-sor-600',
  divisions: 'bg-canopy-700/10 text-canopy-700',
  elevation: 'bg-gold-500/20 text-coffee-800',
};

function StatRow({
  rowKey, label, children,
}: { rowKey: RowKey; label: string; children: React.ReactNode }) {
  const Icon = ROW_ICON[rowKey];
  return (
    <tr className="group transition-colors duration-200 hover:bg-parchment-50">
      <td className="w-1/3 p-4 align-top">
        <div className="flex items-center gap-2.5">
          <span
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-base transition-transform duration-200 group-hover:scale-110 ${ROW_ACCENT[rowKey]}`}
          >
            <Icon size={16} aria-hidden="true" />
          </span>
          <span className="font-medium text-coffee-950">
            {label} <span aria-hidden="true">{ROW_EMOJI[rowKey]}</span>
          </span>
        </div>
      </td>
      <td className="p-4 text-coffee-800">{children}</td>
    </tr>
  );
}

export function QuickStats() {
  const { language } = useLanguage();
  const lang = language as Lang;
  const { zone, loading } = useZone();

  if (loading || !zone) return <div className="text-sm text-coffee-600">Loading…</div>;

  return (
    <div className="overflow-hidden rounded-lg border border-coffee-950/10 bg-white transition-shadow duration-300 hover:shadow-lg">
      <table className="w-full text-sm">
        <tbody className="divide-y divide-coffee-950/10">
          <StatRow rowKey="population" label={LABELS.population[lang]}>
            {LABELS.male[lang]}: {zone.populationMale?.toLocaleString() ?? '—'};{' '}
            {LABELS.female[lang]}: {zone.populationFemale?.toLocaleString() ?? '—'};{' '}
            {LABELS.total[lang]}: {zone.population?.toLocaleString() ?? '—'}
          </StatRow>

          <StatRow rowKey="area" label={LABELS.area[lang]}>
            {zone.areaKm2?.toLocaleString()} km² {LABELS.includingTown[lang]}
          </StatRow>

          <StatRow rowKey="divisions" label={LABELS.divisions[lang]}>
            {zone._count?.woredas ?? '—'} {LABELS.woredas[lang]}; {zone.ruralKebeles ?? '—'} {LABELS.ruralKebeles[lang]}; {zone.urbanKebeles ?? '—'} {LABELS.urbanKebeles[lang]}
          </StatRow>

          <StatRow rowKey="elevation" label={LABELS.elevation[lang]}>
            {zone.elevationMin ?? '—'} m – {zone.elevationMax ?? '—'} m
          </StatRow>
        </tbody>
      </table>
    </div>
  );
}