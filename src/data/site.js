// Cấu hình chung của website. Các giá trị lấy từ file .env ở thư mục gốc.
const env = import.meta.env || {};

export const SITE = {
  name: 'LSOUL',
  // Tên miền thật sau khi deploy, ví dụ https://lsoul.vercel.app (điền VITE_SITE_URL trong .env)
  url: (env.VITE_SITE_URL || 'https://lsoul.example.com').trim().replace(/\/$/, ''),
  slogan: 'Mặc theo cách của bạn',
  hashtag: '#MacTheoCachCuaBan',
  description:
    'LSOUL — thời trang nữ lãng mạn kiểu Victoria với tinh thần độc lập: corset, xếp nếp, nơ và ren. Mặc theo cách của bạn.',
};

// Link mạng xã hội chính thức của LSOUL (Project VLU).
export const SOCIAL = [
  { key: 'tiktok', label: 'TikTok', url: 'https://www.tiktok.com/@projectvlu_lsoul?_r=1', role: 'Video ngắn', desc: 'Chuyển động của chất liệu, kỹ thuật dựng corset 3D và cách phối đồ trong 15 giây.' },
  { key: 'instagram', label: 'Instagram', url: 'https://www.instagram.com/lsoul.projectvlu/', role: 'Lookbook', desc: 'Lưới ảnh đồng bộ màu sắc, lookbook mỗi mùa và khoảnh khắc hậu trường.' },
  { key: 'youtube', label: 'YouTube', url: 'https://www.youtube.com/@ProjectVLULsoul', role: 'Video dài', desc: 'Phim lookbook, hậu trường buổi chụp và hướng dẫn phối đồ chi tiết.' },
  { key: 'facebook', label: 'Facebook', url: 'https://www.facebook.com/share/1Dd9gYe5Fm/', role: 'Cộng đồng', desc: 'Nơi khách hàng chia sẻ outfit, hỏi size và nhận tư vấn từ stylist.' },
  { key: 'threads', label: 'Threads', url: 'https://www.threads.com/@lsoul.projectvlu', role: 'Trò chuyện', desc: 'Những câu chuyện nhỏ về thương hiệu, nhà thiết kế và cách bạn mặc LSOUL.' },
];

// Gắn UTM để GA4 biết khách đến từ nền tảng nào khi họ bấm link được chia sẻ.
export function withUtm(path, source, medium = 'social', campaign = 'mac_theo_cach_cua_ban') {
  const u = new URL(path, SITE.url);
  u.searchParams.set('utm_source', source);
  u.searchParams.set('utm_medium', medium);
  u.searchParams.set('utm_campaign', campaign);
  return u.toString();
}
