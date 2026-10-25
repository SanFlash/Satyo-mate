import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AutoLearn QA | Automation Engineering Lab',
  description: 'Learn Playwright and Selenium with interactive demos, a composable Page Object Model builder, and a test design studio for coverage planning and automation scaffolds.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
