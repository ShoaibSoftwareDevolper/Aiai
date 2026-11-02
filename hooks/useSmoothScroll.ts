'use client';

import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';

const clamp = (min: number, max: number, v: number) => Math.min(max, Math.max(min, v));

let lenisInstance: Lenis | null = null;

/** Pause/resume smooth scrolling (e.g. while mobile menu overlay is open). */
export function setScrollLocked(locked: boolean) {
  if (locked) lenisInstance?.stop();
  else lenisInstance?.start();
}

/** Smoothly scroll to a normalized progress value (0..1) */
export function scrollToProgress(p: number) {
  const el = document.getElementById('scroll-track');
  if (!el) return;
  const span = Math.max(1, el.offsetHeight - window.innerHeight);
  const targetY = span * clamp(0, 1, p);
  if (lenisInstance) {
    lenisInstance.scrollTo(targetY, { duration: 1.1 });
  } else {
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  }
}

/** Smoothly scroll to an element by its ID using Lenis or native smooth scroll */
export function scrollToElement(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenisInstance) {
    lenisInstance.scrollTo(el, { duration: 1.2, offset: 0 });
  } else {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}

/**
 * Lenis smooth scroll tracking normalized progress (0..1) across #scroll-track.
 */
export function useSmoothScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let span = 1;
    let last = -1;

    const recomputeSpan = () => {
      const el = containerRef.current;
      if (el) span = Math.max(1, el.offsetHeight - window.innerHeight);
    };

    const update = (y: number) => {
      const p = Math.round(clamp(0, 1, y / span) * 1000) / 1000;
      if (p !== last) {
        last = p;
        setProgress(p);
      }
    };

    recomputeSpan();
    update(window.scrollY);

    const lenis = reduce
      ? null
      : new Lenis({
          autoRaf: true,
          lerp: 0.08,
          wheelMultiplier: 0.95,
          smoothWheel: true,
          syncTouch: false,
        });
    lenisInstance = lenis;

    const onNativeScroll = () => update(window.scrollY);
    if (lenis) lenis.on('scroll', (l: Lenis) => update(l.scroll));
    else window.addEventListener('scroll', onNativeScroll, { passive: true });

    const onResize = () => {
      recomputeSpan();
      lenis?.resize();
      update(window.scrollY);
    };
    window.addEventListener('resize', onResize);
    window.addEventListener('orientationchange', onResize);

    return () => {
      lenis?.destroy();
      lenisInstance = null;
      window.removeEventListener('scroll', onNativeScroll);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', onResize);
    };
  }, []);

  return { containerRef, progress };
}
