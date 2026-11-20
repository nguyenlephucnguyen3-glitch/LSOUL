import { useState } from 'react';
import { getProduct } from '../data/products.js';
import { useUgc } from '../data/ugc.js';
import { SITE, SOCIAL, withUtm } from '../data/site.js';
import { track } from '../analytics.js';
import { useStore } from '../context/StoreContext.jsx';
import { Link } from '../router.jsx';
import Img from './Img.jsx';
import { HeartIcon } from './Icons.jsx';

// Một ô ảnh trong gallery cộng đồng (ảnh của LSOUL hoặc ảnh khách gửi).
export function UgcTile({ post, onOpen }) {
  const { likes, toggleLike } = useUgc();
  const product = getProduct(post.productId);
  const liked = !!likes[post.id];
  return (
    <figure className="ugc-tile">
      <button className="ugc-tile__media" onClick={() => onOpen?.(post)} aria-label={`Xem ảnh của ${post.handle}`}>
        {post.brand ? <Img name={post.img} w={700} alt={post.caption} /> : <img className="img is-loaded" src={post.image} alt={post.caption || post.handle} loading="lazy" />}
      </button>
      <figcaption>
        <div className="ugc-tile__top">
          <span className="ugc-tile__handle">{post.handle}{post.brand && <em>LSOUL</em>}</span>
          <button className={`ugc-like ${liked ? 'is-on' : ''}`} onClick={() => toggleLike(post.id)} aria-label="Thích">
            <HeartIcon filled={liked} width={16} height={16} />
          </button>
        </div>
        {post.caption && <p>{post.caption}</p>}
        {product && <Link to={`/product/${product.id}`} className="ugc-tile__product">Đang mặc · {product.name}</Link>}
      </figcaption>
    </figure>
  );
}

// Nút chia sẻ: link chia sẻ có gắn UTM để đo trên GA4 khách đến từ nền tảng nào.
export function ShareButtons({ path, title, itemId }) {
  const { notify } = useStore();
  const [open, setOpen] = useState(false);
  const share = async (method) => {
    track('share', { method, content_type: 'product', item_id: itemId });
    const url = withUtm(path, method);
    if (method === 'native' && navigator.share) {
      try { await navigator.share({ title, text: `${title} — ${SITE.slogan}`, url }); } catch { /* người dùng hủy */ }
      return;
    }
    if (method === 'facebook') window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank', 'noopener');
    if (method === 'threads') window.open(`https://www.threads.net/intent/post?text=${encodeURIComponent(`${title} ${SITE.hashtag} ${url}`)}`, '_blank', 'noopener');
    if (method === 'copy') {
      navigator.clipboard?.writeText(url).then(() => notify('Đã sao chép link'), () => notify(url));
    }
  };
  return (
    <div className="share">
      <button className="link-btn small" onClick={() => (navigator.share ? share('native') : setOpen(!open))}>Chia sẻ</button>
      {open && (
        <div className="share__menu">
          <button onClick={() => share('facebook')}>Facebook</button>
          <button onClick={() => share('threads')}>Threads</button>
          <button onClick={() => share('copy')}>Sao chép link</button>
        </div>
      )}
    </div>
  );
}

export function SocialLinks({ className = '' }) {
  return (
    <nav className={`social ${className}`} aria-label="Mạng xã hội">
      {SOCIAL.map((s) => (
        <a key={s.key} href={s.url} target="_blank" rel="noopener noreferrer" onClick={() => track('social_click', { platform: s.key })}>
          {s.label}
        </a>
      ))}
    </nav>
  );
}
