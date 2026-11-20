// UGC (User-Generated Content): ảnh khách hàng mặc đồ LSOUL.
// Bản demo lưu bài đăng trong trình duyệt (localStorage). Khi có backend, thay load/save bằng API.
import { useEffect, useState } from 'react';

const KEY = 'lsoul-ugc';
const LIKES = 'lsoul-ugc-likes';
const MAX_POSTS = 24;

// Bài mẫu từ chính LSOUL để gallery không trống khi chưa có ai đăng.
export const BRAND_POSTS = [
  { id: 'b1', img: 'rouge1', productId: 'rouge-corset', caption: 'Đỏ cho những ngày muốn được nhìn thấy.' },
  { id: 'b2', img: 'aqua1', productId: 'aqua-cascade', caption: 'Bèo tầng, chuyển động theo từng bước.' },
  { id: 'b3', img: 'gingham1', productId: 'gingham-halter', caption: 'Caro đỏ, kiểu picnic của riêng bạn.' },
  { id: 'b4', img: 'cloud3', productId: 'cloud-puff', caption: 'Bồng bềnh mà vẫn có cấu trúc.' },
  { id: 'b5', img: 'sand1', productId: 'sand-lace', caption: 'Ren viền cho một buổi chiều chậm.' },
  { id: 'b6', img: 'noir1', productId: 'noir-bustier', caption: 'Corset đen, không cần thêm gì nữa.' },
].map((p) => ({ ...p, handle: '@lsoul', brand: true }));

function read(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}
function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false; // hết dung lượng hoặc trình duyệt chặn storage
  }
}

const listeners = new Set();
const emit = () => listeners.forEach((fn) => fn());

export function useUgc() {
  const [posts, setPosts] = useState(() => read(KEY, []));
  const [likes, setLikes] = useState(() => read(LIKES, {}));
  useEffect(() => {
    const sync = () => {
      setPosts(read(KEY, []));
      setLikes(read(LIKES, {}));
    };
    listeners.add(sync);
    return () => listeners.delete(sync);
  }, []);

  const addPost = (post) => {
    const next = [{ ...post, id: `u${Date.now()}`, createdAt: Date.now() }, ...read(KEY, [])].slice(0, MAX_POSTS);
    const ok = write(KEY, next);
    emit();
    return ok;
  };

  const toggleLike = (id) => {
    const cur = read(LIKES, {});
    cur[id] = !cur[id];
    write(LIKES, cur);
    emit();
  };

  const all = [...posts, ...BRAND_POSTS];
  return { posts, all, likes, addPost, toggleLike };
}

// Thu nhỏ ảnh trước khi lưu để không vượt dung lượng localStorage.
export function compressImage(file, max = 900) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, max / Math.max(img.width, img.height));
      const c = document.createElement('canvas');
      c.width = Math.round(img.width * scale);
      c.height = Math.round(img.height * scale);
      c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
      URL.revokeObjectURL(url);
      resolve(c.toDataURL('image/jpeg', 0.8));
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Không đọc được ảnh'));
    };
    img.src = url;
  });
}
