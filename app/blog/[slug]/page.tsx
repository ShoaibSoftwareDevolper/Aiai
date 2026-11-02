import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  Sparkles,
  Share2,
  Bookmark,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { BLOG_POSTS, getBlogPostBySlug, getAllBlogSlugs } from '@/lib/blogs';
import { BRAND, FAVICON_URL, SITE_URL, YOUTUBE_URL } from '@/lib/site';

export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: 'Article Not Found | AIAI Videos',
    };
  }

  const postUrl = `${SITE_URL}/blog/${post.slug}`;
  const imageUrl = post.coverImage.startsWith('http')
    ? post.coverImage
    : `${SITE_URL}${post.coverImage}`;

  return {
    title: `${post.title} | AIAI Videos`,
    description: post.excerpt,
    keywords: post.keywords,
    authors: [{ name: post.author.name, url: YOUTUBE_URL }],
    creator: BRAND,
    publisher: BRAND,
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: postUrl,
      siteName: BRAND,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [YOUTUBE_URL],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [imageUrl],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const currentIndex = BLOG_POSTS.findIndex((p) => p.slug === post.slug);
  const prevPost = currentIndex > 0 ? BLOG_POSTS[currentIndex - 1] : null;
  const nextPost = currentIndex < BLOG_POSTS.length - 1 ? BLOG_POSTS[currentIndex + 1] : null;

  // JSON-LD structured data for article SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: [`${SITE_URL}${post.coverImage}`],
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      '@type': 'Organization',
      name: BRAND,
      url: YOUTUBE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: BRAND,
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: FAVICON_URL,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${post.slug}`,
    },
    keywords: post.keywords.join(', '),
  };

  return (
    <article className="relative min-h-screen bg-[#050505] text-white overflow-hidden selection:bg-[#ef3624] selection:text-white">
      {/* Background gradient mixture of White, Red, and Yellow */}
      <div className="fixed inset-0 pointer-events-none select-none overflow-hidden z-0">
        {/* Soft white top ambient glow */}
        <div
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[60vw] h-[400px] rounded-full opacity-15 blur-[120px]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.2) 40%, transparent 70%)',
          }}
        />

        {/* Fiery crimson red ambient orb */}
        <div
          className="absolute top-[20vh] -left-[10vw] w-[50vw] h-[50vw] max-w-[650px] max-h-[650px] rounded-full opacity-25 blur-[140px]"
          style={{
            background: 'radial-gradient(circle, #ef3624 0%, #b31010 50%, transparent 75%)',
          }}
        />

        {/* Solar golden yellow / amber gradient orb */}
        <div
          className="absolute top-[35vh] -right-[10vw] w-[45vw] h-[45vw] max-w-[600px] max-h-[600px] rounded-full opacity-20 blur-[130px]"
          style={{
            background: 'radial-gradient(circle, #ffaa00 0%, #ff5500 50%, transparent 75%)',
          }}
        />

        {/* Subtle bottom mix gradient */}
        <div
          className="absolute bottom-0 left-1/4 w-[50vw] h-[50vw] max-w-[500px] max-h-[500px] rounded-full opacity-15 blur-[130px]"
          style={{
            background: 'radial-gradient(circle, #ffd166 0%, #ef3624 45%, transparent 70%)',
          }}
        />
      </div>

      {/* JSON-LD Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />

      {/* Top Navigation Bar */}
      <nav className="relative z-30 w-full border-b border-white/10 bg-black/60 backdrop-blur-xl px-4 sm:px-8 md:px-14 py-4 sm:py-5 flex items-center justify-between">
        <div className="flex items-center gap-4 sm:gap-6">
          <Link
            href="/#blogs"
            className="flex items-center gap-2 text-xs sm:text-sm tracking-[0.18em] uppercase font-bold text-white/80 hover:text-white transition-colors group cursor-pointer"
          >
            <span className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white group-hover:bg-white group-hover:text-black transition-all">
              <ArrowLeft size={14} />
            </span>
            <span>All Dispatches</span>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-3 text-xs tracking-[0.2em] font-mono text-white/50">
          <span>{post.category}</span>
          <span>•</span>
          <span className="text-[#ff9f1c]">Article 0{currentIndex + 1} of 0{BLOG_POSTS.length}</span>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={YOUTUBE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase font-bold px-4 py-2 rounded-full bg-[#ef3624] hover:bg-[#ff4538] text-white transition-all"
          >
            <span>Subscribe</span>
            <ExternalLink size={12} />
          </a>
        </div>
      </nav>

      {/* Article Hero Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-8 pt-12 sm:pt-20 pb-12">
        {/* Category & Read Time */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-6">
          <div className="flex items-center gap-1.5 text-xs tracking-[0.2em] uppercase font-bold text-white/70">
            <span>{post.category}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs tracking-[0.15em] text-white/60 font-mono">
            <Calendar size={13} />
            <span>{post.publishedAt}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs tracking-[0.15em] text-white/60 font-mono">
            <Clock size={13} />
            <span>{post.readTime}</span>
          </div>
        </div>

        {/* Main H1 Title */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-light uppercase leading-[1.12] tracking-tight text-white mb-6">
          {post.title}
        </h1>

        {/* Subtitle / Excerpt */}
        <p className="text-lg sm:text-xl text-white/80 leading-relaxed font-light mb-8 max-w-3xl">
          {post.subtitle}
        </p>

        {/* Author Byline */}
        <div className="flex items-center justify-between gap-4 py-6 border-y border-white/10 mb-10">
          <div className="flex items-center gap-3">
            <div className="relative w-11 h-11 rounded-full overflow-hidden border border-white/20">
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="text-sm font-bold tracking-wide text-white">
                {post.author.name}
              </div>
              <div className="text-xs text-white/60 font-mono">
                {post.author.role}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                post.title
              )}&url=${encodeURIComponent(`${SITE_URL}/blog/${post.slug}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on X"
              className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/70 hover:text-white hover:border-white transition-colors cursor-pointer"
            >
              <Share2 size={15} />
            </a>
          </div>
        </div>

        {/* Hero Cover Image */}
        <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden mb-14 border border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.7)]">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 896px"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-mono tracking-wider text-white/70">
            AIAI Visual Archive // Official Creation
          </div>
        </div>

        {/* Table of Contents */}
        {post.tableOfContents && post.tableOfContents.length > 0 && (
          <aside className="mb-14 p-6 sm:p-8 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
            <div className="text-xs tracking-[0.25em] uppercase font-bold text-[#ffb703] mb-4">
              Table of Contents
            </div>
            <ol className="space-y-2.5">
              {post.tableOfContents.map((item, idx) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="text-sm text-white/75 hover:text-white hover:underline transition-colors flex items-center gap-3"
                  >
                    <span className="font-mono text-xs text-white/40">0{idx + 1}.</span>
                    <span>{item.title}</span>
                  </a>
                </li>
              ))}
            </ol>
          </aside>
        )}

        {/* Body Sections */}
        <div className="space-y-12 sm:space-y-16">
          {post.sections.map((sec) => (
            <section key={sec.id} id={sec.id} className="scroll-mt-24 space-y-6">
              <h2 className="text-2xl sm:text-3xl font-light uppercase tracking-tight text-white border-l-2 border-[#ef3624] pl-4">
                {sec.heading}
              </h2>

              <div className="space-y-4 text-white/85 text-base sm:text-lg leading-relaxed font-light">
                {sec.paragraphs.map((p, pIdx) => (
                  <p key={pIdx}>{p}</p>
                ))}
              </div>

              {/* Callout Box */}
              {sec.callout && (
                <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#ef3624]/10 via-[#ffaa00]/5 to-transparent border border-[#ef3624]/30 my-6 shadow-[0_10px_30px_rgba(239,54,36,0.1)]">
                  <div className="text-sm font-bold tracking-wider uppercase text-[#ffd166] mb-2 flex items-center gap-2">
                    <Sparkles size={14} />
                    {sec.callout.title}
                  </div>
                  <p className="text-sm sm:text-base text-white/90 leading-relaxed font-light">
                    {sec.callout.body}
                  </p>
                </div>
              )}

              {/* Bullet List */}
              {sec.bulletList && (
                <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4 my-6">
                  {sec.bulletList.title && (
                    <div className="text-sm font-bold tracking-wider uppercase text-white mb-2">
                      {sec.bulletList.title}
                    </div>
                  )}
                  <div className="space-y-3">
                    {sec.bulletList.items.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <CheckCircle2
                          size={18}
                          className="text-[#ff9f1c] flex-shrink-0 mt-0.5"
                        />
                        <div className="text-sm sm:text-base">
                          <strong className="text-white font-semibold">{item.title}: </strong>
                          <span className="text-white/80 font-light">{item.description}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Comparison Table */}
              {sec.comparisonTable && (
                <div className="overflow-x-auto my-8 rounded-2xl border border-white/10 bg-black/40">
                  <table className="w-full text-left text-sm">
                    {sec.comparisonTable.caption && (
                      <caption className="p-4 text-xs tracking-[0.2em] uppercase font-mono text-white/60 bg-white/5 border-b border-white/10 text-left">
                        {sec.comparisonTable.caption}
                      </caption>
                    )}
                    <thead>
                      <tr className="border-b border-white/10 bg-white/[0.04]">
                        {sec.comparisonTable.headers.map((h, hIdx) => (
                          <th
                            key={hIdx}
                            className="py-3 px-4 text-xs tracking-wider uppercase font-bold text-white/90"
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {sec.comparisonTable.rows.map((row, rIdx) => (
                        <tr
                          key={rIdx}
                          className="hover:bg-white/[0.03] transition-colors"
                        >
                          {row.map((cell, cIdx) => (
                            <td
                              key={cIdx}
                              className={`py-3.5 px-4 font-light ${
                                cIdx === 0 ? 'font-semibold text-white' : 'text-white/80'
                              }`}
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Quote Block */}
              {sec.quote && (
                <blockquote className="my-8 p-6 sm:p-8 rounded-2xl border-l-4 border-[#ffaa00] bg-white/[0.03]">
                  <p className="text-lg sm:text-xl italic font-light text-white leading-relaxed mb-3">
                    “{sec.quote.text}”
                  </p>
                  <cite className="text-xs font-mono tracking-wider uppercase text-white/60 not-italic block">
                    — {sec.quote.citation}
                  </cite>
                </blockquote>
              )}
            </section>
          ))}
        </div>


        {/* ========================================================
            POST PAGINATION CONTROLS
            ======================================================== */}
        <div className="mt-20 pt-10 border-t border-white/10">
          <div className="flex items-center justify-between mb-8">
            <span className="text-xs tracking-[0.25em] uppercase font-mono text-white/50">
              Dispatch Navigation
            </span>
            <span className="text-xs tracking-[0.2em] font-mono text-[#ffaa00]">
              {String(currentIndex + 1).padStart(2, '0')} / {String(BLOG_POSTS.length).padStart(2, '0')}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Previous Article */}
            {prevPost ? (
              <Link
                href={`/blog/${prevPost.slug}`}
                className="group p-5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-white/25 transition-all flex items-center gap-4 text-left"
              >
                <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border border-white/10">
                  <Image
                    src={prevPost.coverImage}
                    alt={prevPost.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="overflow-hidden">
                  <div className="text-[11px] tracking-[0.2em] uppercase font-bold text-white/50 mb-1 flex items-center gap-1.5">
                    <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" />
                    <span>Previous Dispatch</span>
                  </div>
                  <div className="text-sm font-medium text-white group-hover:text-[#ffd166] transition-colors line-clamp-2">
                    {prevPost.title}
                  </div>
                </div>
              </Link>
            ) : (
              <div className="p-5 rounded-2xl border border-white/5 text-white/30 text-xs font-mono tracking-wider flex items-center justify-center">
                Start of Dispatches
              </div>
            )}

            {/* Next Article */}
            {nextPost ? (
              <Link
                href={`/blog/${nextPost.slug}`}
                className="group p-5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-white/25 transition-all flex items-center justify-between gap-4 text-right"
              >
                <div className="overflow-hidden">
                  <div className="text-[11px] tracking-[0.2em] uppercase font-bold text-white/50 mb-1 flex items-center justify-end gap-1.5">
                    <span>Next Dispatch</span>
                    <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                  <div className="text-sm font-medium text-white group-hover:text-[#ffd166] transition-colors line-clamp-2">
                    {nextPost.title}
                  </div>
                </div>
                <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border border-white/10">
                  <Image
                    src={nextPost.coverImage}
                    alt={nextPost.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </Link>
            ) : (
              <div className="p-5 rounded-2xl border border-white/5 text-white/30 text-xs font-mono tracking-wider flex items-center justify-center">
                End of Dispatches
              </div>
            )}
          </div>

          {/* Quick Pagination Dots */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {BLOG_POSTS.map((p, idx) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                aria-label={`Go to article ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === idx
                    ? 'w-8 bg-[#ef3624]'
                    : 'w-2 bg-white/20 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
