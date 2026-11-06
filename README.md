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
