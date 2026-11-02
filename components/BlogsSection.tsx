import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BLOG_POSTS } from '@/lib/blogs';

// Duplicate the list so the CSS translate3d loop is 100% seamless and infinite
const SLIDES = [...BLOG_POSTS, ...BLOG_POSTS];

export default function BlogsSection() {
  return (
    <section
      id="blogs"
      className="relative z-20 w-full bg-[#050505] py-14 sm:py-20 overflow-hidden"
    >
      {/* Edge gradient fade masks for ultra-smooth entrance & exit */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 z-10 bg-gradient-to-r from-[#050505] to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 z-10 bg-gradient-to-l from-[#050505] to-transparent"
      />

      {/* Ultra lightweight marquee / continuous loop track */}
      <div className="flex overflow-hidden select-none">
        <div className="animate-infinite-loop flex items-center gap-6 sm:gap-8 px-4">
          {SLIDES.map((post, idx) => (
            <Link
              key={`${post.slug}-${idx}`}
              href={`/blog/${post.slug}`}
              className="group relative flex-shrink-0 w-[260px] sm:w-[320px] md:w-[360px] h-[400px] sm:h-[480px] md:h-[520px] rounded-2xl overflow-hidden border border-white/10 hover:border-white/30 bg-black/60 transition-transform duration-300 hover:scale-[1.02] cursor-pointer"
            >
              {/* Image */}
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                sizes="(max-width: 640px) 260px, (max-width: 1024px) 320px, 360px"
                className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                priority={idx < 4}
              />

              {/* Gradient Vignette for Clean Title Contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-80" />

              {/* Minimalist Tile: Title Only */}
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 flex flex-col justify-end">
                <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#ffd166] mb-1.5 opacity-80">
                  {post.category}
                </span>
                <h3 className="text-base sm:text-lg md:text-xl font-light uppercase leading-[1.25] text-white group-hover:text-[#ffd8c2] transition-colors line-clamp-2">
                  {post.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
