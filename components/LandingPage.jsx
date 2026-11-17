'use client';

import { useEffect, useState } from 'react';
import {
  Users, Timer, Sparkles, ArrowRight, Camera, Target, MessageCircle, KeyRound,
  BookOpen, CalendarDays, BarChart3, Snowflake, Search, Send, Trophy, Palette,
  Smile, Server, Flag, Gauge, Trash2, Smartphone, Bell, LayoutGrid,
  ListChecks, DoorOpen, ImagePlus, UserCircle, ChevronDown, Menu, X, Flame, Check,
} from 'lucide-react';

import { BETA_URL, CONTACT_EMAIL } from '../config.js';
import { LangProvider, useT } from './i18n/index.js';
import { Phone, Coin } from './Phone.jsx';
import {
  FocusScreen, GroupScreen, ChatScreen, ReportScreen, LeaderboardScreen,
  FriendSearch, ChallengeCard, ApartmentScene,
} from './Screens.jsx';
import { FocusDemo, StreakCalendar, StreakTrack, AvatarStudio } from './Demos.jsx';

const logo = '/logo.png';
const logoMark = '/logo-mark-white.png';

// Порядок и якоря разделов; подписи — в словаре (common.nav).
const NAV = ['groups', 'focus', 'apartment', 'friends', 'coins', 'safety', 'faq'];

// Адрес главной для каждого языка: английская — по умолчанию.
const HOME = { en: '/', ru: '/ru' };

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-in'));
      return undefined;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      }),
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

export default function LandingPage({ lang = 'ru' }) {
  return (
    <LangProvider lang={lang}>
      <Landing />
    </LangProvider>
  );
}

function Landing() {
  useReveal();
  const t = useT();
  return (
    <>
      <a className="skip" href="#main">{t.common.skip}</a>
      <Header />
      <main id="main">
        <Hero />
        <Pillars />
        <Groups />
        <Focus />
        <Apartment />
        <Friends />
        <Coins />
        <Safety />
        <Soon />
        <Beta />
        <Faq />
      </main>
      <Footer />
    </>
  );
}

/* ------------------------------------------------------------------ */

function Brand() {
  const t = useT();
  return (
    <a href="#top" className="brand" aria-label={t.common.brandAria}>
      <img src={logo} alt="" width="36" height="36" />
      <span>StudyCrew</span>
    </a>
  );
}

// Якорь раздела, который сейчас под шапкой: его сохраняем при смене языка.
function currentSectionHash() {
  let id = '';
  document.querySelectorAll('main section[id]').forEach((s) => {
    if (s.getBoundingClientRect().top <= 140) id = s.id;
  });
  if (!id || id === 'top') return '';
  return `#${id}`;
}

function LangSwitch() {
  const t = useT();
  const go = (lang) => (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return; // новая вкладка — как обычная ссылка
    e.preventDefault();
    window.location.assign(HOME[lang] + currentSectionHash());
  };
  return (
    <div className="lang" role="group" aria-label={t.common.langAria}>
      {['en', 'ru'].map((l) => (l === t.lang ? (
        <span key={l} className="is-on" aria-current="page" lang={l}>{l.toUpperCase()}</span>
      ) : (
        <a key={l} href={HOME[l]} hrefLang={l} lang={l} onClick={go(l)}>{l.toUpperCase()}</a>
      )))}
    </div>
  );
}

