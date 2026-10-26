'use client';

import { useEffect, useState } from 'react';

const INTRO_SESSION_KEY = 'qa-nexus-intro-shown-v1';

export default function BrandIntro({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(false);
  const [showCreator, setShowCreator] = useState(false);

  useEffect(() => {
    // Show the branded intro once per browser tab session, never on route changes.
    try {
      if (window.sessionStorage.getItem(INTRO_SESSION_KEY) === '1') return;
      window.sessionStorage.setItem(INTRO_SESSION_KEY, '1');
    } catch {
      // Storage may be disabled; still allow the intro for this mount.
    }

    setVisible(true);
    const creatorTimer = window.setTimeout(() => setShowCreator(true), 900);
    const finishTimer = window.setTimeout(() => setVisible(false), 1750);
    return () => {
      window.clearTimeout(creatorTimer);
      window.clearTimeout(finishTimer);
    };
  }, []);

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
