'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function BrandIntro({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(true);
  const [showCreator, setShowCreator] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const creatorTimer = window.setTimeout(() => setShowCreator(true), 1750);
    const finishTimer = window.setTimeout(() => {
      setVisible(false);
      if (pathname !== '/') router.replace('/');
    }, 3450);
    return () => { window.clearTimeout(creatorTimer); window.clearTimeout(finishTimer); };
  }, [pathname, router]);

  return <>
    {children}
    {visible && <div className={`brand-intro ${showCreator ? 'brand-intro--creator' : ''}`} role="status" aria-live="polite" aria-label="QA Nexus loading">
      <div className="brand-intro__content">
        <img className="brand-intro__logo" src="/qa-nexus-logo.svg" alt="QA Nexus logo" />
        <div className="brand-intro__wordmark">QA <span>NEXUS</span></div>
        <div className="brand-intro__tagline">LEARN · PRACTICE · BUILD · AUTOMATE</div>
        <div className="brand-intro__creator" aria-hidden={!showCreator}>
          <span>CREATED BY</span>
          <strong>Satyendra Kumar Namdeo</strong>
        </div>
        <div className="brand-intro__progress"><i /></div>
      </div>
    </div>}
  </>;
}
