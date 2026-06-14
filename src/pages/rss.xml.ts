import { articles } from '../data/articles';

export const prerender = true;

const SITE = 'https://kolbovskiy.club';
const FEED_TITLE = 'kolbovskiy.club';
const FEED_DESCRIPTION = 'Частное медиа о сложных системах, неопределённости и сбоях реальности.';
const AUTHOR = 'Никита Колбовский';

const escapeXml = (value = '') => String(value)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&apos;');

const stripHtml = (value = '') => String(value)
  .replace(/<br\s*\/?>/gi, ' ')
  .replace(/<[^>]+>/g, ' ')
  .replace(/\s+/g, ' ')
  .trim();

const absoluteUrl = (value = '/') => new URL(value, SITE).toString();
const mimeFromPath = (value = '') => String(value).toLowerCase().endsWith('.gif') ? 'image/gif' : 'image/jpeg';
const rfcDate = (value?: string) => {
  const date = value ? new Date(value) : new Date();
  return Number.isNaN(date.getTime()) ? new Date().toUTCString() : date.toUTCString();
};

export async function GET() {
  const sorted = [...articles]
    .filter(Boolean)
    .sort((a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime());

  const items = sorted.map((article) => {
    const link = article.canonical || absoluteUrl(`/txt/${article.slug}/`);
    const description = article.description || article.excerpt || stripHtml(article.body?.[0] ?? '');
    const categories = (article.rubrics ?? []).map((rubric) => `      <category>${escapeXml(rubric.replace('#', ''))}</category>`).join('\n');
    const enclosure = article.heroImage ? `\n      <enclosure url="${escapeXml(absoluteUrl(article.heroImage))}" type="${escapeXml(mimeFromPath(article.heroImage))}" />` : '';

    return `    <item>\n      <title>${escapeXml(stripHtml(article.seoTitle || article.title))}</title>\n      <link>${escapeXml(link)}</link>\n      <guid isPermaLink="true">${escapeXml(link)}</guid>\n      <pubDate>${rfcDate(article.datetime)}</pubDate>\n      <dc:creator>${escapeXml(AUTHOR)}</dc:creator>\n      <description>${escapeXml(description)}</description>${categories ? `\n${categories}` : ''}${enclosure}\n    </item>`;
  }).join('\n');

  const latestDate = sorted[0]?.datetime;
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">\n  <channel>\n    <title>${escapeXml(FEED_TITLE)}</title>\n    <link>${SITE}/</link>\n    <description>${escapeXml(FEED_DESCRIPTION)}</description>\n    <language>ru</language>\n    <lastBuildDate>${rfcDate(latestDate)}</lastBuildDate>\n    <atom:link href="${SITE}/rss.xml" rel="self" type="application/rss+xml" />\n${items}\n  </channel>\n</rss>\n`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600'
    }
  });
}
