'use client';

import { Users, Timer, MessageCircle, User } from 'lucide-react';
import { useT } from './i18n/index.js';

/** Рамка телефона для концептуальных мокапов интерфейса. */
export function Phone({ children, tab = 'groups', className = '', label, hideTabs = false }) {
  return (
    <figure className={`phone ${className}`} aria-label={label}>
      <div className="phone__screen">
        <StatusBar />
        <div className="phone__body">{children}</div>
        {!hideTabs && <TabBar active={tab} />}
      </div>
    </figure>
  );
}

function StatusBar() {
  return (
    <div className="phone__status" aria-hidden="true">
      <span>9:41</span>
      <span className="phone__notch" />
      <span className="phone__sys">
        <i className="sig"><b /><b /><b /><b /></i>
        <i className="bat" />
      </span>
    </div>
  );
}

const TABS = [
  { id: 'groups', Icon: Users },
  { id: 'focus', Icon: Timer },
  { id: 'friends', Icon: MessageCircle },
  { id: 'profile', Icon: User },
];

function TabBar({ active }) {
  const { phone } = useT();
  return (
    <nav className="phone__tabs" aria-hidden="true">
      {TABS.map(({ id, Icon }) => (
        <span key={id} className={id === active ? 'is-active' : ''}>
          <Icon size={18} strokeWidth={2.2} />
          {phone.tabs[id]}
        </span>
      ))}
    </nav>
  );
}

/** Монета Study Coin. */
export function Coin({ size = 18 }) {
  return (
    <span className="coin" style={{ width: size, height: size, fontSize: size * 0.55 }} aria-hidden="true">
      S
    </span>
  );
}

/** Круглый аватар-эмодзи или инициалы. */
export function Avatar({ children, tone = 'teal', size = 32, ring }) {
  return (
    <span
      className={`ava ava--${tone} ${ring ? 'ava--ring' : ''}`}
      style={{ width: size, height: size, fontSize: size * 0.5 }}
      aria-hidden="true"
    >
      {children}
    </span>
  );
}
