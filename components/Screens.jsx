'use client';

import { useEffect, useState } from 'react';
import {
  Flame, Pause, Camera, Check, LifeBuoy, Hourglass, Share2, Send, Smile,
  ShieldCheck, ThumbsUp, Heart, Search, UserPlus, Crown, Target, Timer,
} from 'lucide-react';
import { Coin, Avatar } from './Phone.jsx';
import { useT } from './i18n/index.js';

/* ---------- Таймер фокуса (герой) ---------- */
export function FocusScreen() {
  const { screens: { focus: s } } = useT();
  const total = 45 * 60;
  const [left, setLeft] = useState(24 * 60 + 13);
  useEffect(() => {
    const id = setInterval(() => setLeft((v) => (v <= 1 ? total : v - 1)), 1000);
    return () => clearInterval(id);
  }, [total]);
  const mm = String(Math.floor(left / 60)).padStart(2, '0');
  const ss = String(left % 60).padStart(2, '0');
  const p = 1 - left / total;
  const R = 92;
  const C = 2 * Math.PI * R;

  return (
    <div className="scr scr--focus">
      <div className="scr__top">
        <span className="pill pill--flame"><Flame size={14} /> 14</span>
        <span className="pill pill--coin"><Coin size={14} /> {s.coins}</span>
      </div>
      <p className="scr__kicker">{s.kicker}</p>
      <span className="chip chip--subject">{s.subject}</span>
      <div className="ring">
        <svg viewBox="0 0 220 220" aria-hidden="true">
          <circle cx="110" cy="110" r={R} className="ring__bg" />
          <circle
            cx="110" cy="110" r={R} className="ring__fg"
            strokeDasharray={C} strokeDashoffset={C * (1 - p)}
          />
        </svg>
        <div className="ring__label">
          <strong>{mm}:{ss}</strong>
          <span>{s.of}</span>
        </div>
      </div>
      <button className="scr__btn" tabIndex={-1}><Pause size={16} /> {s.pause}</button>
      <p className="scr__hint">{s.hint}</p>
    </div>
  );
}

/* ---------- Группа: общие домашки ---------- */
// Тона и счётчики — часть вёрстки, тексты домашек — в словаре (screens.group.hw).
const HW = [
  { tone: 'teal', done: 12, started: 5, help: 2 },
  { tone: 'amber', done: 7, started: 9, help: 1 },
  { tone: 'coral', done: 3, started: 6, help: 0 },
];

export function GroupScreen({ interactive = false }) {
  const { screens: { group: g } } = useT();
  const [mine, setMine] = useState('started');
  const statuses = [
    { id: 'started', Icon: Hourglass },
    { id: 'done', Icon: Check },
    { id: 'help', Icon: LifeBuoy },
  ];
  const first = HW[0];
  const firstText = g.hw[0];
  const counts = {
    done: first.done + (mine === 'done' ? 1 : 0),
    started: first.started + (mine === 'started' ? 1 : 0),
    help: first.help + (mine === 'help' ? 1 : 0),
  };

  return (
    <div className="scr scr--group">
      <header className="grp">
        <Avatar tone="ink" size={38}>{g.ava}</Avatar>
        <div>
          <strong>{g.name}</strong>
          <span>{g.meta}</span>
        </div>
      </header>
      <div className="seg seg--tabs" aria-hidden="true">
        <span className="is-on">{g.tabs[0]}</span><span>{g.tabs[1]}</span><span>{g.tabs[2]}</span>
      </div>

      <article className="hw hw--open">
        <div className="hw__row">
          <span className={`chip chip--${first.tone}`}>{firstText.subj}</span>
          <span className="hw__due">{firstText.due}</span>
        </div>
        <p className="hw__title">{firstText.title}</p>
        <div className="hw__stats">
          <span><Check size={12} /> {counts.done} {g.done}</span>
          <span><Hourglass size={12} /> {counts.started} {g.started}</span>
          <span className="is-help"><LifeBuoy size={12} /> {counts.help} {g.help}</span>
        </div>
        <div className="seg seg--status" role={interactive ? 'radiogroup' : undefined} aria-label={g.statusAria}>
          {statuses.map(({ id, Icon }) => (
            <button
              key={id}
              type="button"
              role={interactive ? 'radio' : undefined}
              aria-checked={interactive ? mine === id : undefined}
              tabIndex={interactive ? 0 : -1}
              className={`${mine === id ? 'is-on' : ''} s-${id}`}
              onClick={() => interactive && setMine(id)}
            >
              <Icon size={13} /> {g.statuses[id]}
            </button>
          ))}
        </div>
        {mine === 'done' && (
          <div className="hw__photo">
            <span className="thumb" aria-hidden="true" />
            <div>
              <strong>{g.photoTitle}</strong>
              <span>{g.photoSub}</span>
            </div>
            <Camera size={16} />
          </div>
        )}
        {mine === 'help' && (
          <div className="hw__photo hw__photo--help">
            <LifeBuoy size={16} />
            <div>
              <strong>{g.helpTitle}</strong>
              <span>{g.helpSub}</span>
            </div>
          </div>
        )}
      </article>

      {HW.slice(1).map((h, i) => {
        const text = g.hw[i + 1];
        return (
          <article className="hw" key={text.subj}>
            <div className="hw__row">
              <span className={`chip chip--${h.tone}`}>{text.subj}</span>
              <span className="hw__due">{text.due}</span>
            </div>
            <p className="hw__title">{text.title}</p>
            <div className="hw__bar"><i style={{ width: `${(h.done / 28) * 100}%` }} /></div>
          </article>
        );
      })}
    </div>
  );
}

