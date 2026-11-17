'use client';

import { useEffect, useState } from 'react';
import {
  Users, Timer, Sparkles, ArrowRight, Camera, Target, MessageCircle, KeyRound,
  BookOpen, CalendarDays, BarChart3, Snowflake, Search, Send, Trophy, Palette,
  Smile, Server, Flag, Gauge, ShieldCheck, Trash2, Smartphone, Bell, LayoutGrid,
  ListChecks, DoorOpen, ImagePlus, UserCircle, ChevronDown, Menu, X, Flame, Check,
} from 'lucide-react';

import { BETA_URL, CONTACT_EMAIL } from '../config.js';
import { Phone, Coin } from './Phone.jsx';
import {
  FocusScreen, GroupScreen, ChatScreen, ReportScreen, LeaderboardScreen,
  FriendSearch, ChallengeCard, ApartmentScene,
} from './Screens.jsx';
import { FocusDemo, StreakCalendar, StreakTrack, AvatarStudio } from './Demos.jsx';

const logo = '/logo.png';
const logoMark = '/logo-mark-white.png';

const NAV = [
  ['#groups', 'Группы'],
  ['#focus', 'Фокус'],
  ['#apartment', 'Квартира'],
  ['#friends', 'Друзья'],
  ['#coins', 'Монеты'],
  ['#safety', 'Безопасность'],
  ['#faq', 'Вопросы'],
];

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

