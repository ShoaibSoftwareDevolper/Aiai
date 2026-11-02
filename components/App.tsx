'use client';

import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import Image from 'next/image';
import { ArrowRight, ChevronUp, X } from 'lucide-react';
import { useSmoothScroll, setScrollLocked, scrollToProgress, scrollToElement } from '@/hooks/useSmoothScroll';
import { BRAND, DEFINITION, FAQS, LOGO_URL, NAV_LINKS, YOUTUBE_URL } from '@/lib/site';
import BlogsSection from '@/components/BlogsSection';
import Footer from '@/components/Footer';

const DARK = '#1D3045';
const EASE_OUT = 'cubic-bezier(0.16,1,0.3,1)';

/* ---------------- 3 sequential opacity curves with generous wait/hold zones ---------------- */
// Scene 1: Hero (waits from 0 to 0.22, exits cleanly by 0.32)
const s1Opacity = (p: number) => {
  if (p <= 0.22) return 1;
  if (p <= 0.32) return Math.max(0, 1 - (p - 0.22) / 0.10);
  return 0;
};

// Scene 2: Visual Experiments (enters 0.26..0.36, HOLDS/WAITS 0.36..0.64, exits 0.64..0.74)
const s2Opacity = (p: number) => {
  if (p < 0.26) return 0;
  if (p < 0.36) return (p - 0.26) / 0.10;
  if (p <= 0.64) return 1;
  if (p <= 0.74) return Math.max(0, 1 - (p - 0.64) / 0.10);
  return 0;
};

// Scene 3: Official YouTube Channel (enters 0.66..0.76, HOLDS/WAITS 0.76..1.00)
const s3Opacity = (p: number) => {
  if (p < 0.66) return 0;
  if (p < 0.76) return (p - 0.66) / 0.10;
  return 1;
};

/* ---------------- Smooth scroll-linked vertical shifts ---------------- */
const getS1Transform = (p: number) => {
  if (p <= 0.22) return 0;
  return Math.round(-Math.min(1, (p - 0.22) / 0.10) * 30);
};

const getS2Transform = (p: number) => {
  if (p < 0.26) return 30;
  if (p < 0.36) return Math.round(Math.max(0, 1 - (p - 0.26) / 0.10) * 30);
  if (p <= 0.64) return 0;
  return Math.round(-Math.min(1, (p - 0.64) / 0.10) * 30);
};

const getS3Transform = (p: number) => {
  if (p < 0.66) return 30;
  if (p < 0.76) return Math.round(Math.max(0, 1 - (p - 0.66) / 0.10) * 30);
  return 0;
};

/* ---------------- YouTube glyph ---------------- */
export function YouTubeGlyph({ size = 12, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" fill={color}>
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z" />
    </svg>
  );
}

/* ---------------- Stagger element ---------------- */
function Stagger({
  visible,
  delay = 0,
  className = '',
  children,
}: {
  visible: boolean;
  delay?: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: visible
          ? `opacity 0.6s ${EASE_OUT} ${delay}ms, transform 0.6s ${EASE_OUT} ${delay}ms`
          : `opacity 0.15s ease-out, transform 0.15s ease-out`,
      }}
    >
      {children}
    </div>
  );
}

