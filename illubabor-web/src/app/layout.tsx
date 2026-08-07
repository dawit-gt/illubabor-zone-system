import type { Metadata } from 'next';
import { Fraunces, Work_Sans, IBM_Plex_Mono } from 'next/font/google';
import { LanguageProvider } from '@/lib/language-provider';
import { AuthProvider } from '@/lib/auth';
import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  weight: ['400', '500', '600', '700'],
});

const workSans = Work_Sans({
  subsets: ['latin'],
  variable: '--font-work-sans',
  weight: ['400', '500', '600'],
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-ibm-plex-mono',
  weight: ['400', '500'],
});

export const metadata: Metadata = {
  title: 'Illubabor Zone Administration',
  description:
    'Official public portal of Illubabor Zone, Oromia Region, Ethiopia — services, news, departments, and transparency.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="om">
      <body className={`${fraunces.variable} ${workSans.variable} ${ibmPlexMono.variable}`}>
        <LanguageProvider>
          <AuthProvider>{children}</AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
