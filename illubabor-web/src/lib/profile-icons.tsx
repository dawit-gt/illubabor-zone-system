import {
  Droplet, School, Zap, Cross, Smartphone, Car, GraduationCap, ShowerHead,
  Home, Wheat, TreePine, Users, Building2, Heart, Wifi, Sun,
} from 'lucide-react';

export const PROFILE_ICONS = {
  droplet: Droplet,
  school: School,
  zap: Zap,
  cross: Cross,
  smartphone: Smartphone,
  car: Car,
  graduationCap: GraduationCap,
  showerHead: ShowerHead,
  home: Home,
  wheat: Wheat,
  treePine: TreePine,
  users: Users,
  building: Building2,
  heart: Heart,
  wifi: Wifi,
  sun: Sun,
} as const;

export type ProfileIconKey = keyof typeof PROFILE_ICONS;

export function ProfileIcon({ name, size = 24, className }: { name: string; size?: number; className?: string }) {
  const Icon = PROFILE_ICONS[name as ProfileIconKey];
  if (!Icon) return null;
  return <Icon size={size} className={className} />;
}