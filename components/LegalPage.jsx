// Общая обёртка для юридических страниц: шапка, колонка текста, подвал.
// Серверный компонент (без хуков) — страницы отдаются статикой.
import Link from 'next/link';
import { CONTACT_EMAIL } from '../config.js';

export const LEGAL_LINKS = [
  ['/privacy', 'Политика конфиденциальности'],
  ['/rules', 'Правила сообщества'],
  ['/delete-account', 'Удаление аккаунта'],
];

export function LegalPage({ title, updated, ru, en, enTitle }) {
  return (
    <>
      <header className="hdr is-scrolled">
        <div className="wrap hdr__in">
          <Link href="/ru" className="brand" aria-label="StudyCrew — на главную">
            <img src="/logo.png" alt="" width="36" height="36" />
            <span>StudyCrew</span>
          </Link>
          <nav className="hdr__nav legal__nav" aria-label="Юридические страницы">
            {LEGAL_LINKS.map(([href, label]) => <Link key={href} href={href}>{label}</Link>)}
          </nav>
          {/* Английский оригинал уже на этой же странице — EN ведёт к нему. */}
          <div className="lang lang--legal" role="group" aria-label="Язык / Language">
            <span className="is-on" aria-current="page" lang="ru">RU</span>
            <a href="#en" hrefLang="en" lang="en">EN</a>
          </div>
        </div>
      </header>
      <main className="legal">
        <div className="wrap wrap--narrow">
          <Link href="/ru" className="legal__back">← На главную</Link>
          <article className="legal__doc" lang="ru">
            <h1>{title}</h1>
            <p className="legal__meta">Обновлено: {updated} · <a href="#en">English version ↓</a></p>
            {ru}
          </article>
          <article className="legal__doc legal__doc--en" id="en" lang="en">
            <h2 className="legal__enhead">English version</h2>
            <p className="legal__meta">Оригинал на английском языке — именно он указан в приложении и на странице Google Play. При расхождениях ориентируйтесь на него. / The original text, as used in the app and on Google Play.</p>
            <h1>{enTitle}</h1>
            {en}
          </article>
        </div>
      </main>
      <footer className="ftr">
        <div className="wrap ftr__in">
          <div className="ftr__brand">
            <Link href="/ru" className="brand"><img src="/logo.png" alt="" width="36" height="36" /><span>StudyCrew</span></Link>
            <p>Учиться вместе — интереснее.</p>
          </div>
          <nav className="ftr__nav" aria-label="Юридические страницы в подвале">
            {LEGAL_LINKS.map(([href, label]) => <Link key={href} href={href}>{label}</Link>)}
            {CONTACT_EMAIL && <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>}
          </nav>
        </div>
        <div className="wrap ftr__fine"><span>© {new Date().getFullYear()} StudyCrew</span></div>
      </footer>
    </>
  );
}
