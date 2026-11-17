// Корневая раскладка русской версии: главная (/) и юридические страницы.
import type { Metadata } from 'next';
import '../base.css';
import { baseMetadata } from '../site';

export { viewport } from '../site';

export const metadata: Metadata = baseMetadata('ru');

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
