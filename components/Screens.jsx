'use client';

import { useEffect, useState } from 'react';
import {
  Flame, Pause, Camera, Check, LifeBuoy, Hourglass, Share2, Send, Smile,
  ShieldCheck, ThumbsUp, Heart, Search, UserPlus, Crown, Target, Timer,
} from 'lucide-react';
import { Coin, Avatar } from './Phone.jsx';

/* ---------- Таймер фокуса (герой) ---------- */
export function FocusScreen() {
  const total = 45 * 60;
  const [left, setLeft] = useState(24 * 60 + 13);
  useEffect(() => {
    const id = setInterval(() => setLeft((s) => (s <= 1 ? total : s - 1)), 1000);
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
        <span className="pill pill--coin"><Coin size={14} /> 1 240</span>
      </div>
      <p className="scr__kicker">Сессия фокуса</p>
      <span className="chip chip--subject">Алгебра</span>
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
          <span>из 45 мин</span>
        </div>
      </div>
      <button className="scr__btn" tabIndex={-1}><Pause size={16} /> Пауза</button>
      <p className="scr__hint">Время идёт, только пока ты в приложении</p>
    </div>
  );
}

/* ---------- Группа: общие домашки ---------- */
const HW = [
  { subj: 'Алгебра', tone: 'teal', title: '№ 214–218, стр. 96', due: 'до чт', done: 12, started: 5, help: 2 },
  { subj: 'Физика', tone: 'amber', title: 'Лабораторная № 4 — отчёт', due: 'до пт', done: 7, started: 9, help: 1 },
  { subj: 'Литература', tone: 'coral', title: 'Сочинение по «Капитанской дочке»', due: 'до пн', done: 3, started: 6, help: 0 },
];

export function GroupScreen({ interactive = false }) {
  const [mine, setMine] = useState('started');
  const statuses = [
    { id: 'started', label: 'Начал', Icon: Hourglass },
    { id: 'done', label: 'Сделал', Icon: Check },
    { id: 'help', label: 'Помощь', Icon: LifeBuoy },
  ];
  const first = HW[0];
  const counts = {
    done: first.done + (mine === 'done' ? 1 : 0),
    started: first.started + (mine === 'started' ? 1 : 0),
    help: first.help + (mine === 'help' ? 1 : 0),
  };

  return (
    <div className="scr scr--group">
      <header className="grp">
        <Avatar tone="ink" size={38}>10Б</Avatar>
        <div>
          <strong>10 «Б» класс</strong>
          <span>28 участников · код K7Q2M</span>
        </div>
      </header>
      <div className="seg seg--tabs" aria-hidden="true">
        <span className="is-on">Домашки</span><span>Чат</span><span>Челлендж</span>
      </div>

      <article className="hw hw--open">
        <div className="hw__row">
          <span className={`chip chip--${first.tone}`}>{first.subj}</span>
          <span className="hw__due">{first.due}</span>
        </div>
        <p className="hw__title">{first.title}</p>
        <div className="hw__stats">
          <span><Check size={12} /> {counts.done} сделали</span>
          <span><Hourglass size={12} /> {counts.started} в процессе</span>
          <span className="is-help"><LifeBuoy size={12} /> {counts.help} просят помощь</span>
        </div>
        <div className="seg seg--status" role={interactive ? 'radiogroup' : undefined} aria-label="Мой статус">
          {statuses.map(({ id, label, Icon }) => (
            <button
              key={id}
              type="button"
              role={interactive ? 'radio' : undefined}
              aria-checked={interactive ? mine === id : undefined}
              tabIndex={interactive ? 0 : -1}
              className={`${mine === id ? 'is-on' : ''} s-${id}`}
              onClick={() => interactive && setMine(id)}
            >
              <Icon size={13} /> {label}
            </button>
          ))}
        </div>
        {mine === 'done' && (
          <div className="hw__photo">
            <span className="thumb" aria-hidden="true" />
            <div>
              <strong>Фото на проверке</strong>
              <span>1 из 2 подтверждений</span>
            </div>
            <Camera size={16} />
          </div>
        )}
        {mine === 'help' && (
          <div className="hw__photo hw__photo--help">
            <LifeBuoy size={16} />
            <div>
              <strong>Группа видит, что нужна помощь</strong>
              <span>Напиши в чат, на каком номере застрял</span>
            </div>
          </div>
        )}
      </article>

      {HW.slice(1).map((h) => (
        <article className="hw" key={h.subj}>
          <div className="hw__row">
            <span className={`chip chip--${h.tone}`}>{h.subj}</span>
            <span className="hw__due">{h.due}</span>
          </div>
          <p className="hw__title">{h.title}</p>
          <div className="hw__bar"><i style={{ width: `${(h.done / 28) * 100}%` }} /></div>
        </article>
      ))}
    </div>
  );
}

/* ---------- Чат группы ---------- */
export function ChatScreen() {
  return (
    <div className="scr scr--chat">
      <header className="grp grp--slim">
        <Avatar tone="ink" size={30}>10Б</Avatar>
        <div><strong>10 «Б» · чат</strong><span>12 в сети</span></div>
      </header>
      <p className="sys">Лена вступила по коду группы</p>
      <div className="msg">
        <Avatar tone="amber" size={26}>🦊</Avatar>
        <div>
          <span className="msg__who">Маша <em><ShieldCheck size={10} /> админ</em></span>
          <p className="bubble">Кто решил 216? У меня ответ не сходится с учебником</p>
        </div>
      </div>
      <div className="msg">
        <Avatar tone="teal" size={26}>🐼</Avatar>
        <div>
          <span className="msg__who">Тимур</span>
          <div className="bubble bubble--photo"><span className="notebook" /></div>
          <p className="bubble">Вот ход решения, смотри знак во второй строке</p>
          <span className="reacts"><b><ThumbsUp size={10} /> 4</b><b>🔥 2</b></span>
        </div>
      </div>
      <div className="msg msg--me">
        <div>
          <p className="bubble bubble--me">Точно! Спасибо, нашла ошибку 🙈</p>
          <span className="reacts reacts--me"><b><Heart size={10} /> 3</b></span>
        </div>
      </div>
      <div className="composer" aria-hidden="true">
        <Camera size={16} /><span>Сообщение…</span><Smile size={16} /><i><Send size={14} /></i>
      </div>
    </div>
  );
}

/* ---------- Недельный отчёт ---------- */
const WEEK = [62, 95, 40, 120, 88, 0, 137];
const DAYS = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];
const TOP = [
  { s: 'Алгебра', m: 190 },
  { s: 'Физика', m: 150 },
  { s: 'Английский', m: 115 },
  { s: 'История', m: 87 },
];

