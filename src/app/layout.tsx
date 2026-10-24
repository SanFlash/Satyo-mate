import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AutoLearn QA | Automation Engineering Lab',
  description: 'Learn Selenium and Playwright with interactive demos and complete Page Object Model projects in Python, JavaScript, and TypeScript.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
