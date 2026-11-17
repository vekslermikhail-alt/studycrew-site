import type { Metadata, Viewport } from 'next';

// Шрифты подключены локально (fontsource) — сайту не нужны внешние CDN.
import '@fontsource/unbounded/cyrillic-600.css';
import '@fontsource/unbounded/latin-600.css';
import '@fontsource/unbounded/cyrillic-700.css';
import '@fontsource/unbounded/latin-700.css';
import '@fontsource/manrope/cyrillic-400.css';
import '@fontsource/manrope/latin-400.css';
import '@fontsource/manrope/cyrillic-500.css';
import '@fontsource/manrope/latin-500.css';
import '@fontsource/manrope/cyrillic-600.css';
import '@fontsource/manrope/latin-600.css';
import '@fontsource/manrope/cyrillic-700.css';
import '@fontsource/manrope/latin-700.css';
import '@fontsource/manrope/cyrillic-800.css';
import '@fontsource/manrope/latin-800.css';
import './globals.css';

const SITE_URL = 'https://studycrew-site.studycrew-app.workers.dev';
const title = 'StudyCrew — учиться вместе интереснее';
const description =
  'StudyCrew — приложение для школьников и студентов: учебные группы с общими домашками, честный таймер фокуса, монеты за учёбу, серии дней и челленджи с друзьями.';
const ogImage = {
  url: '/og.png',
  width: 1200,
  height: 630,
  alt: 'StudyCrew — учиться вместе интереснее',
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  // './' — canonical каждой страницы указывает на её собственный адрес.
  alternates: { canonical: './' },
  icons: {
    icon: '/favicon.png',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title,
    description,
    url: './',
    siteName: 'StudyCrew',
    type: 'website',
    locale: 'ru_RU',
    images: [ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [ogImage],
  },
};

export const viewport: Viewport = {
  themeColor: '#01A9A9',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
