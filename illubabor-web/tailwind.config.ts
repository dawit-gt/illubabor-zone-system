import type { Config } from 'tailwindcss';

// Illubabor Zone design tokens — retinted toward forest green as the
// primary identity color, lighter overall than the original brown-led
// palette, while keeping the same class names used across components.
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        coffee: {
          950: '#2E7A54', // deep forest green — primary dark (header/footer/hero overlay)
          800: '#2E4A38',
          600: '#4E6F55',
        },
        clay: {
          600: '#C1703A', // ripe coffee cherry — primary accent, CTAs
          500: '#D08A54',
        },
        canopy: {
          700: '#3F6B45', // shade-grown forest canopy — secondary accent
          500: '#5C8A62',
        },
        sor: {
          600: '#2C6F7F', // Sor River — used sparingly for links/info
        },
        parchment: {
          50: '#FBF8F1', // lighter background than before
          100: '#F2ECDF',
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