import type { Metadata } from 'next';
import './globals.css';
import {
  BRAND,
  COUNTRY,
  DEFINITION,
  FAQS,
  FAVICON_URL,
  FOUNDED,
  KEYWORDS,
  LOGO_URL,
  SEO_DESCRIPTION,
  SEO_TITLE,
  SITE_URL,
  YOUTUBE_URL,
} from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SEO_TITLE,
  description: SEO_DESCRIPTION,
  keywords: KEYWORDS,
  authors: [{ name: BRAND, url: YOUTUBE_URL }],
  creator: BRAND,
  publisher: BRAND,
  icons: {
    icon: [{ url: FAVICON_URL, type: 'image/jpeg' }],
    shortcut: FAVICON_URL,
    apple: FAVICON_URL,
  },
  openGraph: {
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
    url: SITE_URL,
    siteName: BRAND,
    images: [
      {
        url: LOGO_URL,
        width: 1606,
        height: 735,
        alt: 'AIAI Official Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
    images: [LOGO_URL],
  },
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}#organization`,
      name: BRAND,
      alternateName: ['AIAI', 'AIAI Official', 'AIAI Channel'],
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: LOGO_URL,
        caption: 'AIAI Official Logo',
      },
      image: FAVICON_URL,
      sameAs: [YOUTUBE_URL],
      foundingDate: FOUNDED,
      address: {
        '@type': 'PostalAddress',
        addressCountry: COUNTRY,
      },
      description: DEFINITION,
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}#website`,
      url: SITE_URL,
      name: BRAND,
      description: SEO_DESCRIPTION,
      publisher: {
        '@id': `${SITE_URL}#organization`,
      },
      inLanguage: 'en-US',
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${SITE_URL}#breadcrumbs`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: `${SITE_URL}/`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Creative AI',
          item: `${SITE_URL}/#creative-ai`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Experiments',
          item: `${SITE_URL}/#experiments`,
        },
        {
          '@type': 'ListItem',
          position: 4,
          name: 'Channel',
          item: `${SITE_URL}/#channel`,
        },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': `${SITE_URL}#faq`,
      mainEntity: FAQS.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.a,
        },
      })),
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/jpeg" href={FAVICON_URL} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DynaPuff:wght@400..700&family=Fredoka:wght@300..700&family=Sour+Gummy:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
          }}
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
