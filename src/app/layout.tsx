import type { Metadata } from 'next';
import './globals.css';
import BrandIntro from '@/components/brand-intro';

export const metadata: Metadata = {
  title: 'QA Nexus | Learn · Practice · Build · Automate',
  description: 'QA Nexus by Satyendra Kumar Namdeo — learn, practice, build, and automate with interactive Playwright and Selenium lessons, test design, and Page Object Model tools.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><BrandIntro>{children}</BrandIntro></body></html>;
}
