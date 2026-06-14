import { articles } from '../data/articles';

export const prerender = true;

const SITE = 'https://kolbovskiy.club';

const staticPages = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/archive/', priority: '0.9', changefreq: 'weekly' },
  { path: '/rubrics/', priority: '0.8', changefreq: 'monthly' },
  { path: '/best/', priority: '0.8', changefreq: 'monthly' },
  { path: '/about/', priority: '0.6', changefreq: 'yearly' },
  { path: '/privacy-policy/', priority: '0.3', changefreq: 'yearly' }
];

const escapeXml = (value = '') => String(value)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&apos;');

const absoluteUrl = (path = '/') => new URL(path, SITE).toString();
const dateOnly = (value?: string) => {
  if (!value) return new Date().toISOString().slice(0, 10);
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value).slice(0, 10);
  return date.toISOString().slice(0, 10);
};

export async function GET() {
  const articleUrls = articles.filter(Boolean).map((article) => ({
    loc: article.canonical || absoluteUrl(`/txt/${article.slug}/`),
    lastmod: dateOnly(article.datetime),
    priority: '0.7',
    changefreq: 'monthly'
  }));

  const urls = [
    ...staticPages.map((page) => ({
      loc: absoluteUrl(page.path),
      lastmod: dateOnly(articles[0]?.datetime),
      priority: page.priority,
      changefreq: page.changefreq
    })),
    ...articleUrls
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((url) => `  <url>\n    <loc>${escapeXml(url.loc)}</loc>\n    <lastmod>${escapeXml(url.lastmod)}</lastmod>\n    <changefreq>${url.changefreq}</changefreq>\n    <priority>${url.priority}</priority>\n  </url>`).join('\n')}\n</urlset>\n`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600'
    }
  });
}
