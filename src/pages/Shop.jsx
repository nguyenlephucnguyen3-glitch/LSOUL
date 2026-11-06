import { CATEGORIES, PRODUCTS } from '../data/products.js';
import { navigate } from '../router.jsx';
import ProductCard from '../components/ProductCard.jsx';

const SORTS = [
  { key: 'featured', label: 'Nổi bật' },
  { key: 'new', label: 'Mới nhất' },
  { key: 'low', label: 'Giá thấp → cao' },
  { key: 'high', label: 'Giá cao → thấp' },
];

export default function Shop({ params }) {
  const cat = params.cat || 'all';
  const sort = params.sort || 'featured';

  const setParam = (k, v) => {
    const next = new URLSearchParams({ ...params, [k]: v });
    if (k === 'cat' && v === 'all') next.delete('cat');
    navigate(`/shop?${next.toString()}`);
  };

  let list = PRODUCTS.filter((p) => cat === 'all' || p.category === cat);
  if (sort === 'new') list = [...list].sort((a, b) => (b.tag === 'New') - (a.tag === 'New'));
  if (sort === 'low') list = [...list].sort((a, b) => a.price - b.price);
  if (sort === 'high') list = [...list].sort((a, b) => b.price - a.price);

  const title = CATEGORIES.find((c) => c.key === cat)?.label || 'Tất cả';

  return (
    <main className="page">
      <section className="page-hero">
        <p className="eyebrow">{params.sale ? 'Sale' : 'Collection'}</p>
        <h1 className="display">{params.sale ? 'Private Sale' : title === 'Tất cả' ? 'The Collection' : title}</h1>
        {params.sale && <p className="muted">Private sale sẽ mở cho thành viên The Soul Letter. Dưới đây là toàn bộ bộ sưu tập hiện tại.</p>}
      </section>

      <div className="toolbar">
        <div className="tabs">
          {CATEGORIES.map((c) => (
            <button key={c.key} className={`tab ${cat === c.key ? 'is-on' : ''}`} onClick={() => setParam('cat', c.key)}>
              {c.label}
            </button>
          ))}
        </div>
        <label className="select">
          <span className="muted small">Sắp xếp</span>
          <select value={sort} onChange={(e) => setParam('sort', e.target.value)}>
            {SORTS.map((s) => <option key={s.key} value={s.key}>{s.label}</option>)}
          </select>
        </label>
      </div>

      <p className="muted small count">{list.length} thiết kế</p>
      <div className="grid-shop" key={cat + sort}>
        {list.map((p, i) => (
          <div key={p.id} className={i % 5 === 2 ? 'grid-shop__tall' : ''}>
            <ProductCard product={p} index={i} />
          </div>
        ))}
      </div>
    </main>
  );
}