/* ---------------- Navbar ---------------- */
function Navbar({
  isLight,
  currentProgress,
  hide = false,
  onOpenMenu,
}: {
  isLight: boolean;
  currentProgress: number;
  hide?: boolean;
  onOpenMenu: () => void;
}) {
  const [entered, setEntered] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 150);
    return () => clearTimeout(t);
  }, []);

  const color = isLight ? '#ffffff' : DARK;

  const enter = (delay: number): CSSProperties => ({
    opacity: entered ? 1 : 0,
    transform: entered ? 'translateY(0)' : 'translateY(-12px)',
    transition: `opacity 0.6s ${EASE_OUT} ${delay}ms, transform 0.6s ${EASE_OUT} ${delay}ms`,
  });

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 px-6 sm:px-10 md:px-14 py-6 sm:py-7 flex items-center justify-between transition-all duration-500 ${
        hide ? 'opacity-0 -translate-y-12 pointer-events-none' : 'opacity-100 translate-y-0'
      }`}
      style={{ color }}
    >
      <div className="flex items-center gap-6 lg:gap-12">
        {/* Mobile hamburger */}
        <button
          id="nav-hamburger"
          aria-label="Open menu"
          onClick={onOpenMenu}
          className="lg:hidden flex flex-col items-start cursor-pointer"
          style={{ gap: 6, ...enter(100) }}
        >
          {[26, 26, 18].map((w, i) => (
            <span
              key={i}
              className="block transition-colors duration-500"
              style={{ width: w, height: 2.5, backgroundColor: color }}
            />
          ))}
        </button>

        {/* Logo */}
        <button
          onClick={() => scrollToProgress(0)}
          id="nav-logo"
          aria-label={`${BRAND} home`}
          style={enter(60)}
          className="cursor-pointer flex items-center group"
        >
          <Image
            src={LOGO_URL}
            alt="AIAI Official Logo"
            width={1606}
            height={735}
            priority
            className="h-8 sm:h-9 md:h-10 w-auto transition-transform duration-300 group-hover:scale-105"
            style={{ filter: isLight ? 'invert(1)' : 'none' }}
          />
        </button>

        {/* Desktop links */}
        <nav aria-label="Primary" className="flex items-center">
          <ul className="hidden lg:flex items-center gap-8 xl:gap-11">
            {NAV_LINKS.map((l, i) => {
              const active =
                (i === 0 && currentProgress < 0.30) ||
                (i === 1 && currentProgress >= 0.30 && currentProgress < 0.70) ||
                (i === 2 && currentProgress >= 0.70 && currentProgress < 0.98) ||
                (i === 3 && currentProgress >= 0.98);

              return (
                <li key={l.label} style={enter(i * 80 + 100)} className="flex items-center">
                  <button
                    id={`nav-link-${i}`}
                    onClick={() => {
                      if ('sectionId' in l && l.sectionId) {
                        scrollToElement(l.sectionId as string);
                      } else {
                        scrollToProgress(l.targetProgress);
                      }
                    }}
                    className={`relative text-[13px] sm:text-sm tracking-[0.18em] uppercase font-bold hover:opacity-85 transition-all cursor-pointer py-1 flex items-center leading-none ${
                      active ? 'opacity-100 font-extrabold' : 'opacity-80'
                    }`}
                  >
                    <span>{l.label}</span>
                    {active && (
                      <span
                        className="absolute left-0 -bottom-2 w-full rounded-full transition-colors duration-500"
                        style={{ height: 2.5, backgroundColor: color }}
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Right cluster */}
      <div className="flex items-center gap-6 sm:gap-8" style={enter(400)}>
        <a
          id="nav-subscribe"
          href={YOUTUBE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:flex items-center gap-2.5 text-[13px] sm:text-sm tracking-[0.2em] uppercase font-bold hover:opacity-85 transition-opacity leading-none"
        >
          <span>SUBSCRIBE</span>
          <span
            className="inline-flex items-center justify-center rounded-full flex-shrink-0 shadow-sm"
            style={{ width: 24, height: 24, backgroundColor: '#E8352B' }}
          >
            <YouTubeGlyph size={12} color="#ffffff" />
          </span>
        </a>
        <button
          id="nav-menu-button"
          onClick={onOpenMenu}
          className="lg:hidden text-[13px] sm:text-sm tracking-[0.2em] uppercase font-bold hover:opacity-80 transition-opacity cursor-pointer"
        >
          MENU
        </button>
      </div>
    </header>
  );
}

/* ---------------- Mobile menu ---------------- */
function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    setScrollLocked(open);
    return () => {
      document.body.style.overflow = '';
      setScrollLocked(false);
    };
  }, [open]);

  return (
    <div
      id="mobile-menu"
      className={`fixed inset-0 z-[100] transition-all duration-500 ${
        open ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}
      style={{ backgroundColor: DARK, transitionTimingFunction: 'cubic-bezier(0.4,0,0.2,1)' }}
    >
      <div
        className={`flex flex-col h-full transition-transform duration-500 ${
          open ? 'translate-y-0' : '-translate-y-8'
        }`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.4,0,0.2,1)' }}
      >
        <div className="flex justify-end px-6 sm:px-8 pt-8 sm:pt-12">
          <button
            id="mobile-menu-close"
            aria-label="Close menu"
            onClick={onClose}
            className="flex items-center justify-center rounded-full border border-white/30 hover:border-white text-white transition-colors cursor-pointer"
            style={{ width: 40, height: 40 }}
          >
            <X size={18} />
          </button>
        </div>

        <ul className="flex-1 flex flex-col justify-center">
          {NAV_LINKS.map((l, i) => (
            <li
              key={l.label}
              style={{
                opacity: open ? 1 : 0,
                transform: open ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 0.5s cubic-bezier(0.4,0,0.2,1) ${i * 60}ms, transform 0.5s cubic-bezier(0.4,0,0.2,1) ${i * 60}ms`,
              }}
            >
              <button
                id={`mobile-link-${i}`}
                onClick={() => {
                  onClose();
                  if ('sectionId' in l && l.sectionId) {
                    setTimeout(() => scrollToElement(l.sectionId as string), 150);
                  } else {
                    scrollToProgress(l.targetProgress);
                  }
                }}
                className="block w-full text-left px-8 sm:px-12 py-3 text-2xl sm:text-3xl font-light tracking-wide uppercase transition-colors text-white/70 hover:text-white cursor-pointer"
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex gap-8 px-8 sm:px-12 pb-10 text-xs tracking-[0.2em] uppercase text-white/60">
          <a
            href={YOUTUBE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            YOUTUBE
          </a>
          <button
            onClick={() => {
              onClose();
              scrollToProgress(0.88);
            }}
            className="hover:text-white transition-colors cursor-pointer"
          >
            CHANNEL
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Main App Component ---------------- */
export default function App() {
  const { containerRef, progress: p } = useSmoothScroll();
  const [menuOpen, setMenuOpen] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const el = document.getElementById('footer-stack');
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        setFooterVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const o1 = s1Opacity(p);
  const o2 = s2Opacity(p);
  const o3 = s3Opacity(p);
  const y1 = getS1Transform(p);
  const y2 = getS2Transform(p);
  const y3 = getS3Transform(p);
  const isLight = p > 0.28;

  const sectionStyle = (o: number, translateY: number): CSSProperties => ({
    opacity: o,
    visibility: o > 0.005 ? 'visible' : 'hidden',
    pointerEvents: o > 0.5 ? 'auto' : 'none',
    transform: `translate3d(0, ${translateY}px, 0)`,
    willChange: 'opacity, transform',
  });

  return (
    <main>
      <Navbar
        isLight={isLight}
        currentProgress={p}
        hide={footerVisible}
        onOpenMenu={() => setMenuOpen(true)}
      />

      {/* 450vh scroll container driving the smooth continuous reveal */}
      <div id="scroll-track" ref={containerRef} className="relative h-[450vh]">
        <div className="sticky top-0 w-full h-screen overflow-hidden">
          {/* Continuous gradient strip moving with scroll */}
          <div aria-hidden className="absolute inset-0 overflow-hidden">
            <div
              className="gradient-strip"
              style={{ transform: `translate3d(0, ${-p * 66.6667}%, 0)` }}
            />
            <div className="blob blob-a" />
            <div className="blob blob-b" />
            <div className="blob blob-c" />
          </div>

          <div className="absolute inset-0 pointer-events-none">
            {/* ========================================================
                SCENE 1: HERO
                ======================================================== */}
            <section
              aria-label="AIAI Videos Hero"
              className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 sm:px-8 md:px-20 lg:px-32 overflow-hidden pointer-events-none"
              style={sectionStyle(o1, y1)}
            >
              {/* Animated 3D Hero Background Shapes (framing the title) */}
              <div aria-hidden className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
                {/* Shape 1: Top-Left floating knot */}
                <div className="absolute -top-[6vh] -left-[8vw] sm:-left-[4vw] md:-left-[2vw] w-[260px] sm:w-[340px] md:w-[420px] aspect-square animate-hero-1 opacity-80 sm:opacity-95">
                  <Image
                    src="/hero_assets/hero-shape-1.webp"
                    alt=""
                    fill
                    priority
                    sizes="(max-width: 640px) 260px, (max-width: 1024px) 340px, 420px"
                    className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.12)]"
                  />
                </div>

                {/* Shape 2: Top-Right floating shard ring */}
                <div className="absolute top-[2vh] -right-[6vw] sm:-right-[3vw] md:right-[0vw] w-[280px] sm:w-[360px] md:w-[440px] aspect-square animate-hero-2 opacity-75 sm:opacity-90">
                  <Image
                    src="/hero_assets/hero-shape-2.webp"
                    alt=""
                    fill
                    priority
                    sizes="(max-width: 640px) 280px, (max-width: 1024px) 360px, 440px"
                    className="object-contain drop-shadow-[0_25px_45px_rgba(0,0,0,0.14)]"
                  />
                </div>

                {/* Shape 0: Bottom-Left geometric glass loop */}
                <div className="absolute -bottom-[8vh] -left-[6vw] sm:-left-[3vw] md:left-[1vw] w-[270px] sm:w-[350px] md:w-[430px] aspect-square animate-hero-0 opacity-80 sm:opacity-95">
                  <Image
                    src="/hero_assets/hero-shape-0.webp"
                    alt=""
                    fill
                    priority
                    sizes="(max-width: 640px) 270px, (max-width: 1024px) 350px, 430px"
                    className="object-contain drop-shadow-[0_22px_45px_rgba(0,0,0,0.13)]"
                  />
                </div>

                {/* Shape 3: Bottom-Right deep amethyst crystal cluster */}
                <div className="absolute -bottom-[10vh] -right-[8vw] sm:-right-[4vw] md:-right-[2vw] w-[300px] sm:w-[400px] md:w-[480px] aspect-square animate-hero-3 opacity-80 sm:opacity-95">
                  <Image
                    src="/hero_assets/hero-shape-3.webp"
                    alt=""
                    fill
                    priority
                    sizes="(max-width: 640px) 300px, (max-width: 1024px) 400px, 480px"
                    className="object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.15)]"
                  />
                </div>

                {/* Shape 4: Subtle ambient floating center-top accent */}
                <div className="absolute top-[18vh] left-[20vw] sm:left-[24vw] w-[140px] sm:w-[180px] md:w-[220px] aspect-square animate-hero-4 opacity-40 sm:opacity-55">
                  <Image
                    src="/hero_assets/hero-shape-4.webp"
                    alt=""
                    fill
                    priority
                    sizes="(max-width: 640px) 140px, 220px"
                    className="object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.10)]"
                  />
                </div>
              </div>

              {/* Hero text */}
              <div className="relative z-10 max-w-4xl flex flex-col items-center">
                <Stagger visible={o1 > 0.3} delay={0}>
                  <h1
                    className="font-light uppercase leading-[1.2] text-center drop-shadow-sm"
                    style={{ fontSize: 'clamp(2rem,5vw,5rem)', color: DARK }}
                  >
                    AIAI Videos, where imagination meets AI
                  </h1>
                </Stagger>
                <Stagger visible={o1 > 0.3} delay={150}>
                  <p className="mt-6 text-sm tracking-[0.3em] uppercase text-center font-medium" style={{ color: `${DARK}D0` }}>
                    Creative AI videos and surreal digital art
                  </p>
                </Stagger>
              </div>

              <Stagger
                visible={o1 > 0.3}
                delay={300}
                className="absolute bottom-12 right-6 sm:right-8 md:right-12 z-20"
              >
                <button
                  id="scene1-next"
                  aria-label="Next section"
                  onClick={() => scrollToProgress(0.50)}
                  className="pointer-events-auto flex items-center justify-center rounded-full border hover:opacity-75 transition-opacity cursor-pointer bg-white/50 backdrop-blur-sm"
                  style={{ width: 48, height: 48, borderColor: `${DARK}80`, color: DARK }}
                >
                  <ArrowRight size={18} />
                </button>
              </Stagger>
            </section>

            {/* ========================================================
                SCENE 2: VISUAL EXPERIMENTS
                ======================================================== */}
            <section
              aria-label="Visual Experiments"
              className="absolute inset-0 flex items-center justify-start px-6 sm:px-12 md:px-20 lg:px-28 overflow-hidden pointer-events-none"
              style={sectionStyle(o2, y2)}
            >
              {/* Text content on left */}
              <div className="relative z-10 max-w-lg lg:max-w-xl xl:max-w-2xl text-left pointer-events-auto">
                <Stagger visible={o2 > 0.3} delay={0}>
                  <p className="text-white/80 text-sm sm:text-base tracking-[0.3em] uppercase mb-4 font-medium">
                    Visual Experiments
                  </p>
                </Stagger>
                <Stagger visible={o2 > 0.3} delay={120}>
                  <h2
                    className="font-light text-white leading-[1.15] uppercase tracking-wide mb-6 drop-shadow-sm"
                    style={{ fontSize: 'clamp(1.8rem,3.8vw,3.8rem)' }}
                  >
                    Pushing the frontiers
                    <br />
                    of generative cinema.
                  </h2>
                </Stagger>
                <Stagger visible={o2 > 0.3} delay={240}>
                  <p className="text-white/95 text-sm sm:text-base tracking-[0.2em] uppercase max-w-lg leading-relaxed font-light">
                    Original visual stories crafted with human intent and AI synthesis
                  </p>
                </Stagger>
              </div>

              {/* 2nd section right: Big Shape-8 clipped into the right edge, below header */}
              <div className="absolute -right-[140px] sm:-right-[220px] md:-right-[300px] lg:-right-[380px] xl:-right-[460px] top-[14vh] sm:top-[16vh] md:top-[18vh] pointer-events-none z-0">
                <div className="relative w-[420px] sm:w-[620px] md:w-[800px] lg:w-[980px] xl:w-[1150px] aspect-square animate-float-right">
                  <Image
                    src="/shape-8.webp"
                    alt="AIAI Visual Experiments 3D Surreal Digital Art"
                    fill
                    priority
                    sizes="(max-width: 640px) 420px, (max-width: 1024px) 800px, 1150px"
                    className="object-contain drop-shadow-[0_25px_60px_rgba(0,0,0,0.45)] select-none"
                  />
                </div>
              </div>
            </section>

            {/* ========================================================
                SCENE 3: OFFICIAL YOUTUBE CHANNEL
                ======================================================== */}
            <section
              aria-label="Official YouTube Channel"
              className="absolute inset-0 flex items-center justify-end px-6 sm:px-12 md:px-20 lg:px-28 overflow-hidden pointer-events-none"
              style={sectionStyle(o3, y3)}
            >
              {/* 3rd section left: Big Shape-9 clipped into the left edge, below header */}
              <div className="absolute -left-[140px] sm:-left-[220px] md:-left-[300px] lg:-left-[380px] xl:-left-[460px] top-[14vh] sm:top-[16vh] md:top-[18vh] pointer-events-none z-0">
                <div className="relative w-[420px] sm:w-[620px] md:w-[800px] lg:w-[980px] xl:w-[1150px] aspect-square animate-float-left">
                  <Image
                    src="/shape-9.webp"
                    alt="AIAI YouTube Channel 3D Surreal Digital Art"
                    fill
                    priority
                    sizes="(max-width: 640px) 420px, (max-width: 1024px) 800px, 1150px"
                    className="object-contain drop-shadow-[0_25px_60px_rgba(0,0,0,0.45)] select-none"
                  />
                </div>
              </div>

              {/* Text content on right */}
              <div className="relative z-10 max-w-lg lg:max-w-xl xl:max-w-2xl text-left pointer-events-auto mr-0 sm:mr-4 md:mr-8">
                <Stagger visible={o3 > 0.3} delay={0}>
                  <p className="text-white/80 text-sm sm:text-base md:text-lg tracking-wide mb-3 sm:mb-4">
                    AIAI Videos on YouTube
                  </p>
                </Stagger>
                <Stagger visible={o3 > 0.3} delay={120}>
                  <h2
                    className="font-light text-white leading-[1.15] uppercase tracking-wide mb-6 sm:mb-8 drop-shadow-sm"
                    style={{ fontSize: 'clamp(1.8rem,3.8vw,3.8rem)' }}
                  >
                    Imagination first,
                    <br />
                    shaping tomorrow.
                  </h2>
                </Stagger>
                <Stagger visible={o3 > 0.3} delay={240} className="flex items-center gap-4">
                  <a
                    id="scene4-subscribe"
                    href={YOUTUBE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 cursor-pointer"
                  >
                    <span className="text-sm tracking-[0.3em] text-white/95 uppercase font-medium">Subscribe on YouTube</span>
                    <span
                      className="flex items-center justify-center rounded-full bg-white text-gray-800 group-hover:scale-110 transition-transform duration-300 shadow-lg"
                      style={{ width: 40, height: 40 }}
                    >
                      <ArrowRight size={16} />
                    </span>
                  </a>
                </Stagger>
              </div>

              <div className="absolute bottom-16 right-6 sm:right-8 md:right-12 flex flex-col items-center z-20">
                <Stagger visible={o3 > 0.3} delay={360}>
                  <button
                    id="scene4-up"
                    aria-label="Return to top"
                    onClick={() => scrollToProgress(0)}
                    className="pointer-events-auto flex items-center justify-center rounded-full border hover:opacity-75 transition-opacity cursor-pointer bg-black/20 backdrop-blur-sm"
                    style={{ width: 40, height: 40, borderColor: 'rgba(255,255,255,0.4)', color: 'rgba(255,255,255,0.95)' }}
                  >
                    <ChevronUp size={16} />
                  </button>
                </Stagger>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* ========================================================
          AFTER 3RD SECTION: PARALLEL SCROLL BLOGS & DISPATCHES
          ======================================================== */}
      <BlogsSection />

      {/* ========================================================
          PARALLAX STACK OPENING FOOTER
          ======================================================== */}
      <Footer />

      {/* Screen-reader and search engine entity indexation block (clean for AEO and GEO) */}
      <section className="sr-only" aria-label="AIAI Videos Channel Knowledge">
        <h2>About AIAI Videos</h2>
        <p>{DEFINITION}</p>
        <h2>Frequently Asked Questions</h2>
        {FAQS.map((faq) => (
          <div key={faq.q}>
            <h3>{faq.q}</h3>
            <p>{faq.a}</p>
          </div>
        ))}
      </section>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </main>
  );
}
