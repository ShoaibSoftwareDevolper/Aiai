'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { YOUTUBE_URL } from '@/lib/site';
import { scrollToProgress } from '@/hooks/useSmoothScroll';

export default function Footer() {
  return (
    <div
      id="footer-stack"
      className="relative w-full h-screen min-h-[680px] max-h-[900px] z-10"
      style={{ clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)' }}
    >
      <footer
        className="fixed bottom-0 left-0 right-0 w-full h-screen min-h-[680px] max-h-[900px] flex flex-col justify-between px-6 sm:px-10 md:px-14 lg:px-16 pt-16 sm:pt-20 md:pt-24 pb-0 overflow-hidden select-none"
        style={{
          background: 'linear-gradient(180deg, #ede7f2 0%, #e2d1eb 35%, #d1afd9 70%, #be8ec6 100%)',
        }}
      >
        {/* Top Header Links (Turion Style multi-column + social links) */}
        <div className="relative z-20 flex flex-col lg:flex-row lg:items-start justify-between gap-8 lg:gap-12">
          {/* Main 3 Navigation Columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-12 md:gap-16">
            {/* Column 1: Creations */}
            <div className="flex flex-col space-y-2">
              <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.25em] uppercase font-bold text-black/50 mb-1">
                CREATIONS
              </span>
              <button
                onClick={() => scrollToProgress(0)}
                className="text-left font-mono text-xs sm:text-[13px] tracking-[0.18em] uppercase font-medium text-black/85 hover:text-black transition-colors cursor-pointer"
              >
                AI CINEMA
              </button>
              <button
                onClick={() => scrollToProgress(0.5)}
                className="text-left font-mono text-xs sm:text-[13px] tracking-[0.18em] uppercase font-medium text-black/85 hover:text-black transition-colors cursor-pointer"
              >
                SURREAL WORLDS
              </button>
              <button
                onClick={() => scrollToProgress(0.88)}
                className="text-left font-mono text-xs sm:text-[13px] tracking-[0.18em] uppercase font-medium text-black/85 hover:text-black transition-colors cursor-pointer"
              >
                DIGITAL ART
              </button>
              <button
                onClick={() => scrollToProgress(0.5)}
                className="text-left font-mono text-xs sm:text-[13px] tracking-[0.18em] uppercase font-medium text-black/85 hover:text-black transition-colors cursor-pointer"
              >
                EXPERIMENTS
              </button>
            </div>

            {/* Column 2: Dispatches / Blogs */}
            <div className="flex flex-col space-y-2">
              <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.25em] uppercase font-bold text-black/50 mb-1">
                DISPATCHES
              </span>
              <Link
                href="/blog/surrealism-in-generative-ai-cinema"
                className="font-mono text-xs sm:text-[13px] tracking-[0.18em] uppercase font-medium text-black/85 hover:text-black transition-colors"
              >
                SURREALISM & AI
              </Link>
              <Link
                href="/blog/inside-aiai-videos-surreal-ai-art-channel"
                className="font-mono text-xs sm:text-[13px] tracking-[0.18em] uppercase font-medium text-black/85 hover:text-black transition-colors"
              >
                GENERATIVE CINEMA
              </Link>
              <Link
                href="/blog/aiai-creative-pipeline-prompt-to-screen"
                className="font-mono text-xs sm:text-[13px] tracking-[0.18em] uppercase font-medium text-black/85 hover:text-black transition-colors"
              >
                CREATIVE PIPELINE
              </Link>
              <Link
                href="/#blogs"
                className="font-mono text-xs sm:text-[13px] tracking-[0.18em] uppercase font-medium text-black/85 hover:text-black transition-colors"
              >
                ALL ARTICLES
              </Link>
            </div>

            {/* Column 3: Studio */}
            <div className="flex flex-col space-y-2">
              <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.25em] uppercase font-bold text-black/50 mb-1">
                STUDIO
              </span>
              <button
                onClick={() => scrollToProgress(0)}
                className="text-left font-mono text-xs sm:text-[13px] tracking-[0.18em] uppercase font-medium text-black/85 hover:text-black transition-colors cursor-pointer"
              >
                ABOUT AIAI
              </button>
              <button
                onClick={() => scrollToProgress(0.5)}
                className="text-left font-mono text-xs sm:text-[13px] tracking-[0.18em] uppercase font-medium text-black/85 hover:text-black transition-colors cursor-pointer"
              >
                PHILOSOPHY
              </button>
              <Link
                href="/blog/best-ai-video-generation-tools"
                className="font-mono text-xs sm:text-[13px] tracking-[0.18em] uppercase font-medium text-black/85 hover:text-black transition-colors"
              >
                EXPERIMENTS
              </Link>
              <a
                href={YOUTUBE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs sm:text-[13px] tracking-[0.18em] uppercase font-medium text-black/85 hover:text-black transition-colors"
              >
                CONTACT
              </a>
            </div>
          </div>

          {/* Social Links on Top Right */}
          <div className="flex flex-wrap items-center gap-6 sm:gap-8 md:gap-10 pt-2 lg:pt-0">
            <a
              href={YOUTUBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs sm:text-[13px] tracking-[0.22em] uppercase font-bold text-black/80 hover:text-black transition-colors"
            >
              YOUTUBE
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs sm:text-[13px] tracking-[0.22em] uppercase font-bold text-black/80 hover:text-black transition-colors"
            >
              X
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs sm:text-[13px] tracking-[0.22em] uppercase font-bold text-black/80 hover:text-black transition-colors"
            >
              INSTAGRAM
            </a>
            <a
              href="https://discord.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs sm:text-[13px] tracking-[0.22em] uppercase font-bold text-black/80 hover:text-black transition-colors"
            >
              DISCORD
            </a>
          </div>
        </div>

        {/* 3D Floating Assets Interactive Composition */}
        <div aria-hidden className="absolute inset-0 pointer-events-none select-none z-10 overflow-hidden">
          {/* Asteroid 1: Left floating rock overlapping bottom typography */}
          <div className="absolute bottom-[6%] left-[6vw] sm:left-[10vw] w-[110px] sm:w-[170px] md:w-[210px] aspect-square animate-hero-0 z-30">
            <Image
              src="/hero_assets/hero-shape-0.webp"
              alt=""
              fill
              className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.35)]"
            />
          </div>

          {/* Satellite / Center Hero: Center floating 3D sculpture right above letters */}
          <div className="absolute bottom-[16%] left-[32vw] sm:left-[35vw] w-[140px] sm:w-[220px] md:w-[280px] aspect-square animate-hero-1 z-30">
            <Image
              src="/hero_assets/hero-shape-1.webp"
              alt=""
              fill
              className="object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.4)]"
            />
          </div>

          {/* Asteroid 2: Upper cosmic rock in open atmospheric sky */}
          <div className="absolute top-[28%] right-[36vw] sm:right-[38vw] w-[60px] sm:w-[90px] md:w-[120px] aspect-square animate-hero-4 z-10 opacity-90">
            <Image
              src="/hero_assets/hero-shape-4.webp"
              alt=""
              fill
              className="object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.3)]"
            />
          </div>

          {/* Crystal Crag: Bottom Right cluster overlapping last letter */}
          <div className="absolute -bottom-[2%] right-[2vw] sm:right-[5vw] w-[150px] sm:w-[240px] md:w-[320px] aspect-square animate-hero-3 z-30">
            <Image
              src="/hero_assets/hero-shape-3.webp"
              alt=""
              fill
              className="object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.4)]"
            />
          </div>

          {/* Shard Ring: Subtle ambient floating shard near right edge */}
          <div className="absolute top-[32%] right-[6vw] w-[80px] sm:w-[130px] md:w-[160px] aspect-square animate-hero-2 z-10 opacity-75">
            <Image
              src="/hero_assets/hero-shape-2.webp"
              alt=""
              fill
              className="object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.25)]"
            />
          </div>
        </div>

        {/* Bottom Section: Legal sub-row + Massive TURION-style typography */}
        <div className="relative z-20 w-full mt-auto">
          {/* Sub-row: Copyright + Terms & Privacy */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-black/60 pb-3 font-mono text-[10px] sm:text-[11px] tracking-[0.2em] uppercase">
            <span>© {new Date().getFullYear()} AIAI VIDEOS CORP. ALL RIGHTS RESERVED.</span>
            <div className="flex items-center gap-6 sm:gap-8">
              <span className="hover:text-black transition-colors cursor-pointer">
                TERMS & CONDITIONS
              </span>
              <span className="hover:text-black transition-colors cursor-pointer">
                PRIVACY POLICY
              </span>
            </div>
          </div>

          {/* Giant Monumental Typography across 100% width */}
          <div className="w-full flex items-end justify-between leading-[0.74] tracking-[-0.02em] font-black text-black select-none pointer-events-none overflow-hidden font-fluffy">
            <span className="text-[27vw] sm:text-[25vw] md:text-[24vw] inline-block transform translate-y-[2%]">
              A
            </span>
            <span className="text-[27vw] sm:text-[25vw] md:text-[24vw] inline-block transform translate-y-[2%]">
              I
            </span>
            <span className="text-[27vw] sm:text-[25vw] md:text-[24vw] inline-block transform translate-y-[2%]">
              A
            </span>
            <span className="text-[27vw] sm:text-[25vw] md:text-[24vw] inline-block transform translate-y-[2%]">
              I
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
