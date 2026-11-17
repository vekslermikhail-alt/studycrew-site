// Корневая раскладка английской версии (/en): свой <html lang="en"> и метаданные.
import type { Metadata } from 'next';
import '../base.css';
import { baseMetadata } from '../site';

export { viewport } from '../site';

export const metadata: Metadata = baseMetadata('en');

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
