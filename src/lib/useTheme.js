import { useSyncExternalStore } from 'react';
import { readJSON, writeJSON } from './storage';

const KEY = 'studypiece.theme';
const BAR_COLOR = { light: '#fbfcff', dark: '#0e0f13' };

function initialTheme() {
  const saved = readJSON(KEY);
  if (saved === 'light' || saved === 'dark') return saved;
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// One shared theme for the whole app, so every toggle stays in sync.
let current = initialTheme();
const listeners = new Set();

function apply(theme) {
  document.documentElement.dataset.theme = theme;
  // Phone browser chrome / installed-app status bar follows the theme.
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', BAR_COLOR[theme]);
}
apply(current);

function setTheme(theme) {
  if (theme === current) return;
  current = theme;
  writeJSON(KEY, theme);
  apply(theme);
  listeners.forEach((fn) => fn());
}

const subscribe = (fn) => {
  listeners.add(fn);
  return () => listeners.delete(fn);
};

export default function useTheme() {
  const theme = useSyncExternalStore(subscribe, () => current);
  return [theme, () => setTheme(theme === 'dark' ? 'light' : 'dark'), setTheme];
}
