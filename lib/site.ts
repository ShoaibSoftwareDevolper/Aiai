/**
 * Single source of truth for brand facts, copy and SEO data.
 * Keeping facts identical across visible text, metadata, JSON-LD and llms.txt
 * strengthens entity consistency for search engines and AI answer engines.
 *
 * Copy rule: no dashes and no emoji in visible text.
 */

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').replace(/\/$/, '');

export const BRAND = 'AIAI Videos';
export const YOUTUBE_URL = 'https://www.youtube.com/@AIAI-5926';
export const LOGO_URL = '/logo.png';
export const FAVICON_URL = '/favicon.jpg';

export const TAGLINE = 'Where imagination meets AI';
export const COUNTRY = 'Pakistan';
export const FOUNDED = '2026-09-29';

export const SEO_TITLE = 'AIAI Videos | Creative AI Videos, Surreal Digital Art and Fantasy Worlds';
export const SEO_DESCRIPTION =
  'AIAI Videos is a YouTube channel where imagination meets AI. Watch original AI videos, surreal digital art, fantasy worlds and visual experiments, and subscribe for new imaginative creations.';

/** Answer first definition, reused in About, FAQ, JSON-LD and llms.txt. */
export const DEFINITION =
  'AIAI Videos is a YouTube channel from Pakistan that creates original AI videos, surreal digital art, fantasy worlds and visual experiments. Every video begins with a human idea and is brought to life with generative AI tools, then edited for mood, wonder and story.';

export const KEYWORDS = [
  'AIAI Videos',
  'AIAI',
  'AI videos',
  'AI video channel',
  'AI art YouTube channel',
  'surreal digital art',
  'fantasy worlds',
  'AI visual experiments',
  'generative AI videos',
  'AI short films',
  'creative AI content',
  'AI animation',
  'Pakistan AI creator',
];

export const NAV_LINKS = [
  { label: 'AIAI VIDEOS', targetProgress: 0, active: true },
  { label: 'EXPERIMENTS', targetProgress: 0.5, active: false },
  { label: 'CHANNEL', targetProgress: 0.88, active: false },
  { label: 'BLOGS', targetProgress: 1.0, active: false, sectionId: 'blogs' },
];

export const FACTS = [
  { term: 'Channel', value: 'AIAI Videos' },
  { term: 'Platform', value: 'YouTube' },
  { term: 'Based in', value: 'Pakistan' },
  { term: 'Launched', value: 'September 2026' },
  { term: 'Focus', value: 'AI video and digital art' },
];

export type PillarIcon = 'sparkles' | 'palette' | 'mountain' | 'flask' | 'lightbulb';

export const PILLARS: { icon: PillarIcon; title: string; text: string }[] = [
  {
    icon: 'sparkles',
    title: 'Creative AI Videos',
    text: 'Short cinematic pieces generated and edited with modern AI video models, each one built around a single striking idea.',
  },
  {
    icon: 'palette',
    title: 'Surreal Digital Art',
    text: 'Dreamlike visuals that bend reality: impossible architecture, liquid light and objects that should not exist.',
  },
  {
    icon: 'mountain',
    title: 'Fantasy Worlds',
    text: 'Imagined landscapes, creatures and cities explored as if you were travelling right through them.',
  },
  {
    icon: 'flask',
    title: 'Visual Experiments',
    text: 'Tests of style, motion and texture that push what AI imagery can do, shared openly so you can see the craft.',
  },
  {
    icon: 'lightbulb',
    title: 'Unexpected Ideas',
    text: 'Playful what if concepts turned into moving pictures you will want to watch twice.',
  },
];

export const STEPS = [
  {
    title: 'Spark the idea',
    text: 'Every AIAI video starts with a human question, a feeling or a what if moment.',
  },
  {
    title: 'Direct the vision',
    text: 'The idea becomes detailed visual direction covering light, colour, camera and motion.',
  },
  {
    title: 'Generate and refine',
    text: 'Many versions are created with AI tools and only the most striking frames survive.',
  },
  {
    title: 'Edit and publish',
    text: 'Clips are edited, paced and scored, then released on the AIAI Videos YouTube channel.',
  },
];

export const FAQS = [
  {
    q: 'What is AIAI Videos?',
    a: DEFINITION,
  },
  {
    q: 'What kind of videos does AIAI Videos publish?',
    a: 'AIAI Videos publishes creative AI videos, surreal digital art, fantasy worlds, visual experiments and imaginative short clips. Every upload is an original creation made for viewers who love AI art and unusual ideas.',
  },
  {
    q: 'Are AIAI videos made with artificial intelligence?',
    a: 'Yes. Each video combines a human creative idea with generative AI tools for imagery and motion, followed by careful human editing. The channel is open about using AI as a creative instrument.',
  },
  {
    q: 'Where is AIAI Videos based?',
    a: 'AIAI Videos is based in Pakistan and creates content for a global audience that enjoys AI art, digital creativity and imaginative visuals.',
  },
  {
    q: 'How can I watch AIAI Videos?',
    a: 'Search for AIAI Videos on YouTube or use the Subscribe on YouTube button on this website to open the official channel directly.',
  },
  {
    q: 'How often does AIAI Videos release new content?',
    a: 'New imaginative videos are added regularly. Subscribe to the channel and turn on notifications to see every new AIAI release first.',
  },
  {
    q: 'How can I collaborate with AIAI Videos?',
    a: 'For collaborations and business enquiries, use the email address listed on the About tab of the official AIAI Videos YouTube channel.',
  },
];
