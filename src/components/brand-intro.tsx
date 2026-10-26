'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function BrandIntro({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(true);
  const [showCreator, setShowCreator] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const creatorTimer = window.setTimeout(() => setShowCreator(true), 4200);
    const finishTimer = window.setTimeout(() => {
      setVisible(false);
      if (pathname !== '/') router.replace('/');
    }, 6200);
    return () => { window.clearTimeout(creatorTimer); window.clearTimeout(finishTimer); };
  }, [pathname, router]);

  return <>
    {children}
    {visible && <div className={`brand-intro ${showCreator ? 'brand-intro--creator' : ''}`} role="status" aria-live="polite" aria-label="QA Nexus loading">
      <div className="brand-intro__stars" aria-hidden="true" />
      <div className="brand-intro__content">
        <div className="brand-intro__stage" aria-hidden="true">
          <div className="brand-intro__energy-ring brand-intro__energy-ring--one" />
          <div className="brand-intro__energy-ring brand-intro__energy-ring--two" />
          <svg className="brand-intro__q-build" viewBox="0 0 360 300" fill="none">
            <defs>
              <linearGradient id="q-stroke" x1="54" y1="26" x2="300" y2="270" gradientUnits="userSpaceOnUse"><stop stopColor="#32F5FF"/><stop offset=".52" stopColor="#467CFF"/><stop offset="1" stopColor="#D36CFF"/></linearGradient>
              <linearGradient id="q-tail" x1="224" y1="220" x2="325" y2="281" gradientUnits="userSpaceOnUse"><stop stopColor="#2EF4FF"/><stop offset="1" stopColor="#8C69FF"/></linearGradient>
              <filter id="q-glow"><feGaussianBlur stdDeviation="7" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
            </defs>
            <circle className="brand-intro__q-trace" cx="166" cy="137" r="99" stroke="url(#q-stroke)" strokeWidth="24" filter="url(#q-glow)"/>
            <path className="brand-intro__q-tail" d="M224 212C251 250 282 269 319 252C310 286 277 297 247 283C222 271 208 252 194 234" stroke="url(#q-tail)" strokeWidth="24" strokeLinecap="round" strokeLinejoin="round"/>
            <path className="brand-intro__q-check" d="M112 139L151 178L222 101" stroke="#6BFFB3" strokeWidth="17" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <div className="brand-intro__robot">
            <svg viewBox="0 0 150 160" fill="none">
              <defs><linearGradient id="bot-shell" x1="18" y1="8" x2="125" y2="145" gradientUnits="userSpaceOnUse"><stop stopColor="#FFFFFF"/><stop offset="1" stopColor="#78DFFF"/></linearGradient></defs>
              <path d="M75 12V1" stroke="#53E9FF" strokeWidth="6" strokeLinecap="round"/><circle cx="75" cy="7" r="6" fill="#B2FBFF"/>
              <rect x="14" y="26" width="122" height="105" rx="37" fill="url(#bot-shell)" stroke="#4ADFFF" strokeWidth="4"/>
              <rect x="28" y="43" width="94" height="64" rx="25" fill="#07142F" stroke="#92EFFF" strokeWidth="3"/>
              <path d="M47 70Q55 57 63 70M87 70Q95 57 103 70" stroke="#21EFFF" strokeWidth="8" strokeLinecap="round"/>
              <path d="M57 88Q75 102 93 88" stroke="#6DFFCA" strokeWidth="4" strokeLinecap="round"/>
              <rect x="2" y="61" width="17" height="39" rx="8" fill="#438CFF" stroke="#8BEFFF" strokeWidth="3"/>
              <rect x="131" y="61" width="17" height="39" rx="8" fill="#438CFF" stroke="#8BEFFF" strokeWidth="3"/>
              <path d="M37 127L28 147M113 127L122 147" stroke="#62DFFF" strokeWidth="9" strokeLinecap="round"/>
            </svg>
          </div>
          <div className="brand-intro__terminal">
            <div className="brand-intro__terminal-top"><i/><i/><i/><span>qanexus — automation</span></div>
            <div className="brand-intro__terminal-line"><b>›</b> initializing QA workspace</div>
            <div className="brand-intro__terminal-line brand-intro__terminal-line--two"><b>›</b> playwright <span>✓ ready</span></div>
            <div className="brand-intro__terminal-cursor" />
          </div>
          <div className="brand-intro__spark brand-intro__spark--a" />
          <div className="brand-intro__spark brand-intro__spark--b" />
          <div className="brand-intro__spark brand-intro__spark--c" />
        </div>
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
