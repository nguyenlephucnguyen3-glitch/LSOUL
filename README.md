# LSOUL — Website (React + JavaScript)

Web thời trang LSOUL theo tinh thần "Victorian romance, modern independence": tông Jet Black / Ivory, điểm nhấn Ash Rose & Metallic Silver, tiêu đề Playfair Display, nội dung Inter.

## Chạy web

```bash
npm install
npm run dev
```

Mở http://localhost:5173

## Ảnh

Ảnh lấy từ thư mục Google Drive "Lsoul_ Truyền thông trực tuyến". Mặc định web tải ảnh trực tiếp từ Drive (cần internet và thư mục để chế độ chia sẻ công khai).

Muốn lưu ảnh vào project để chạy offline:

```bash
npm run images
```

Lệnh này tải 32 ảnh vào `public/images/` rồi tự chuyển web sang dùng ảnh local (`src/data/image-source.js`).

## Tính năng UI

- Trang chủ: hero, The Edit (lọc theo tab), banner tối, lookbook bất đối xứng, flagship store, trust bar
- Shop: lọc danh mục, sắp xếp giá, lưới so le
- Trang sản phẩm: gallery, chọn màu / size (bảng size dạng modal), số lượng, accordion, gợi ý sản phẩm
- Giỏ hàng dạng drawer (lưu localStorage), thanh tiến độ freeship, checkout demo
- Wishlist, tìm kiếm toàn màn hình, menu mobile, toast thông báo
- Lookbook có lightbox, trang Flagship Shanghai
- Chuyển trang mượt bằng View Transitions API, tôn trọng `prefers-reduced-motion`

## Cấu trúc

```
src/
  data/        products.js (sản phẩm), images.js (ID ảnh Drive)
  context/     StoreContext.jsx (giỏ hàng, wishlist, toast)
  components/  Header, Footer, ProductCard, CartDrawer, SearchOverlay, Img, Icons, Toast
  pages/       Home, Shop, Product, Lookbook, Store, Wishlist, NotFound
  router.jsx   router hash nhỏ, không cần thư viện
  styles.css   design tokens + toàn bộ giao diện
```

## Đo lường & SEO (GA4 + Search Console)

Mọi cấu hình nằm trong file `.env` ở thư mục gốc. Sửa xong thì tắt và chạy lại `npm run dev`.

| Biến | Lấy ở đâu |
|---|---|
| `VITE_GA_ID` | GA4 → Admin → Data streams → Measurement ID (`G-XXXXXXXXXX`) |
| `VITE_SITE_URL` | Tên miền sau khi deploy, ví dụ `https://lsoul.vercel.app` |
| `VITE_GSC_VERIFICATION` | Search Console → xác minh bằng thẻ HTML → chỉ lấy phần `content="..."` |

- Chưa có `VITE_GA_ID` thì các sự kiện được in ra Console (F12) với nhãn `[GA4 · chưa có ID]` để kiểm tra.
- Sự kiện đang gửi: `page_view`, `view_item_list`, `view_item`, `select_content` (xem cách phối), `add_to_cart`, `add_to_wishlist`, `begin_checkout`, `purchase`, `search`, `share`, `social_click`, `generate_lead` (đăng ký newsletter), `ugc_submit` (đăng ảnh cộng đồng).
- `npm run seo` tạo `public/sitemap.xml` và `public/robots.txt` (tự chạy trước `npm run build`). Nộp `https://<tên-miền>/sitemap.xml` trong Search Console.

## Big Idea — "Mặc theo cách của bạn"

- `/story` — Brand storytelling: tuyên ngôn, 3 trụ cột, quy trình làm corset.
- Trang sản phẩm — Real styling: 3 cách phối theo dịp (sửa trong `src/data/styling.js`), nút chia sẻ có gắn UTM.
- `/community` — UGC: gallery, đăng ảnh outfit, lọc theo sản phẩm (bản demo lưu ảnh trong trình duyệt).
- Link mạng xã hội: sửa trong `src/data/site.js` (`SOCIAL`).
