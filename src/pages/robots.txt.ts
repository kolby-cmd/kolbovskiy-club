export const prerender = true;

const SITE = 'https://kolbovskiy.club';

export async function GET() {
  const body = [
    'User-agent: *',
    'Allow: /',
    '',
    'Disallow: /src/',
    'Disallow: /node_modules/',
    'Disallow: /.astro/',
    '',
    `Sitemap: ${SITE}/sitemap.xml`,
    ''
  ].join('\n');

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600'
    }
  });
}
