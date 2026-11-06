// Toàn bộ ảnh lấy từ thư mục Google Drive "Lsoul_ Truyền thông trực tuyến".
// - Mặc định web tải ảnh thẳng từ Drive (cần file được chia sẻ công khai).
// - Chạy `npm run images` để tải ảnh về public/images và tự chuyển sang dùng ảnh local.
import IMAGE_SOURCE from './image-source.js';

export const IMAGES = {
  bazaar:       { id: '1F2oQCVXNMZIS-X2XUubjj8YEC4nR_K5W', file: 'bazaar-cover.jpg' },
  runway:       { id: '1bh1UMeUrjc4IgYcZ3j-kuG32xczbQ2jp', file: 'runway.jpg' },
  venue:        { id: '1O1mX8SI-ZmuAJzbzGaja_qPmL1OUN4Es', file: 'venue.jpg' },
  seafoam1:     { id: '1P9_oWTpJuGgRGd9hDi3cX4W2DIp6JcDQ', file: 'seafoam-set-1.jpg' },
  seafoam2:     { id: '19hOsdYhKM8saYMgGY9SFD5KxgcuUBvhe', file: 'seafoam-set-2.jpg' },
  ivory1:       { id: '1weGkDXUMw0-olgdsKJi_asafXaLLf7f8', file: 'ivory-mini-1.jpg' },
  ivory2:       { id: '1WnKhV4YGWAXyUhazqVbKtNuStYoQkozM', file: 'ivory-mini-2.jpg' },
  ivory3:       { id: '15h_xY-Xglr01AKgV1fnnDHH5WSN7nVNX', file: 'ivory-mini-3.jpg' },
  noir1:        { id: '1x3NxFku0HixslvJneJz2NXj_Q6Nqii4_', file: 'noir-bustier-1.jpg' },
  noir2:        { id: '1jepLIBWOC3AWpXJa4SQLvnHDU6voQjUy', file: 'noir-bustier-2.jpg' },
  noir3:        { id: '1QzBo0tgjmNxzS5ZDo9sdSO-ppM4hW470', file: 'noir-bustier-3.jpg' },
  blue1:        { id: '1gZx5W1apMmge9jh3nNn5sX1VYl2GGPZC', file: 'powder-blue-1.jpg' },
  blue2:        { id: '1BjLxB2kkOkFcTs_zoxXQ-NtHnGly3SNG', file: 'powder-blue-2.jpg' },
  rouge1:       { id: '1u1vVDqYpBS80n7eEMek_soR93Xfy_msa', file: 'rouge-corset-1.jpg' },
  rouge2:       { id: '1OU2FJ9fg--bo9xeue-S53p07xQ8vdBG-', file: 'rouge-corset-2.jpg' },
  rouge3:       { id: '1Sjn-wHRDq9lFBglecT_Ob36_DR0UJVkI', file: 'rouge-corset-3.jpg' },
  rouge4:       { id: '1pqaXZGNjw7VRa2rZ5X-SUuhngEj39cc9', file: 'rouge-corset-4.jpg' },
  gingham1:     { id: '1IaXgKdjn0W758-qX_yN3kdKCgNibyFef', file: 'gingham-1.jpg' },
  gingham2:     { id: '1bP2Ff1YDvYzrVlTMx5FiK-nEP3nd6srQ', file: 'gingham-2.jpg' },
  gingham3:     { id: '12YR7aDgQQMTRw49t8xbYVODUbV3YKu71', file: 'gingham-3.jpg' },
  cloud1:       { id: '12PJxLiCojEiuxMkh-A_lHCxkAcWo77Ud', file: 'cloud-puff-1.jpg' },
  cloud2:       { id: '1CDRwDsH0Ai4etkEiFbEqR36TV1-vIvro', file: 'cloud-puff-2.jpg' },
  cloud3:       { id: '1nIZH-y82QbG-D_I402EHIqVzbQLG5RA8', file: 'cloud-puff-3.jpg' },
  aqua1:        { id: '1i0xsMSuXxMIeCx6zOxhYi8vyIEzykxm8', file: 'aqua-cascade-1.jpg' },
  aqua2:        { id: '1702WrAc0P090G8qG6QQJjPlGGlShTv8t', file: 'aqua-cascade-2.jpg' },
  aqua3:        { id: '1j87YtIkSW-E-_xdljZ8PywfeqZxSfgXl', file: 'aqua-cascade-3.jpg' },
  sand1:        { id: '1gcDib-zBGdyT7Un9PPj_kViflLoLObTO', file: 'sand-lace-1.jpg' },
  sand2:        { id: '1n2O2xngOBiajKivHd47e7lhrT7iVhLRb', file: 'sand-lace-2.jpg' },
  sand3:        { id: '1Hy4eAyuJnqzQZIR3RSZ5V8U4SsTDWg5y', file: 'sand-lace-3.jpg' },
  logo:         { id: '1PcSl_8esHOZz6b5qOQ2KA4dxlF4zzzhO', file: 'logo.png' },
  storeA:       { id: '1sIZpe8xBvl1FheW17VJgHJVt8yyOMzy-', file: 'store-shanghai-1.jpg' },
  storeB:       { id: '1QVr2bZ20-JyyuCB-8KTPMzMx164sXkIJ', file: 'store-shanghai-2.jpg' },
};

export function imgUrl(key, width = 1200) {
  const img = IMAGES[key];
  if (!img) return '';
  if (IMAGE_SOURCE === 'local') return `/images/${img.file}`;
  return `https://lh3.googleusercontent.com/d/${img.id}=w${width}`;
}
