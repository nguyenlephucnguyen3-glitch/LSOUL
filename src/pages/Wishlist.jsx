import { useStore } from '../context/StoreContext.jsx';
import { PRODUCTS } from '../data/products.js';
import { Link } from '../router.jsx';
import ProductCard from '../components/ProductCard.jsx';

export default function Wishlist() {
  const { wishlist } = useStore();
  const items = PRODUCTS.filter((p) => wishlist.includes(p.id));
  return (
    <main className="page">
      <section className="page-hero">
        <p className="eyebrow">Saved</p>
        <h1 className="display">Wishlist</h1>
      </section>
      {items.length === 0 ? (
        <div className="empty">
          <p className="muted">Bạn chưa lưu thiết kế nào. Bấm biểu tượng trái tim trên sản phẩm để lưu.</p>
          <Link to="/shop" className="btn">Discover the collection</Link>
        </div>
      ) : (
        <div className="grid-4">{items.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}</div>
      )}
    </main>
  );
}