function Header() {
  const t = useT();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  return (
    <header className={`hdr ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
      <div className="wrap hdr__in">
        <Brand />
        <nav className="hdr__nav" aria-label={t.common.navAria}>
          {NAV.map((id) => (
            <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{t.common.nav[id]}</a>
          ))}
        </nav>
        <LangSwitch />
        <a href="#beta" className="btn btn--primary btn--sm hdr__cta">{t.common.cta}</a>
        <button className="hdr__burger" aria-label={open ? t.common.menuClose : t.common.menuOpen} aria-expanded={open} onClick={() => setOpen((o) => !o)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  );
}

function Rays({ className = '' }) {
  return (
    <svg className={`rays ${className}`} viewBox="0 0 120 50" aria-hidden="true">
      <line x1="60" y1="6" x2="60" y2="30" />
      <line x1="22" y1="16" x2="38" y2="34" />
      <line x1="98" y1="16" x2="82" y2="34" />
    </svg>
  );
}

function Hero() {
  const { hero: h } = useT();
  return (
    <section className="hero" id="top">
      <div className="wrap hero__in">
        <div className="hero__copy">
          <span className="eyebrow"><span className="dot" /> {h.eyebrow}</span>
          <h1>
            {h.titleA}<span className="nowrap"><span className="hl"><Rays className="hero__rays" />{h.titleHl}</span>{h.titleDash}</span>{h.titleB}
          </h1>
          <p className="lead">{h.lead}</p>
          <div className="hero__ctas">
            <a href="#beta" className="btn btn--primary btn--lg">{h.ctaBeta} <ArrowRight size={18} /></a>
            <a href="#groups" className="btn btn--ghost btn--lg">{h.ctaMore}</a>
          </div>
          <dl className="hero__facts">
            {h.facts.map(([dt, dd]) => <div key={dt}><dt>{dt}</dt><dd>{dd}</dd></div>)}
          </dl>
        </div>

        <div className="hero__visual">
          <div className="hero__blob" aria-hidden="true" />
          <Phone tab="focus" label={h.phoneLabel} className="phone--hero">
            <FocusScreen />
          </Phone>
          <div className="float float--a" aria-hidden="true">
            <span className="float__ic float__ic--flame"><Flame size={16} /></span>
            <div><strong>{h.floatA[0]}</strong><span>{h.floatA[1]}</span></div>
          </div>
          <div className="float float--b" aria-hidden="true">
            <span className="float__ic"><Check size={16} /></span>
            <div><strong>{h.floatB[0]}</strong><span>{h.floatB[1]}</span></div>
          </div>
          <div className="float float--c" aria-hidden="true">
            <Coin size={22} />
            <div><strong>{h.floatC[0]}</strong><span>{h.floatC[1]}</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

const PILLARS = [
  { href: '#groups', Icon: Users },
  { href: '#focus', Icon: Timer },
  { href: '#coins', Icon: Sparkles },
];

function Pillars() {
  const { pillars: p } = useT();
  return (
    <section className="pillars" aria-label={p.aria}>
      <div className="wrap pillars__grid">
        {PILLARS.map(({ href, Icon }, i) => {
          const [t, d] = p.items[i];
          return (
            <a key={href} href={href} className="pillar reveal" style={{ '--d': `${i * 80}ms` }}>
              <span className="pillar__ic"><Icon size={22} /></span>
              <strong>{t}</strong>
              <span>{d}</span>
              <ArrowRight size={18} className="pillar__go" />
            </a>
          );
        })}
      </div>
    </section>
  );
}

function SectionHead({ eyebrow, title, lead, center }) {
  return (
    <div className={`shead reveal ${center ? 'shead--center' : ''}`}>
      <span className="shead__eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {lead && <p>{lead}</p>}
    </div>
  );
}

function Feature({ Icon, title, children }) {
  return (
    <div className="feat reveal">
      <span className="feat__ic"><Icon size={20} /></span>
      <div>
        <h3>{title}</h3>
        <p>{children}</p>
      </div>
    </div>
  );
}

/** Список фич: иконки задаёт вёрстка, тексты [заголовок, описание] — словарь. */
function Features({ icons, items }) {
  return icons.map((Icon, i) => (
    <Feature key={items[i][0]} Icon={Icon} title={items[i][0]}>{items[i][1]}</Feature>
  ));
}

function Groups() {
  const { groups: g } = useT();
  return (
    <section className="sec" id="groups">
      <div className="wrap">
        <SectionHead eyebrow={g.eyebrow} title={g.title} lead={g.lead} />
        <div className="split">
          <div className="split__feats">
            <Features icons={[KeyRound, BookOpen, Camera, Target, MessageCircle]} items={g.feats} />
          </div>
          <div className="split__visual reveal">
            <Phone tab="groups" label={g.phoneLabel}>
              <GroupScreen interactive />
            </Phone>
            <p className="tryme"><span>↑</span> {g.tryme}</p>
          </div>
        </div>

        <div className="duo">
          <div className="reveal">
            <ChallengeCard />
          </div>
          <div className="reveal duo__chat">
            <Phone tab="groups" label={g.chatLabel} hideTabs>
              <ChatScreen />
            </Phone>
          </div>
        </div>
      </div>
    </section>
  );
}

function Focus() {
  const { focus: f } = useT();
  return (
    <section className="sec sec--tint" id="focus">
      <div className="wrap">
        <SectionHead eyebrow={f.eyebrow} title={f.title} lead={f.lead} />

        <div className="reveal">
          <FocusDemo />
        </div>

        <div className="split split--rev">
          <div className="split__visual reveal">
            <Phone tab="focus" label={f.reportLabel}>
              <ReportScreen />
            </Phone>
          </div>
          <div className="split__feats">
            <Features icons={[BookOpen, BarChart3, CalendarDays, DoorOpen, Bell, Snowflake]} items={f.feats} />
          </div>
        </div>

        <div className="streak reveal">
          <StreakCalendar />
          <div className="streak__side">
            <h3>{f.streakTitle}</h3>
            <p>{f.streakText}</p>
            <StreakTrack current={14} />
          </div>
        </div>
      </div>
    </section>
  );
}

function Apartment() {
  const { apartment: a } = useT();
  return (
    <section className="sec" id="apartment">
      <div className="wrap">
        <SectionHead eyebrow={a.eyebrow} title={a.title} lead={a.lead} />
        <div className="split">
          <div className="split__feats">
            <Features icons={[Users, Timer, MessageCircle, Trophy]} items={a.feats} />
          </div>
          <div className="split__visual reveal">
            <ApartmentScene />
            <p className="tryme">{a.caption}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Friends() {
  const { friends: f } = useT();
  const [period, setPeriod] = useState('week');
  const [scope, setScope] = useState('groups');
  return (
    <section className="sec" id="friends">
      <div className="wrap">
        <SectionHead eyebrow={f.eyebrow} title={f.title} lead={f.lead} />
        <div className="split">
          <div className="split__feats">
            <Feature Icon={Search} title={f.feats[0][0]}>{f.feats[0][1]}</Feature>
            <div className="reveal"><FriendSearch /></div>
            <Feature Icon={Send} title={f.feats[1][0]}>{f.feats[1][1]}</Feature>
            <Feature Icon={Trophy} title={f.feats[2][0]}>{f.feats[2][1]}</Feature>
          </div>
          <div className="split__visual reveal">
            <div className="board-ctl">
              <div className="seg seg--switch" role="tablist" aria-label={f.periodAria}>
                {['week', 'month', 'year'].map((id) => (
                  <button key={id} role="tab" aria-selected={period === id} className={period === id ? 'is-on' : ''} onClick={() => setPeriod(id)}>{f.periods[id]}</button>
                ))}
              </div>
              <div className="seg seg--switch" role="tablist" aria-label={f.scopeAria}>
                {['groups', 'friends'].map((id) => (
                  <button key={id} role="tab" aria-selected={scope === id} className={scope === id ? 'is-on' : ''} onClick={() => setScope(id)}>{f.scopes[id]}</button>
                ))}
              </div>
            </div>
            <Phone tab="friends" label={f.boardLabel}>
              <LeaderboardScreen period={period} scope={scope} />
            </Phone>
          </div>
        </div>
      </div>
    </section>
  );
}

function Coins() {
  const { coins: c } = useT();
  return (
    <section className="sec sec--tint" id="coins">
      <div className="wrap">
        <SectionHead eyebrow={c.eyebrow} title={c.title} lead={c.lead} />
        <div className="coins">
          <div className="coins__table reveal">
            <table>
              <caption className="sr">{c.caption}</caption>
              <thead><tr>{c.head.map((h) => <th key={h} scope="col">{h}</th>)}</tr></thead>
              <tbody>
                {c.rows.map(([a, b, d]) => (
                  <tr key={a}><th scope="row">{a}</th><td><span className="amt"><Coin size={16} /> {b}</span></td><td>{d}</td></tr>
                ))}
              </tbody>
            </table>
            <div className="coins__feats">
              <Features icons={[Palette, Smile]} items={c.feats} />
            </div>
          </div>
          <div className="reveal">
            <AvatarStudio />
          </div>
        </div>
      </div>
    </section>
  );
}

const SAFETY_ICONS = [Flag, Gauge, Server, Trash2, Smartphone];

function Safety() {
  const { safety: s } = useT();
  return (
    <section className="sec" id="safety">
      <div className="wrap">
        <SectionHead eyebrow={s.eyebrow} title={s.title} lead={s.lead} center />
        <div className="safe">
          {SAFETY_ICONS.map((Icon, i) => {
            const [t, d] = s.items[i];
            return (
              <article key={t} className="safe__card reveal" style={{ '--d': `${i * 60}ms` }}>
                <span className="safe__ic"><Icon size={22} /></span>
                <h3>{t}</h3>
                <p>{d}</p>
              </article>
            );
          })}
          <article className="safe__card safe__card--age reveal" style={{ '--d': '300ms' }}>
            <span className="safe__age">13+</span>
            <h3>{s.ageTitle}</h3>
            <p>{s.ageText}</p>
          </article>
        </div>
      </div>
    </section>
  );
}

const SOON_ICONS = [LayoutGrid, ListChecks, UserCircle, ImagePlus];

function Soon() {
  const { soon: s } = useT();
  return (
    <section className="sec sec--soon" id="soon">
      <div className="wrap">
        <SectionHead eyebrow={s.eyebrow} title={s.title} center />
        <ul className="soon">
          {SOON_ICONS.map((Icon, i) => (
            <li key={s.items[i]} className="reveal" style={{ '--d': `${i * 50}ms` }}>
              <Icon size={20} /><span>{s.items[i]}</span><em>{s.badge}</em>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Beta() {
  const { beta: b } = useT();
  return (
    <section className="beta" id="beta">
      <div className="wrap">
        <div className="beta__card reveal">
          <img src={logoMark} alt="" className="beta__mark" width="140" height="140" />
          <div className="beta__copy">
            <span className="beta__eyebrow">{b.eyebrow}</span>
            <h2>{b.title}</h2>
            <p>{b.text}</p>
            <div className="beta__ctas">
              {BETA_URL ? (
                <a className="btn btn--light btn--lg" href={BETA_URL} target="_blank" rel="noopener noreferrer">
                  {b.join} <ArrowRight size={18} />
                </a>
              ) : (
                <span className="beta__soon"><Smartphone size={18} /> {b.soon}</span>
              )}
              {CONTACT_EMAIL && (
                <a className="btn btn--outline-light btn--lg" href={`mailto:${CONTACT_EMAIL}`}>{b.write}</a>
              )}
            </div>
            <ul className="beta__facts">
              {b.facts.map((f) => <li key={f}><Check size={16} /> {f}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Faq() {
  const { faq } = useT();
  const [open, setOpen] = useState(0);
  return (
    <section className="sec sec--faq" id="faq">
      <div className="wrap wrap--narrow">
        <SectionHead eyebrow={faq.eyebrow} title={faq.title} center />
        <div className="faq">
          {faq.qa.map(([q, a], i) => {
            const isOpen = open === i;
            return (
              <div key={q} className={`faq__item ${isOpen ? 'is-open' : ''}`}>
                <h3>
                  <button aria-expanded={isOpen} aria-controls={`faq-${i}`} id={`faq-q-${i}`} onClick={() => setOpen(isOpen ? -1 : i)}>
                    {q}<ChevronDown size={20} />
                  </button>
                </h3>
                <div id={`faq-${i}`} role="region" aria-labelledby={`faq-q-${i}`} className="faq__a" hidden={!isOpen}>
                  <p>{a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const t = useT();
  return (
    <footer className="ftr">
      <div className="wrap ftr__in">
        <div className="ftr__brand">
          <Brand />
          <p>{t.footer.tagline}</p>
        </div>
        <nav className="ftr__nav" aria-label={t.common.footerNavAria}>
          {NAV.map((id) => <a key={id} href={`#${id}`}>{t.common.nav[id]}</a>)}
          {t.footer.legal.map(([href, label]) => <a key={href} href={href}>{label}</a>)}
          {CONTACT_EMAIL && <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>}
        </nav>
      </div>
      <div className="wrap ftr__fine">
        <span>© {new Date().getFullYear()} StudyCrew</span>
        <span>{t.footer.fine}</span>
      </div>
    </footer>
  );
}