/* ---------- Чат группы ---------- */
export function ChatScreen() {
  const { screens: { chat: c, group: g } } = useT();
  return (
    <div className="scr scr--chat">
      <header className="grp grp--slim">
        <Avatar tone="ink" size={30}>{g.ava}</Avatar>
        <div><strong>{c.title}</strong><span>{c.online}</span></div>
      </header>
      <p className="sys">{c.sys}</p>
      <div className="msg">
        <Avatar tone="amber" size={26}>🦊</Avatar>
        <div>
          <span className="msg__who">{c.masha} <em><ShieldCheck size={10} /> {c.admin}</em></span>
          <p className="bubble">{c.q}</p>
        </div>
      </div>
      <div className="msg">
        <Avatar tone="teal" size={26}>🐼</Avatar>
        <div>
          <span className="msg__who">{c.timur}</span>
          <div className="bubble bubble--photo"><span className="notebook" /></div>
          <p className="bubble">{c.a}</p>
          <span className="reacts"><b><ThumbsUp size={10} /> 4</b><b>🔥 2</b></span>
        </div>
      </div>
      <div className="msg msg--me">
        <div>
          <p className="bubble bubble--me">{c.me}</p>
          <span className="reacts reacts--me"><b><Heart size={10} /> 3</b></span>
        </div>
      </div>
      <div className="composer" aria-hidden="true">
        <Camera size={16} /><span>{c.composer}</span><Smile size={16} /><i><Send size={14} /></i>
      </div>
    </div>
  );
}

/* ---------- Недельный отчёт ---------- */
const WEEK = [62, 95, 40, 120, 88, 0, 137];
const TOP_MINUTES = [190, 150, 115, 87];

export function ReportScreen() {
  const { screens: { report: r } } = useT();
  const max = Math.max(...WEEK);
  return (
    <div className="scr scr--report">
      <p className="scr__kicker">{r.kicker}</p>
      <p className="scr__sub">{r.range}</p>
      <div className="kpis">
        <div><strong>542</strong><span>{r.minutes}</span></div>
        <div><strong>6/7</strong><span>{r.days}</span></div>
      </div>
      <p className="delta">{r.delta}</p>
      <div className="bars" aria-hidden="true">
        {WEEK.map((v, i) => (
          <div key={i} className="bars__col">
            <i style={{ height: `${Math.max(4, (v / max) * 100)}%` }} className={v === 0 ? 'is-zero' : ''} />
            <span>{r.dayNames[i]}</span>
          </div>
        ))}
      </div>
      <p className="scr__label">{r.topLabel}</p>
      <ul className="top">
        {TOP_MINUTES.map((m, i) => (
          <li key={r.subjects[i]}>
            <span>{r.subjects[i]}</span>
            <i><b style={{ width: `${(m / TOP_MINUTES[0]) * 100}%` }} /></i>
            <em>{m}</em>
          </li>
        ))}
      </ul>
      <button className="scr__btn scr__btn--ghost" tabIndex={-1}><Share2 size={15} /> {r.share}</button>
    </div>
  );
}

