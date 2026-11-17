'use client';

import { useEffect, useRef, useState } from 'react';
import { Play, Pause, RotateCcw, Snowflake, Flame, Check, EyeOff, Award, Star, Zap } from 'lucide-react';
import { Coin } from './Phone.jsx';

/* =========================================================
   Демо таймера фокуса: время засчитывается, только пока
   «приложение» открыто (вкладка видима).
   ========================================================= */
const SUBJECTS = ['Алгебра', 'Физика', 'Английский', 'История', 'Химия'];
const DEMO_SECONDS = 15; // любая сессия в демо длится ~15 секунд

export function FocusDemo() {
  const [minutes, setMinutes] = useState(45);
  const [subject, setSubject] = useState('Алгебра');
  const [phase, setPhase] = useState('idle'); // idle | running | paused | away | done
  const [elapsed, setElapsed] = useState(0); // засчитанные минуты (float)
  const phaseRef = useRef(phase);
  phaseRef.current = phase;

  useEffect(() => {
    if (phase !== 'running') return undefined;
    const step = minutes / DEMO_SECONDS / 10; // минут за 100 мс
    const id = setInterval(() => {
      setElapsed((e) => {
        const next = Math.min(minutes, e + step);
        if (next >= minutes) setPhase('done');
        return next;
      });
    }, 100);
    return () => clearInterval(id);
  }, [phase, minutes]);

  useEffect(() => {
    const onVis = () => {
      if (document.hidden && phaseRef.current === 'running') setPhase('away');
    };
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  const reset = () => { setPhase('idle'); setElapsed(0); };
  const counted = Math.floor(elapsed);
  const left = Math.max(0, minutes - elapsed);
  const p = elapsed / minutes;
  const R = 80;
  const C = 2 * Math.PI * R;
  const locked = phase !== 'idle';

  return (
    <div className="demo demo--focus">
      <div className="demo__head">
        <span className="demo__tag">Попробуй</span>
        <span className="demo__note">демо ускорено: сессия идёт ~15 секунд</span>
      </div>

      <div className="fd">
        <div className="fd__ring">
          <svg viewBox="0 0 200 200" aria-hidden="true">
            <circle cx="100" cy="100" r={R} className="ring__bg" />
            <circle
              cx="100" cy="100" r={R}
              className={`ring__fg ${phase === 'away' ? 'is-away' : ''}`}
              strokeDasharray={C} strokeDashoffset={C * (1 - p)}
            />
          </svg>
          <div className="ring__label" aria-live="polite">
            {phase === 'done' ? (
              <><strong className="ok"><Check size={30} /></strong><span>засчитано</span></>
            ) : (
              <><strong>{Math.ceil(left)}</strong><span>мин осталось</span></>
            )}
          </div>
        </div>

        <div className="fd__controls">
          <label className="fd__label" htmlFor="fd-min">
            Длительность <b>{minutes} мин</b>
          </label>
          <input
            id="fd-min" type="range" min="5" max="180" step="5"
            value={minutes} disabled={locked}
            style={{ '--p': `${((minutes - 5) / 175) * 100}%` }}
            onChange={(e) => setMinutes(Number(e.target.value))}
          />
          <div className="fd__scale"><span>5</span><span>180</span></div>

          <p className="fd__label">Предмет</p>
          <div className="chips" role="radiogroup" aria-label="Предмет">
            {SUBJECTS.map((s) => (
              <button
                key={s} type="button" role="radio" aria-checked={subject === s}
                className={`chipbtn ${subject === s ? 'is-on' : ''}`}
                disabled={locked} onClick={() => setSubject(s)}
              >{s}</button>
            ))}
          </div>

          <div className="fd__actions">
            {phase === 'idle' && (
              <button className="btn btn--primary" onClick={() => setPhase('running')}><Play size={16} /> Начать сессию</button>
            )}
            {phase === 'running' && (
              <>
                <button className="btn btn--primary" onClick={() => setPhase('paused')}><Pause size={16} /> Пауза</button>
                <button className="btn btn--ghost" onClick={() => setPhase('away')}><EyeOff size={16} /> Свернуть приложение</button>
              </>
            )}
            {(phase === 'paused' || phase === 'away') && (
              <>
                <button className="btn btn--primary" onClick={() => setPhase('running')}><Play size={16} /> Продолжить</button>
                <button className="btn btn--ghost" onClick={reset}><RotateCcw size={16} /> Сначала</button>
              </>
            )}
            {phase === 'done' && (
              <button className="btn btn--ghost" onClick={reset}><RotateCcw size={16} /> Ещё раз</button>
            )}
          </div>
        </div>
      </div>

      <div className={`fd__status is-${phase}`} aria-live="polite">
        {phase === 'idle' && <>Выбери длительность и предмет, затем начни сессию.</>}
        {phase === 'running' && <>Идёт сессия · {subject}. Засчитано {counted} мин · <Coin size={14} /> +{counted}</>}
        {phase === 'paused' && <>Пауза. Засчитано {counted} мин.</>}
        {phase === 'away' && <><EyeOff size={15} /> Ты вышел из приложения — пока тебя нет, время не засчитывается.</>}
        {phase === 'done' && <>Сессия засчитана: {minutes} мин · {subject} · <Coin size={14} /> +{minutes} монет</>}
      </div>
    </div>
  );
}

/* =========================================================
   Календарь серии
   ========================================================= */
const STUDY = new Set([1, 2, 3, 5, 6, 7, 8, 9, 12, 13, 14, 15, 16, 18, 19, 20, 21, 22, 23, 25, 26, 27, 28, 29, 30, 31]);
const FROZEN = 24;
const STREAK_FROM = 18;

export function StreakCalendar() {
  const offset = 3; // 1 октября 2026 — четверг
  const cells = [...Array(offset).fill(null), ...Array.from({ length: 31 }, (_, i) => i + 1)];
  return (
    <div className="card card--cal">
      <div className="cal__head">
        <strong>Октябрь 2026</strong>
        <span className="pill pill--flame"><Flame size={14} /> серия 14 дней</span>
      </div>
      <div className="cal__grid" role="grid" aria-label="Календарь занятий за октябрь">
        {['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'].map((d) => <span key={d} className="cal__dow">{d}</span>)}
        {cells.map((d, i) => {
          if (!d) return <span key={`e${i}`} />;
          const frozen = d === FROZEN;
          const studied = STUDY.has(d);
          const inStreak = d >= STREAK_FROM;
          return (
            <span
              key={d}
              className={`cal__d ${studied ? 'is-study' : ''} ${frozen ? 'is-frozen' : ''} ${inStreak ? 'is-streak' : ''}`}
              title={frozen ? 'Заморозка серии' : studied ? 'День с учёбой' : 'Без занятий'}
            >
              {frozen ? <Snowflake size={13} /> : d}
            </span>
          );
        })}
      </div>
      <div className="cal__legend">
        <span><i className="lg lg--study" /> день с учёбой</span>
        <span><i className="lg lg--frozen" /> заморозка спасла серию</span>
      </div>
    </div>
  );
}

const MILESTONES = [
  { d: 3, c: 10 }, { d: 7, c: 25 }, { d: 14, c: 50 },
  { d: 30, c: 100 }, { d: 60, c: 150 }, { d: 100, c: 250 },
];

export function StreakTrack({ current = 14 }) {
  return (
    <ol className="track" aria-label="Награды за серию дней">
      {MILESTONES.map((m) => (
        <li key={m.d} className={current >= m.d ? 'is-got' : ''}>
          <span className="track__dot">{current >= m.d ? <Check size={14} /> : <Flame size={14} />}</span>
          <strong>{m.d} {m.d === 3 ? 'дня' : 'дней'}</strong>
          <span className="track__coins"><Coin size={13} /> {m.c}</span>
        </li>
      ))}
    </ol>
  );
}

/* =========================================================
   Студия аватара и магазин оформления
   ========================================================= */
const EMOJI = [
  '🦊', '🐼', '🦉', '🐙', '🐸', '🐨', '🦁', '🐯', '🐻', '🐰',
  '🐱', '🐶', '🐧', '🐢', '🦄', '🐝', '🦋', '🐳', '🐬', '🦖',
  '🌵', '🌻', '🍀', '🍉', '🍕', '🍩', '⚽', '🎧', '🎸', '🎨',
  '📚', '🚀', '🌙', '⭐', '🔥', '⚡', '🌈', '🎯', '🧩', '🪐',
];

const SKIN = ['#F6D2B8', '#E8B48F', '#C98E66', '#8D5A3B'];
const HAIR = ['#2B2B2B', '#7A4A24', '#D9A441', '#B5462F'];

function Drawn({ v }) {
  const skin = SKIN[v % 4];
  const hair = HAIR[(v + 1) % 4];
  const hairPaths = [
    'M28 46c0-18 10-28 22-28s22 10 22 28c-6-8-14-12-22-12s-16 4-22 12z',
    'M26 50c-2-22 10-34 24-34s27 12 24 34c-4-10-8-14-10-14-6 6-22 6-28 0-2 0-6 4-10 14z',
    'M27 48c0-20 11-30 23-30s23 10 23 30l-6-2c-2-8-6-12-17-12s-15 4-17 12z M70 46c4 10 4 24 0 34l-4-2c2-10 2-20 0-30z M30 46c-4 10-4 24 0 34l4-2c-2-10-2-20 0-30z',
    'M30 40c2-14 10-22 20-22s18 8 20 22c-4-4-6-4-8-2-4-6-20-6-24 0-2-2-4-2-8 2z',
    'M24 52c0-24 12-36 26-36s26 12 26 36c-2 6-4 22-6 30l-4-1c1-10 1-20-2-28-6-6-22-6-28 0-3 8-3 18-2 28l-4 1c-2-8-4-24-6-30z',
    'M30 44c0-16 9-26 20-26s20 10 20 26c-3-3-8-5-10-10-4 4-16 6-30 10z',
  ];
  return (
    <svg viewBox="0 0 100 100" className="drawn" aria-hidden="true">
      <path d="M22 100c2-18 14-26 28-26s26 8 28 26z" fill={['#01A9A9', '#F2A93B', '#E9685A', '#5B7FD6', '#7A9E3B', '#9A6AD1'][v]} />
      <circle cx="50" cy="50" r="22" fill={skin} />
      <path d={hairPaths[v]} fill={hair} />
      <circle cx="42" cy="52" r="2.6" fill="#1B2B2B" />
      <circle cx="58" cy="52" r="2.6" fill="#1B2B2B" />
      <path d="M43 60c4 4 10 4 14 0" stroke="#1B2B2B" strokeWidth="2.4" fill="none" strokeLinecap="round" />
    </svg>
  );
}

const FRAMES = [
  { id: 'none', label: 'Без рамки' },
  { id: 'classic', label: 'Классика' },
  { id: 'gold', label: 'Золото' },
  { id: 'rays', label: 'Озарение' },
  { id: 'dash', label: 'Пунктир' },
];
const COLORS = [
  { id: 'teal', label: 'Бирюзовый', v: '#01A9A9' },
  { id: 'ink', label: 'Глубокий', v: '#0B4F52' },
  { id: 'sun', label: 'Солнечный', v: '#F2A93B' },
  { id: 'coral', label: 'Коралловый', v: '#E9685A' },
  { id: 'sky', label: 'Небесный', v: '#5B7FD6' },
  { id: 'plum', label: 'Сливовый', v: '#8E5BC9' },
];
const BADGES = [
  { id: 'streak', label: 'Серия 30', Icon: Flame },
  { id: 'focus', label: 'Фокус-мастер', Icon: Zap },
  { id: 'helper', label: 'Помогает группе', Icon: Award },
  { id: 'star', label: 'Ранняя пташка', Icon: Star },
];

export function AvatarStudio() {
  const [mode, setMode] = useState('emoji');
  const [emoji, setEmoji] = useState('🦊');
  const [drawn, setDrawn] = useState(0);
  const [frame, setFrame] = useState('rays');
  const [color, setColor] = useState('teal');
  const [badges, setBadges] = useState(['streak', 'helper']);
  const col = COLORS.find((c) => c.id === color).v;

  const toggleBadge = (id) =>
    setBadges((b) => (b.includes(id) ? b.filter((x) => x !== id) : b.length >= 3 ? b : [...b, id]));

  return (
    <div className="demo demo--studio">
      <div className="studio__preview" style={{ '--pc': col }}>
        <div className="studio__banner" />
        <div className={`studio__ava frame--${frame}`}>
          <span className="studio__face">{mode === 'emoji' ? emoji : <Drawn v={drawn} />}</span>
        </div>
        <strong className="studio__name">Аня Морозова</strong>
        <span className="studio__user">@anya.m · 10 «Б»</span>
        <div className="studio__badges">
          {badges.length === 0 && <span className="studio__nobadge">значки не выбраны</span>}
          {BADGES.filter((b) => badges.includes(b.id)).map(({ id, label, Icon }) => (
            <span key={id} className="badge"><Icon size={12} /> {label}</span>
          ))}
        </div>
        <div className="studio__stats">
          <div><b>14</b><span>серия</span></div>
          <div><b>2 310</b><span>мин за месяц</span></div>
          <div><b>1 240</b><span>монет</span></div>
        </div>
      </div>

      <div className="studio__opts">
        <div className="seg seg--switch" role="tablist" aria-label="Тип аватара">
          <button role="tab" aria-selected={mode === 'emoji'} className={mode === 'emoji' ? 'is-on' : ''} onClick={() => setMode('emoji')}>40 эмодзи</button>
          <button role="tab" aria-selected={mode === 'drawn'} className={mode === 'drawn' ? 'is-on' : ''} onClick={() => setMode('drawn')}>Рисованные</button>
        </div>

        {mode === 'emoji' ? (
          <div className="emoji-grid" role="radiogroup" aria-label="Эмодзи-аватар">
            {EMOJI.map((e) => (
              <button key={e} role="radio" aria-checked={emoji === e} className={emoji === e ? 'is-on' : ''} onClick={() => setEmoji(e)}>{e}</button>
            ))}
          </div>
        ) : (
          <div className="drawn-grid" role="radiogroup" aria-label="Рисованный аватар">
            {[0, 1, 2, 3, 4, 5].map((v) => (
              <button key={v} role="radio" aria-checked={drawn === v} aria-label={`Аватар ${v + 1}`} className={drawn === v ? 'is-on' : ''} onClick={() => setDrawn(v)}><Drawn v={v} /></button>
            ))}
          </div>
        )}

        <p className="opt__label">Рамка <span className="shop-tag"><Coin size={12} /> магазин</span></p>
        <div className="chips">
          {FRAMES.map((f) => (
            <button key={f.id} className={`chipbtn ${frame === f.id ? 'is-on' : ''}`} aria-pressed={frame === f.id} onClick={() => setFrame(f.id)}>{f.label}</button>
          ))}
        </div>

        <p className="opt__label">Цвет профиля <span className="shop-tag"><Coin size={12} /> магазин</span></p>
        <div className="swatches">
          {COLORS.map((c) => (
            <button key={c.id} aria-label={c.label} aria-pressed={color === c.id} className={color === c.id ? 'is-on' : ''} style={{ background: c.v }} onClick={() => setColor(c.id)} />
          ))}
        </div>

        <p className="opt__label">Значки <span className="opt__hint">до трёх</span> <span className="shop-tag"><Coin size={12} /> магазин</span></p>
        <div className="chips">
          {BADGES.map(({ id, label, Icon }) => (
            <button key={id} className={`chipbtn ${badges.includes(id) ? 'is-on' : ''}`} aria-pressed={badges.includes(id)} onClick={() => toggleBadge(id)}><Icon size={13} /> {label}</button>
          ))}
        </div>
      </div>
    </div>
  );
}
