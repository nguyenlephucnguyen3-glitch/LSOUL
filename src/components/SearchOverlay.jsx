import { useEffect, useRef, useState } from 'react';
import { useStore } from '../context/StoreContext.jsx';
import { PRODUCTS, formatPrice } from '../data/products.js';
import { Link } from '../router.jsx';
import Img from './Img.jsx';
import { CloseIcon, SearchIcon } from './Icons.jsx';

const SUGGEST = ['corset', 'ruffle', 'ivory', 'rouge', 'gingham'];

export default function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useStore();
  const [q, setQ] = useState('');
  const input = useRef();

  useEffect(() => {
    if (searchOpen) setTimeout(() => input.current?.focus(), 200);
    const onKey = (e) => e.key === 'Escape' && setSearchOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [searchOpen, setSearchOpen]);

  const term = q.trim().toLowerCase();
  const results = term
    ? PRODUCTS.filter((p) => `${p.name} ${p.category} ${p.colors.map((c) => c.name).join(' ')}`.toLowerCase().includes(term))
    : [];

  const close = () => setSearchOpen(false);

  return (
    <div className={`search ${searchOpen ? 'is-open' : ''}`} aria-hidden={!searchOpen}>
      <div className="search__inner">
        <div className="search__bar">
          <SearchIcon width={22} height={22} />
          <input ref={input} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Tìm corset, ruffle, ivory…" aria-label="Tìm kiếm sản phẩm" />
          <button className="icon-btn" aria-label="Đóng tìm kiếm" onClick={close}><CloseIcon /></button>
        </div>
        {!term && (
          <div className="search__suggest">
            <span className="eyebrow">Gợi ý</span>
            {SUGGEST.map((s) => <button key={s} className="chip" onClick={() => setQ(s)}>{s}</button>)}
          </div>
        )}
        {term && results.length === 0 && <p className="muted">Không tìm thấy “{q}”. Thử từ khóa khác.</p>}
        <div className="search__results">
          {results.map((p) => (
            <Link key={p.id} to={`/product/${p.id}`} className="search__item" onClick={close}>
              <Img name={p.images[0]} w={300} alt={p.name} />
              <span>{p.name}</span>
              <span className="muted small">{formatPrice(p.price)}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