export function ReportScreen() {
  const max = Math.max(...WEEK);
  return (
    <div className="scr scr--report">
      <p className="scr__kicker">Отчёт за неделю</p>
      <p className="scr__sub">26 октября — 1 ноября</p>
      <div className="kpis">
        <div><strong>542</strong><span>минуты</span></div>
        <div><strong>6/7</strong><span>дней с учёбой</span></div>
      </div>
      <p className="delta">▲ на 18% больше, чем на прошлой неделе</p>
      <div className="bars" aria-hidden="true">
        {WEEK.map((v, i) => (
          <div key={i} className="bars__col">
            <i style={{ height: `${Math.max(4, (v / max) * 100)}%` }} className={v === 0 ? 'is-zero' : ''} />
            <span>{DAYS[i]}</span>
          </div>
        ))}
      </div>
      <p className="scr__label">Лучшие предметы</p>
      <ul className="top">
        {TOP.map((t) => (
          <li key={t.s}>
            <span>{t.s}</span>
            <i><b style={{ width: `${(t.m / TOP[0].m) * 100}%` }} /></i>
            <em>{t.m}</em>
          </li>
        ))}
      </ul>
      <button className="scr__btn scr__btn--ghost" tabIndex={-1}><Share2 size={15} /> Поделиться итогами</button>
    </div>
  );
}

/* ---------- Лидерборд ---------- */
const BOARD = {
  week: [
    ['🦉', '@lena_v', 812], ['🐼', '@timur.study', 760], ['🦊', '@masha_k', 695],
    ['🐙', '@dasha.m', 540], ['⭐', 'Ты', 542], ['🐸', '@artyom', 410], ['🐨', '@nikita', 355],
  ],
  month: [
    ['🐼', '@timur.study', 3120], ['🦉', '@lena_v', 2984], ['⭐', 'Ты', 2310],
    ['🦊', '@masha_k', 2265], ['🐙', '@dasha.m', 1980], ['🐨', '@nikita', 1640], ['🐸', '@artyom', 1502],
  ],
  year: [
    ['🦉', '@lena_v', 21400], ['🦊', '@masha_k', 19850], ['🐼', '@timur.study', 18930],
    ['⭐', 'Ты', 15200], ['🐨', '@nikita', 13110], ['🐙', '@dasha.m', 12740], ['🐸', '@artyom', 9800],
  ],
};

