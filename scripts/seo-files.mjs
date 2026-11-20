// Tạo public/sitemap.xml và public/robots.txt cho Google Search Console.
// Chạy: npm run seo  (tự chạy trước mỗi lần `npm run build`)
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

// Đọc VITE_SITE_URL từ file .env
const env = {};
if (existsSync(join(root, '.env'))) {
  for (const line of readFileSync(join(root, '.env'), 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m) env[m[1]] = m[2].replace(/^['"]|['"]$/g, '');
  }
}
// Ưu tiên biến môi trường (khi khai báo trên Vercel), sau đó tới file .env
const siteUrl = process.env.VITE_SITE_URL || env.VITE_SITE_URL;
const SITE = (siteUrl || 'https://lsoul.example.com').replace(/\/$/, '');
if (!siteUrl) console.warn('⚠ Chưa có VITE_SITE_URL trong .env — sitemap đang dùng tên miền tạm', SITE);

const { PRODUCTS } = await import(pathToFileURL(join(root, 'src/data/products.js')).href);
const today = new Date().toISOString().slice(0, 10);
const pages = [
  { path: '/', priority: '1.0', freq: 'weekly' },
  { path: '/shop', priority: '0.9', freq: 'weekly' },
  { path: '/story', priority: '0.7', freq: 'monthly' },
  { path: '/lookbook', priority: '0.7', freq: 'monthly' },
  { path: '/community', priority: '0.7', freq: 'daily' },
  { path: '/store', priority: '0.5', freq: 'monthly' },
  ...PRODUCTS.map((p) => ({ path: `/product/${p.id}`, priority: '0.8', freq: 'weekly' })),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((p) => `  <url>
    <loc>${SITE}${p.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.freq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;

const robots = `User-agent: *
Allow: /
Disallow: /checkout
Disallow: /order/
Disallow: /orders
Disallow: /wishlist

Sitemap: ${SITE}/sitemap.xml
`;

writeFileSync(join(root, 'public/sitemap.xml'), xml);
writeFileSync(join(root, 'public/robots.txt'), robots);
console.log(`✓ public/sitemap.xml (${pages.length} trang) và public/robots.txt — tên miền: ${SITE}`);
