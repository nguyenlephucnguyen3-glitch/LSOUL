// Cấu hình chung của website. Các giá trị lấy từ file .env ở thư mục gốc.
const env = import.meta.env || {};

export const SITE = {
  name: 'LSOUL',
  // Tên miền thật sau khi deploy, ví dụ https://lsoul.vercel.app (điền VITE_SITE_URL trong .env)
  url: (env.VITE_SITE_URL || 'https://lsoul.example.com').replace(/\/$/, ''),
  slogan: 'Mặc theo cách của bạn',
  hashtag: '#MacTheoCachCuaBan',
  description:
    'LSOUL — thời trang nữ lãng mạn kiểu Victoria với tinh thần độc lập: corset, xếp nếp, nơ và ren. Mặc theo cách của bạn.',
};

// Link mạng xã hội — thay bằng trang thật của LSOUL.
export const SOCIAL = [
  { key: 'tiktok', label: 'TikTok', url: 'https://www.tiktok.com/' },
  { key: 'instagram', label: 'Instagram', url: 'https://www.instagram.com/' },
  { key: 'facebook', label: 'Facebook', url: 'https://www.facebook.com/' },
  { key: 'threads', label: 'Threads', url: 'https://www.threads.net/' },
];

// Gắn UTM để GA4 biết khách đến từ nền tảng nào khi họ bấm link được chia sẻ.
export function withUtm(path, source, medium = 'social', campaign = 'mac_theo_cach_cua_ban') {
  const u = new URL(path, SITE.url);
  u.searchParams.set('utm_source', source);
  u.searchParams.set('utm_medium', medium);
  u.searchParams.set('utm_campaign', campaign);
  return u.toString();
}