export function LeaderboardScreen({ period = 'week', scope = 'groups' }) {
  const FRIENDS = ['Ты', '@lena_v', '@timur.study', '@masha_k', '@artyom'];
  const rows = BOARD[period]
    .filter((r) => scope === 'groups' || FRIENDS.includes(r[1]))
    .sort((a, b) => b[2] - a[2]);
  return (
    <div className="scr scr--board">
      <p className="scr__kicker">Лидерборд</p>
      <p className="scr__sub">{scope === 'groups' ? 'Участники моих групп' : 'Мои друзья'} · минуты учёбы</p>
      <ol className="board">
        {rows.map(([e, name, m], i) => (
          <li key={name} className={name === 'Ты' ? 'is-me' : ''}>
            <span className="board__pos">{i === 0 ? <Crown size={14} /> : i + 1}</span>
            <Avatar tone={name === 'Ты' ? 'teal' : 'soft'} size={28}>{e}</Avatar>
            <span className="board__name">{name}</span>
            <span className="board__min">{m.toLocaleString('ru-RU')}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ---------- Поиск друзей ---------- */
export function FriendSearch() {
  return (
    <div className="card card--search">
      <div className="search"><Search size={16} /><span>@tim</span><i className="caret" /></div>
      <ul className="found">
        <li><Avatar tone="teal" size={34}>🐼</Avatar><div><strong>Тимур Алиев</strong><span>@timur.study · 10 «Б»</span></div><b className="add is-sent">Заявка отправлена</b></li>
        <li><Avatar tone="amber" size={34}>🦁</Avatar><div><strong>Тимофей К.</strong><span>@timka</span></div><b className="add"><UserPlus size={13} /> Добавить</b></li>
      </ul>
    </div>
  );
}

/* ---------- Групповой челлендж ---------- */
export function ChallengeCard() {
  const goal = 3000;
  const now = 2140;
  return (
    <div className="card card--challenge">
      <div className="ch__head">
        <span className="ch__icon"><Target size={18} /></span>
        <div>
          <strong>Марафон перед контрольной</strong>
          <span>Цель группы: 3 000 минут за 5 дней</span>
        </div>
      </div>
      <div className="ch__bar"><i style={{ width: `${(now / goal) * 100}%` }} /><b style={{ width: `${(310 / goal) * 100}%` }} /></div>
      <div className="ch__nums">
        <span><strong>2 140</strong> / 3 000 мин</span>
        <span>осталось 2 дня</span>
      </div>
      <div className="ch__foot">
        <span className="legend"><i className="lg-me" /> Твой вклад: 310 мин</span>
        <span className="pill pill--coin"><Coin size={13} /> +20 каждому</span>
      </div>
    </div>
  );
}

/* ---------- Квартира группы (CSS-макет; заменить скриншотами из приложения) ---------- */
export function ApartmentScene() {
  return (
    <div className="apt" role="img" aria-label="Квартира группы с аватарами-зверями">
      <div className="apt__head">
        <span className="pill pill--coin"><Coin size={14} /> Очки группы</span>
      </div>
      <div className="apt__room">
        <div className="apt__sign">
          <Timer size={14} /> <b>Алгебра · 17:42</b><em>Войти</em>
        </div>
        <div className="apt__table" />
        <div className="apt__who apt__who--a">
          <span className="apt__bubble">Кто сделал №5?</span>
          <Avatar tone="amber" size={44}>🦊</Avatar><small>учится</small>
        </div>
        <div className="apt__who apt__who--b">
          <Avatar tone="teal" size={44}>🐼</Avatar><small>учится</small>
        </div>
        <div className="apt__who apt__who--c">
          <Avatar tone="soft" size={44}>🐰</Avatar><small>отдыхает</small>
        </div>
        <div className="apt__who apt__who--d">
          <Avatar tone="amber" size={44}>🐱</Avatar><small>онлайн</small>
        </div>
      </div>
    </div>
  );
}
