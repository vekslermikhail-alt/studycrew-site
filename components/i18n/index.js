'use client';

// Язык страницы передаётся через контекст: компоненты берут тексты из useT().
// Файл .js без JSX: собирается и Vite, и Next без настройки.
import { createContext, createElement, useContext } from 'react';
import ru from './ru.js';
import en from './en.js';

export const DICTS = { ru, en };

const LangContext = createContext(ru);

export function LangProvider({ lang, children }) {
  return createElement(LangContext.Provider, { value: DICTS[lang] || ru }, children);
}

export function useT() {
  return useContext(LangContext);
}
