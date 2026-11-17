import type { Metadata } from 'next';
import LandingPage from '../../components/LandingPage.jsx';
import { homeMetadata } from '../site';

export const metadata: Metadata = homeMetadata('ru');

export default function Home() {
  return <LandingPage lang="ru" />;
}
