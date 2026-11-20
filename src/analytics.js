// Google Analytics 4 (gtag.js).
// Khi có Measurement ID, điền vào file .env:  VITE_GA_ID=G-XXXXXXXXXX  rồi chạy lại `npm run dev`.
// Chưa có ID thì web vẫn chạy bình thường, các sự kiện chỉ được ghi ra Console (F12) để kiểm tra.
const env = import.meta.env || {};
// Measurement ID của LSOUL. Có thể ghi đè bằng VITE_GA_ID trong file .env.
// .trim(): bỏ khoảng trắng / xuống dòng thừa khi dán mã vào Vercel hoặc .env
const GA_ID = (env.VITE_GA_ID || 'G-D51Q7KE7QG').trim();
export const CURRENCY = 'VND';

let started = false;

// Gắn thẻ G-Tag vào <head> của trang.
const DEMO_MODE = typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('demo');

export function initAnalytics() {
  // Chế độ demo (?demo=1) không gửi dữ liệu để số liệu GA4 luôn là của người dùng thật.
  if (started || !GA_ID || DEMO_MODE) return;
  started = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments); // eslint-disable-line prefer-rest-params
  };
  window.gtag('js', new Date());
  // Tắt page_view tự động: web là SPA nên tự gửi page_view mỗi lần đổi trang (xem App.jsx).
  window.gtag('config', GA_ID, { send_page_view: false });
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);
}

// Gửi một sự kiện. Tên sự kiện dùng theo chuẩn GA4 (view_item, add_to_cart, purchase…).
const recent = new Map();

export function track(name, params = {}) {
  if (DEMO_MODE) return;
  // Bỏ qua sự kiện trùng lặp trong 400ms (React StrictMode chạy effect 2 lần khi dev).
  const sig = name + JSON.stringify(params);
  const now = Date.now();
  if (now - (recent.get(sig) || 0) < 400) return;
  recent.set(sig, now);

  if (GA_ID && window.gtag) window.gtag('event', name, params);
  if (!GA_ID || env.DEV) {
    (window.__gaEvents = window.__gaEvents || []).push({ name, params });
    console.debug(`[GA4${GA_ID ? '' : ' · chưa có ID'}]`, name, params);
  }
}

// Chuyển sản phẩm sang định dạng "item" của GA4 e-commerce.
export const toItem = (p, extra = {}) => ({
  item_id: p.id,
  item_name: p.name,
  item_brand: 'LSOUL',
  item_category: p.category,
  price: p.price,
  ...extra,
});
