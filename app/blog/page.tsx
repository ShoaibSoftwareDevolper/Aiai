import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, BookOpen, Sparkles, ExternalLink } from 'lucide-react';
import { BLOG_POSTS } from '@/lib/blogs';
import { BRAND, SITE_URL, YOUTUBE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Dispatches & Articles | AIAI Videos',
  description:
    'Explore articles, AI video generation tool comparisons, prompt guides, and creative philosophy from AIAI Videos — the YouTube channel where imagination meets AI.',
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
};

export default function BlogIndexPage() {
  return (
    <main className="relative min-h-screen bg-[#050505] text-white overflow-hidden py-16 px-4 sm:px-8 md:px-14 selection:bg-[#ef3624] selection:text-white">
      {/* Background gradient mixture of White, Red, and Yellow */}
      <div className="fixed inset-0 pointer-events-none select-none overflow-hidden z-0">
        <div
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[60vw] h-[400px] rounded-full opacity-15 blur-[120px]"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.2) 40%, transparent 70%)',
          }}
        />
        <div
          className="absolute top-[20vh] -left-[10vw] w-[50vw] h-[50vw] max-w-[650px] max-h-[650px] rounded-full opacity-25 blur-[140px]"
          style={{
            background: 'radial-gradient(circle, #ef3624 0%, #b31010 50%, transparent 75%)',
          }}
        />
        <div
          className="absolute top-[40vh] -right-[10vw] w-[45vw] h-[45vw] max-w-[600px] max-h-[600px] rounded-full opacity-20 blur-[130px]"
          style={{
            background: 'radial-gradient(circle, #ffaa00 0%, #ff5500 50%, transparent 75%)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Navigation Bar */}
        <nav className="flex items-center justify-between pb-10 border-b border-white/10 mb-14">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs sm:text-sm tracking-[0.18em] uppercase font-bold text-white/80 hover:text-white transition-colors group cursor-pointer"
          >
            <span className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white group-hover:bg-white group-hover:text-black transition-all">
              <ArrowLeft size={14} />
            </span>
            <span>Back to Home</span>
          </Link>

          <a
            href={YOUTUBE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase font-bold px-4 py-2 rounded-full bg-[#ef3624] hover:bg-[#ff4538] text-white transition-all shadow-[0_4px_20px_rgba(239,54,36,0.4)]"
          >
            <span>Subscribe</span>
            <ExternalLink size={12} />
          </a>
        </nav>

        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs tracking-[0.25em] uppercase text-white/80 font-semibold mb-4">
            <Sparkles size={13} className="text-[#ff9f1c]" />
            AIAI Knowledge Base & Articles
          </div>
          <h1 className="text-4xl sm:text-6xl font-light uppercase tracking-tight text-white mb-6">
            The Frontier of <br />
            <span className="font-semibold bg-gradient-to-r from-white via-[#ffd4b2] to-[#ff5035] bg-clip-text text-transparent">
              AI Video & Surrealism
            </span>
          </h1>
          <p className="text-base sm:text-lg text-white/70 leading-relaxed font-light">
            Comprehensive guides on AI video generation models, prompt craft, production pipelines,
            and the artistic philosophy behind AIAI Videos.
          </p>
        </div>

        {/* Grid of Articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {BLOG_POSTS.map((post, idx) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group relative rounded-2xl overflow-hidden border border-white/10 hover:border-white/30 bg-black/40 transition-all duration-500 hover:-translate-y-1.5 flex flex-col justify-between"
            >
              {/* Image Banner */}
              <div className="relative w-full aspect-[16/10] overflow-hidden">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[11px] font-bold tracking-wider uppercase text-[#ffd166]">
                  {post.category}
                </div>
                <div className="absolute top-4 right-4 text-[11px] font-mono text-white/70">
                  {post.readTime}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow">
                <div>
                  <div className="text-[11px] font-mono tracking-wider text-[#ffaa00] uppercase mb-2">
                    Dispatch 0{idx + 1}
                  </div>
                  <h2 className="text-xl sm:text-2xl font-light uppercase text-white group-hover:text-[#ffd8c2] transition-colors leading-snug mb-3">
                    {post.title}
                  </h2>
                  <p className="text-sm text-white/70 leading-relaxed font-light line-clamp-2 mb-6">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs tracking-wider uppercase font-bold text-white/80 group-hover:text-white">
                  <span className="flex items-center gap-2">
                    <BookOpen size={14} className="text-[#ef3624]" />
                    Read Dispatch
                  </span>
                  <span className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white group-hover:bg-white group-hover:text-black transition-all">
                    <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