/* ---------- Лидерборд ---------- */
// ME — строка пользователя; подпись берётся из словаря (screens.board.me).
const ME = '__me__';
const BOARD = {
  week: [
    ['🦉', '@lena_v', 812], ['🐼', '@timur.study', 760], ['🦊', '@masha_k', 695],
    ['🐙', '@dasha.m', 540], ['⭐', ME, 542], ['🐸', '@artyom', 410], ['🐨', '@nikita', 355],
  ],
  month: [
    ['🐼', '@timur.study', 3120], ['🦉', '@lena_v', 2984], ['⭐', ME, 2310],
    ['🦊', '@masha_k', 2265], ['🐙', '@dasha.m', 1980], ['🐨', '@nikita', 1640], ['🐸', '@artyom', 1502],
  ],
  year: [
    ['🦉', '@lena_v', 21400], ['🦊', '@masha_k', 19850], ['🐼', '@timur.study', 18930],
    ['⭐', ME, 15200], ['🐨', '@nikita', 13110], ['🐙', '@dasha.m', 12740], ['🐸', '@artyom', 9800],
  ],
};
const FRIENDS = [ME, '@lena_v', '@timur.study', '@masha_k', '@artyom'];

export function LeaderboardScreen({ period = 'week', scope = 'groups' }) {
  const { locale, screens: { board: b } } = useT();
  const rows = BOARD[period]
    .filter((r) => scope === 'groups' || FRIENDS.includes(r[1]))
    .sort((x, y) => y[2] - x[2]);
  return (
    <div className="scr scr--board">
      <p className="scr__kicker">{b.kicker}</p>
      <p className="scr__sub">{scope === 'groups' ? b.groups : b.friends}{b.suffix}</p>
      <ol className="board">
        {rows.map(([e, name, m], i) => (
          <li key={name} className={name === ME ? 'is-me' : ''}>
            <span className="board__pos">{i === 0 ? <Crown size={14} /> : i + 1}</span>
            <Avatar tone={name === ME ? 'teal' : 'soft'} size={28}>{e}</Avatar>
            <span className="board__name">{name === ME ? b.me : name}</span>
            <span className="board__min">{m.toLocaleString(locale)}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ---------- Поиск друзей ---------- */
export function FriendSearch() {
  const { screens: { search: s } } = useT();
  return (
    <div className="card card--search">
      <div className="search"><Search size={16} /><span>@tim</span><i className="caret" /></div>
      <ul className="found">
        <li><Avatar tone="teal" size={34}>🐼</Avatar><div><strong>{s.name1}</strong><span>{s.user1}</span></div><b className="add is-sent">{s.sent}</b></li>
        <li><Avatar tone="amber" size={34}>🦁</Avatar><div><strong>{s.name2}</strong><span>@timka</span></div><b className="add"><UserPlus size={13} /> {s.add}</b></li>
      </ul>
    </div>
  );
}

/* ---------- Групповой челлендж ---------- */
export function ChallengeCard() {
  const { screens: { challenge: c } } = useT();
  const goal = 3000;
  const now = 2140;
  return (
    <div className="card card--challenge">
      <div className="ch__head">
        <span className="ch__icon"><Target size={18} /></span>
        <div>
          <strong>{c.title}</strong>
          <span>{c.goal}</span>
        </div>
      </div>
      <div className="ch__bar"><i style={{ width: `${(now / goal) * 100}%` }} /><b style={{ width: `${(310 / goal) * 100}%` }} /></div>
      <div className="ch__nums">
        <span><strong>{c.now}</strong>{c.of}</span>
        <span>{c.left}</span>
      </div>
      <div className="ch__foot">
        <span className="legend"><i className="lg-me" /> {c.mine}</span>
        <span className="pill pill--coin"><Coin size={13} /> {c.reward}</span>
      </div>
    </div>
  );
}

/* ---------- Квартира группы (CSS-макет; заменить скриншотами из приложения) ---------- */
export function ApartmentScene() {
  const { screens: { apt: a } } = useT();
  return (
    <div className="apt" role="img" aria-label={a.aria}>
      <div className="apt__head">
        <span className="pill pill--coin"><Coin size={14} /> {a.points}</span>
      </div>
      <div className="apt__room">
        <div className="apt__sign">
          <Timer size={14} /> <b>{a.sign}</b><em>{a.join}</em>
        </div>
        <div className="apt__table" />
        <div className="apt__who apt__who--a">
          <span className="apt__bubble">{a.bubble}</span>
          <Avatar tone="amber" size={44}>🦊</Avatar><small>{a.studying}</small>
        </div>
        <div className="apt__who apt__who--b">
          <Avatar tone="teal" size={44}>🐼</Avatar><small>{a.studying}</small>
        </div>
        <div className="apt__who apt__who--c">
          <Avatar tone="soft" size={44}>🐰</Avatar><small>{a.resting}</small>
        </div>
        <div className="apt__who apt__who--d">
          <Avatar tone="amber" size={44}>🐱</Avatar><small>{a.online}</small>
        </div>
      </div>
    </div>
  );
}
