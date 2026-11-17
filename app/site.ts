import type { Metadata, Viewport } from 'next';

export const SITE_URL = 'https://studycrew-site.studycrew-app.workers.dev';

// hreflang для главной: русская версия — основная (x-default).
export const LANGUAGES = { ru: '/', en: '/en', 'x-default': '/' };

type Lang = 'ru' | 'en';

const COPY: Record<Lang, { title: string; description: string; locale: string; og: string; ogAlt: string }> = {
  ru: {
    title: 'StudyCrew — учиться вместе интереснее',
    description:
      'StudyCrew — приложение для школьников и студентов: учебные группы с общими домашками, честный таймер фокуса, монеты за учёбу, серии дней и челленджи с друзьями.',
    locale: 'ru_RU',
    og: '/og.png',
    ogAlt: 'StudyCrew — учиться вместе интереснее',
  },
  en: {
    title: 'StudyCrew — studying together is more fun',
    description:
      'StudyCrew is a study app for school and university students: study groups with shared homework, an honest Focus timer, Study Coins for studying, daily streaks and challenges with friends.',
    locale: 'en_US',
    og: '/og-en.png',
    ogAlt: 'StudyCrew — studying together is more fun',
  },
};

/** Метаданные корневой раскладки для языка. canonical './' — у каждой страницы свой адрес. */
export function baseMetadata(lang: Lang): Metadata {
  const c = COPY[lang];
  const other = lang === 'ru' ? COPY.en : COPY.ru;
  const image = { url: c.og, width: 1200, height: 630, alt: c.ogAlt };
  return {
    metadataBase: new URL(SITE_URL),
    title: c.title,
    description: c.description,
    alternates: { canonical: './' },
    icons: {
      icon: '/favicon.png',
      apple: '/apple-touch-icon.png',
    },
    openGraph: {
      title: c.title,
      description: c.description,
      url: './',
      siteName: 'StudyCrew',
      type: 'website',
      locale: c.locale,
      alternateLocale: [other.locale],
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title: c.title,
      description: c.description,
      images: [image],
    },
  };
}

/** Метаданные главной: свой canonical и hreflang на обе версии. */
export function homeMetadata(lang: Lang): Metadata {
  return {
    alternates: { canonical: lang === 'ru' ? '/' : '/en', languages: LANGUAGES },
  };
}

export const viewport: Viewport = {
  themeColor: '#01A9A9',
};
