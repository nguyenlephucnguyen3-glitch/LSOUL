// SEO cho từng trang: <title>, meta description, Open Graph, canonical và dữ liệu cấu trúc (JSON-LD).
import { useEffect } from 'react';
import { SITE } from './data/site.js';

function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.rel = 'canonical';
    document.head.appendChild(el);
  }
  el.href = href;
}

function setJsonLd(data) {
  document.getElementById('seo-jsonld')?.remove();
  if (!data) return;
  const s = document.createElement('script');
  s.type = 'application/ld+json';
  s.id = 'seo-jsonld';
  s.textContent = JSON.stringify(data);
  document.head.appendChild(s);
}

export const absUrl = (src) => (src?.startsWith('/') ? SITE.url + src : src);

export function useSeo({ title, description = SITE.description, image, path, jsonLd, noindex = false }) {
  const ld = jsonLd ? JSON.stringify(jsonLd) : '';
  useEffect(() => {
    const fullTitle = title ? `${title} | LSOUL` : `LSOUL — ${SITE.slogan}`;
    const url = SITE.url + (path ?? window.location.pathname);
    document.title = fullTitle;
    setMeta('name', 'description', description);
    setMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow');
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:type', jsonLd?.['@type'] === 'Product' ? 'product' : 'website');
    setMeta('property', 'og:image', absUrl(image || '/logo.png'));
    setMeta('name', 'twitter:card', 'summary_large_image');
    setCanonical(url);
    setJsonLd(ld ? JSON.parse(ld) : null);
  }, [title, description, image, path, noindex, ld]);
}
