import type { Metadata } from 'next';
import LandingPage from '../../components/LandingPage.jsx';
import { homeMetadata } from '../site';

export const metadata: Metadata = homeMetadata('en');

export default function Home() {
  return <LandingPage lang="en" />;
}
