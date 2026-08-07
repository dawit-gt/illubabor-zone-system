import type { Config } from 'tailwindcss';

// Illubabor Zone design tokens — grounded in what the zone actually is:
// a forested, coffee-growing highland zone along the Sor River.
// Distinct from the Hurumu Woreda site's forest-green + gold identity.
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        coffee: {
          950: '#2B1D16', // roasted bean — primary dark, header/footer
          800: '#4A3226',
          600: '#6B4A38',
        },
        clay: {
          600: '#B8622E', // ripe coffee cherry — primary accent
          500: '#CC7A45',
        },
        canopy: {
          700: '#3F5233', // shade-grown forest canopy — secondary accent
          500: '#5C7248',
        },
        sor: {
          600: '#2C5F6F', // Sor River — used sparingly for links/info
        },
        parchment: {
          50: '#F7F2E9', // background
          100: '#EFE7D6',
        },
        gold: {
          500: '#C99A2E', // ripe cherry gold — highlights, badges only
        },
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'serif'],
        body: ['var(--font-work-sans)', 'sans-serif'],
        mono: ['var(--font-ibm-plex-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
};
export default config;