export default function LandingPage() {
  useReveal();
  return (
    <>
      <a className="skip" href="#main">Перейти к содержанию</a>
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
  return (
    <a href="#top" className="brand" aria-label="StudyCrew — на главную">
      <img src={logo} alt="" width="36" height="36" />
      <span>StudyCrew</span>
    </a>
  );
}

function Header() {
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
        <nav className="hdr__nav" aria-label="Разделы">
          {NAV.map(([href, label]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>
          ))}
        </nav>
        <a href="#beta" className="btn btn--primary btn--sm hdr__cta">В бету</a>
        <button className="hdr__burger" aria-label={open ? 'Закрыть меню' : 'Открыть меню'} aria-expanded={open} onClick={() => setOpen((o) => !o)}>
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
  return (
    <section className="hero" id="top">
      <div className="wrap hero__in">
        <div className="hero__copy">
          <span className="eyebrow"><span className="dot" /> Закрытая бета · Android</span>
          <h1>
            Учиться <span className="nowrap"><span className="hl"><Rays className="hero__rays" />вместе</span>&nbsp;—</span> интереснее
          </h1>
          <p className="lead">
            StudyCrew — приложение для школьников и студентов, которое превращает учёбу в общее дело.
            Группы с общими домашками, таймер фокуса, монеты за учёбу, серии дней и челленджи
            с друзьями помогают заниматься регулярно и не в одиночку.
          </p>
          <div className="hero__ctas">
            <a href="#beta" className="btn btn--primary btn--lg">Как попасть в бету <ArrowRight size={18} /></a>
            <a href="#groups" className="btn btn--ghost btn--lg">Что внутри</a>
          </div>
          <dl className="hero__facts">
            <div><dt>5–180</dt><dd>минут в сессии фокуса</dd></div>
            <div><dt>100</dt><dd>дней — самая длинная награда за серию</dd></div>
            <div><dt>13+</dt><dd>возраст пользователей</dd></div>
          </dl>
        </div>

        <div className="hero__visual">
          <div className="hero__blob" aria-hidden="true" />
          <Phone tab="focus" label="Концепт экрана таймера фокуса" className="phone--hero">
            <FocusScreen />
          </Phone>
          <div className="float float--a" aria-hidden="true">
            <span className="float__ic float__ic--flame"><Flame size={16} /></span>
            <div><strong>Серия 14 дней</strong><span>+50 монет</span></div>
          </div>
          <div className="float float--b" aria-hidden="true">
            <span className="float__ic"><Check size={16} /></span>
            <div><strong>Маша сделала алгебру</strong><span>10 «Б» · фото на проверке</span></div>
          </div>
          <div className="float float--c" aria-hidden="true">
            <Coin size={22} />
            <div><strong>+1 монета</strong><span>за каждую минуту</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Pillars() {
  const items = [
    { href: '#groups', Icon: Users, t: 'Группы', d: 'Домашки, чат и общие цели для класса или курса.' },
    { href: '#focus', Icon: Timer, t: 'Фокус', d: 'Честный таймер и статистика по предметам.' },
    { href: '#coins', Icon: Sparkles, t: 'Мотивация', d: 'Монеты, серии дней и награды за регулярность.' },
  ];
  return (
    <section className="pillars" aria-label="Главное">
      <div className="wrap pillars__grid">
        {items.map(({ href, Icon, t, d }, i) => (
          <a key={t} href={href} className="pillar reveal" style={{ '--d': `${i * 80}ms` }}>
            <span className="pillar__ic"><Icon size={22} /></span>
            <strong>{t}</strong>
            <span>{d}</span>
            <ArrowRight size={18} className="pillar__go" />
          </a>
        ))}
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

function Groups() {
  return (
    <section className="sec" id="groups">
      <div className="wrap">
        <SectionHead
          eyebrow="Учёба в группах"
          title="Весь класс в одной группе"
          lead="Общие домашки, проверка по фото, чат и челленджи — видно, кто что сделал и кому нужна помощь."
        />
        <div className="split">
          <div className="split__feats">
            <Feature Icon={KeyRound} title="Учебные группы">
              Группа для класса или курса, куда друзья вступают по коду. Есть владелец и админы.
            </Feature>
            <Feature Icon={BookOpen} title="Общие домашние задания">
              Домашки с предметом и сроком видны всей группе. Каждый отмечает, начал ли, сделал или нужна помощь.
            </Feature>
            <Feature Icon={Camera} title="Проверка по фото">
              К сделанной домашке можно приложить фото, а проверяющие в группе её подтверждают.
            </Feature>
            <Feature Icon={Target} title="Групповые челленджи">
              Общая цель на несколько дней: минуты учёбы или сделанные домашки. Видно общий прогресс и свой вклад,
              а все, кто помог, получают монеты.
            </Feature>
            <Feature Icon={MessageCircle} title="Чат группы">
              Сообщения, фото и реакции. Админы следят за порядком.
            </Feature>
          </div>
          <div className="split__visual reveal">
            <Phone tab="groups" label="Концепт экрана группы с общими домашками">
              <GroupScreen interactive />
            </Phone>
            <p className="tryme"><span>↑</span> Нажми «Начал», «Сделал» или «Помощь» — так статус видит вся группа</p>
          </div>
        </div>

        <div className="duo">
          <div className="reveal">
            <ChallengeCard />
          </div>
          <div className="reveal duo__chat">
            <Phone tab="groups" label="Концепт чата группы" hideTabs>
              <ChatScreen />
            </Phone>
          </div>
        </div>
      </div>
    </section>
  );
}

function Focus() {
  return (
    <section className="sec sec--tint" id="focus">
      <div className="wrap">
        <SectionHead
          eyebrow="Фокус и прогресс"
          title="Честный таймер, который не обмануть"
          lead="Сессии от 5 до 180 минут. Время засчитывается, только пока ты в приложении, — так что результат честный."
        />

        <div className="reveal">
          <FocusDemo />
        </div>

        <div className="split split--rev">
          <div className="split__visual reveal">
            <Phone tab="focus" label="Концепт недельного отчёта">
              <ReportScreen />
            </Phone>
          </div>
          <div className="split__feats">
            <Feature Icon={BookOpen} title="Предметы">
              К сессии можно добавить предмет и видеть, сколько времени ушло на каждый за неделю и месяц.
            </Feature>
            <Feature Icon={BarChart3} title="Недельный отчёт">
              Минуты, дни с занятиями, лучшие предметы и сравнение с прошлой неделей. Итогами можно поделиться.
            </Feature>
            <Feature Icon={CalendarDays} title="Серия дней и календарь">
              Календарь показывает дни с учёбой, а за серии в 3, 7, 14, 30, 60 и 100 дней дают награды.
            </Feature>
            <Feature Icon={DoorOpen} title="Комнаты для учёбы">
              Общий таймер для группы: видно, кто сейчас учится.
            </Feature>
            <Feature Icon={Bell} title="Push-уведомления">
              Напоминания о домашках и новых сообщениях в чате. Каждый вид можно отключить в профиле.
            </Feature>
            <Feature Icon={Snowflake} title="Заморозка серии">
              Если пропустишь день, купленная за монеты заморозка сохранит серию.
            </Feature>
          </div>
        </div>

        <div className="streak reveal">
          <StreakCalendar />
          <div className="streak__side">
            <h3>Награды за серию</h3>
            <p>Занимайся каждый день — и получай монеты за каждую новую отметку. Каждая награда даётся один раз.</p>
            <StreakTrack current={14} />
          </div>
        </div>
      </div>
    </section>
  );
}

function Apartment() {
  return (
    <section className="sec" id="apartment">
      <div className="wrap">
        <SectionHead
          eyebrow="Квартира группы"
          title="Уютная 3D-квартира для вашей группы"
          lead="У каждой группы есть своя квартира: участники появляются в ней в виде зверей-аватаров, и сразу видно, кто учится, отдыхает или просто онлайн."
        />
        <div className="split">
          <div className="split__feats">
            <Feature Icon={Users} title="Кто чем занят">
              Видно, кто сейчас учится, отдыхает или в сети.
            </Feature>
            <Feature Icon={Timer} title="Учебная комната над столом">
              Табличка над столом показывает активную учебную комнату с таймером и названием. Нажми, чтобы присоединиться.
            </Feature>
            <Feature Icon={MessageCircle} title="Сообщения-пузыри">
              Сообщения чата всплывают пузырями над участниками.
            </Feature>
            <Feature Icon={Trophy} title="Очки группы">
              Группа вместе зарабатывает очки и тратит их на новые комнаты и мебель, которую можно расставлять по местам.
            </Feature>
          </div>
          <div className="split__visual reveal">
            <ApartmentScene />
            <p className="tryme">Концепт квартиры группы</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Friends() {
  const [period, setPeriod] = useState('week');
  const [scope, setScope] = useState('groups');
  return (
    <section className="sec" id="friends">
      <div className="wrap">
        <SectionHead
          eyebrow="Друзья"
          title="Соревнуйся с теми, кого знаешь"
          lead="Находи друзей, переписывайся и сравнивай минуты учёбы — с одноклассниками по группам или только с друзьями."
        />
        <div className="split">
          <div className="split__feats">
            <Feature Icon={Search} title="Друзья и @username">
              Найди человека по имени или @username и добавь в друзья.
            </Feature>
            <div className="reveal"><FriendSearch /></div>
            <Feature Icon={Send} title="Личные сообщения">
              Переписка с друзьями, с фото и реакциями.
            </Feature>
            <Feature Icon={Trophy} title="Лидерборд">
              Минуты учёбы за неделю, месяц и год среди участников групп или друзей.
            </Feature>
          </div>
          <div className="split__visual reveal">
            <div className="board-ctl">
              <div className="seg seg--switch" role="tablist" aria-label="Период">
                {[['week', 'Неделя'], ['month', 'Месяц'], ['year', 'Год']].map(([id, l]) => (
                  <button key={id} role="tab" aria-selected={period === id} className={period === id ? 'is-on' : ''} onClick={() => setPeriod(id)}>{l}</button>
                ))}
              </div>
              <div className="seg seg--switch" role="tablist" aria-label="Среди кого">
                {[['groups', 'Группы'], ['friends', 'Друзья']].map(([id, l]) => (
                  <button key={id} role="tab" aria-selected={scope === id} className={scope === id ? 'is-on' : ''} onClick={() => setScope(id)}>{l}</button>
                ))}
              </div>
            </div>
            <Phone tab="friends" label="Концепт лидерборда">
              <LeaderboardScreen period={period} scope={scope} />
            </Phone>
          </div>
        </div>
      </div>
    </section>
  );
}

function Coins() {
  const rows = [
    ['Минута учёбы', '1', 'засчитанное время сессии'],
    ['Серия 3 / 7 / 14 дней', '10 / 25 / 50', 'один раз'],
    ['Серия 30 / 60 / 100 дней', '100 / 150 / 250', 'один раз'],
    ['Групповой челлендж', '20', 'за личный вклад в общую цель'],
  ];
  return (
    <section className="sec sec--tint" id="coins">
      <div className="wrap">
        <SectionHead
          eyebrow="Монеты и профиль"
          title="Study Coins — за учёбу, а не за накрутку"
          lead="Монеты за учёбу и награды. Начисляет их только сервер, поэтому накрутить нельзя."
        />
        <div className="coins">
          <div className="coins__table reveal">
            <table>
              <caption className="sr">Как зарабатываются монеты</caption>
              <thead><tr><th scope="col">За что</th><th scope="col">Монеты</th><th scope="col">Условие</th></tr></thead>
              <tbody>
                {rows.map(([a, b, c]) => (
                  <tr key={a}><th scope="row">{a}</th><td><span className="amt"><Coin size={16} /> {b}</span></td><td>{c}</td></tr>
                ))}
              </tbody>
            </table>
            <div className="coins__feats">
              <Feature Icon={Palette} title="Магазин оформления">
                За монеты можно купить рамки, значки и цвета профиля.
              </Feature>
              <Feature Icon={Smile} title="Аватары">
                Рисованные аватары или 40 эмодзи на выбор.
              </Feature>
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

function Safety() {
  const items = [
    { Icon: Flag, t: 'Жалобы и модерация', d: 'Можно пожаловаться на сообщение или человека, анонимно. Нарушителей блокируют.' },
    { Icon: Gauge, t: 'Защита от спама', d: 'Ограничения на поток сообщений и жалоб, незаметные при обычном общении.' },
    { Icon: Server, t: 'Твои данные — твои', d: 'Никто не может изменить чужие данные или начислить себе награды: важные действия проверяет сервер.' },
    { Icon: Trash2, t: 'Удаление аккаунта', d: 'Аккаунт можно удалить прямо в приложении.' },
    { Icon: Smartphone, t: 'Без регистрации', d: 'Приложение можно попробовать в демо-режиме, без аккаунта.' },
  ];
  return (
    <section className="sec" id="safety">
      <div className="wrap">
        <SectionHead
          eyebrow="Безопасность и приватность"
          title="Спокойное место для учёбы"
          lead="Модерация, защита от спама и серверные проверки — чтобы в группах было комфортно, а награды были честными."
          center
        />
        <div className="safe">
          {items.map(({ Icon, t, d }, i) => (
            <article key={t} className="safe__card reveal" style={{ '--d': `${i * 60}ms` }}>
              <span className="safe__ic"><Icon size={22} /></span>
              <h3>{t}</h3>
              <p>{d}</p>
            </article>
          ))}
          <article className="safe__card safe__card--age reveal" style={{ '--d': '300ms' }}>
            <span className="safe__age">13+</span>
            <h3>Возраст пользователей</h3>
            <p>StudyCrew рассчитан на школьников и студентов от 13 лет.</p>
          </article>
        </div>
      </div>
    </section>
  );
}

function Soon() {
  const items = [
    { Icon: LayoutGrid, t: 'Виджет серии на экране телефона' },
    { Icon: ListChecks, t: 'Планировщик с домашками групп' },
    { Icon: UserCircle, t: 'Своё фото в профиле' },
    { Icon: ImagePlus, t: 'Фото к просьбе о помощи' },
  ];
  return (
    <section className="sec sec--soon" id="soon">
      <div className="wrap">
        <SectionHead eyebrow="Скоро" title="Что мы готовим дальше" center />
        <ul className="soon">
          {items.map(({ Icon, t }, i) => (
            <li key={t} className="reveal" style={{ '--d': `${i * 50}ms` }}>
              <Icon size={20} /><span>{t}</span><em>скоро</em>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Beta() {
  return (
    <section className="beta" id="beta">
      <div className="wrap">
        <div className="beta__card reveal">
          <img src={logoMark} alt="" className="beta__mark" width="140" height="140" />
          <div className="beta__copy">
            <span className="beta__eyebrow">Закрытая бета</span>
            <h2>StudyCrew сейчас в закрытой бете на Android</h2>
            <p>
              Собери свою группу, когда откроется доступ: позови одноклассников, поставьте общую цель
              и учитесь вместе. Возраст пользователей — от 13 лет.
            </p>
            <div className="beta__ctas">
              {BETA_URL ? (
                <a className="btn btn--light btn--lg" href={BETA_URL} target="_blank" rel="noopener noreferrer">
                  Записаться в бету <ArrowRight size={18} />
                </a>
              ) : (
                <span className="beta__soon"><Smartphone size={18} /> Приглашения в бету рассылаются постепенно</span>
              )}
              {CONTACT_EMAIL && (
                <a className="btn btn--outline-light btn--lg" href={`mailto:${CONTACT_EMAIL}`}>Написать нам</a>
              )}
            </div>
            <ul className="beta__facts">
              <li><Check size={16} /> Android</li>
              <li><Check size={16} /> Демо-режим без аккаунта</li>
              <li><Check size={16} /> 13+</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Faq() {
  const qa = [
    ['На каких устройствах работает StudyCrew?', 'Сейчас приложение доступно на Android — в закрытой бете.'],
    ['Можно попробовать без регистрации?', 'Да. В приложении есть демо-режим, в котором можно всё посмотреть без аккаунта.'],
    ['С какого возраста можно пользоваться?', 'StudyCrew рассчитан на пользователей от 13 лет.'],
    ['Как вступить в группу класса?', 'Попроси код у владельца или админа группы и введи его в приложении.'],
    ['Можно ли накрутить минуты или монеты?', 'Нет. Время сессии засчитывается, только пока ты в приложении, а монеты начисляет только сервер. Важные действия проверяются на сервере, поэтому изменить чужие данные или начислить себе награды нельзя.'],
    ['Что будет, если я пропущу день?', 'Серия прервётся — если только у тебя нет заморозки. Её можно купить за монеты, и она сохранит серию за пропущенный день.'],
    ['Как удалить аккаунт?', 'Прямо в приложении, без писем и обращений в поддержку.'],
  ];
  const [open, setOpen] = useState(0);
  return (
    <section className="sec sec--faq" id="faq">
      <div className="wrap wrap--narrow">
        <SectionHead eyebrow="Вопросы" title="Частые вопросы" center />
        <div className="faq">
          {qa.map(([q, a], i) => {
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
  return (
    <footer className="ftr">
      <div className="wrap ftr__in">
        <div className="ftr__brand">
          <Brand />
          <p>Учиться вместе — интереснее.</p>
        </div>
        <nav className="ftr__nav" aria-label="Разделы в подвале">
          {NAV.map(([href, label]) => <a key={href} href={href}>{label}</a>)}
          <a href="/privacy">Конфиденциальность</a>
          <a href="/rules">Правила</a>
          <a href="/delete-account">Удаление аккаунта</a>
          {CONTACT_EMAIL && <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>}
        </nav>
      </div>
      <div className="wrap ftr__fine">
        <span>© {new Date().getFullYear()} StudyCrew</span>
        <span>Изображения интерфейса на сайте — концептуальные и могут отличаться от приложения.</span>
      </div>
    </footer>
  );
}
