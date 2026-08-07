import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const WOREDAS: { name: string; isTown?: boolean }[] = [
  { name: 'Metu Ketema', isTown: true }, // zonal capital town administration
  { name: 'Metu' },
  { name: 'Alle' },
  { name: 'Bacho' },
  { name: 'Bilo Nopa' },
  { name: 'Bure' },
  { name: 'Darimu' },
  { name: 'Didu' },
  { name: 'Doranni' },
  { name: 'Halu' },
  { name: 'Hurumu' },
  { name: 'Nono Sele' },
  { name: 'Yayo' },
];

const DEPARTMENTS = [
  { name: 'Agriculture and Natural Resources', slug: 'agriculture' },
  { name: 'Health', slug: 'health' },
  { name: 'Education', slug: 'education' },
  { name: 'Land Administration and Use', slug: 'land-administration' },
  { name: 'Trade and Industry', slug: 'trade-industry' },
  { name: 'Justice', slug: 'justice' },
  { name: 'Finance and Economic Development', slug: 'finance' },
  { name: 'Women, Children and Social Affairs', slug: 'social-affairs' },
];

async function main() {
  const zone = await prisma.zone.upsert({
    where: { name: 'Illubabor' },
    update: {},
    create: {
      name: 'Illubabor',
      nameOm: 'Illuu Abbaa Booraa',
      capital: 'Metu',
      region: 'Oromia',
      population: 2271609, // 2007 census
      areaKm2: 15135.33,
      description:
        'Illubabor Zone is a forested, coffee-producing zone in the Oromia Region of Ethiopia, home to the Sor River and Sor Falls near its capital, Metu.',
    },
  });

  for (const w of WOREDAS) {
    await prisma.woreda.upsert({
      where: { slug: w.name.toLowerCase().replace(/\s+/g, '-') },
      update: {},
      create: {
        name: w.name,
        slug: w.name.toLowerCase().replace(/\s+/g, '-'),
        isTown: w.isTown ?? false,
        zoneId: zone.id,
      },
    });
  }

  for (const d of DEPARTMENTS) {
    await prisma.department.upsert({
      where: { slug: d.slug },
      update: {},
      create: {
        name: d.name,
        slug: d.slug,
        zoneId: zone.id,
      },
    });
  }

  const hashedPassword = await bcrypt.hash('ChangeMe123!', 10);
  await prisma.user.upsert({
    where: { email: '[email protected]' },
    update: {},
    create: {
      email: '[email protected]',
      password: hashedPassword,
      fullName: 'Zone Super Admin',
      role: Role.SUPER_ADMIN,
    },
  });

  console.log('Seed complete: 1 zone, 13 woredas, 8 departments, 1 super admin.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
