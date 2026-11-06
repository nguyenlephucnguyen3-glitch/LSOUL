import { useStore } from '../context/StoreContext.jsx';
import { formatPrice } from '../data/products.js';
import { ORDER_STEPS, orderStep } from '../data/checkout.js';
import { Link } from '../router.jsx';
import Img from '../components/Img.jsx';
import { ArrowIcon } from '../components/Icons.jsx';

export default function Orders() {
  const { orders } = useStore();
  return (
    <main className="page">
      <section className="page-hero">
        <p className="eyebrow">Account</p>
        <h1 className="display">Đơn hàng của tôi</h1>
      </section>
      {orders.length === 0 ? (
        <div className="empty">
          <p className="muted">Bạn chưa có đơn hàng nào.</p>
          <Link to="/shop" className="btn">Discover the collection</Link>
        </div>
      ) : (
        <ul className="orders">
          {orders.map((o) => {
            const step = orderStep(o);
            return (
              <li key={o.id}>
                <Link to={`/order/${o.id}`} className="orders__row">
                  <span className="orders__imgs">
                    {o.items.slice(0, 3).map((i) => <Img key={i.key} name={i.image} w={160} alt={i.name} />)}
                  </span>
                  <span className="orders__info">
                    <b>{o.id}</b>
                    <small className="muted">{new Date(o.createdAt).toLocaleDateString('vi-VN')} · {o.items.reduce((s, i) => s + i.qty, 0)} sản phẩm</small>
                  </span>
                  <span className={`status ${o.cancelled ? 'status--off' : step === ORDER_STEPS.length - 1 ? 'status--done' : ''}`}>
                    {o.cancelled ? 'Đã hủy' : ORDER_STEPS[step]}
                  </span>
                  <span className="orders__total">{formatPrice(o.total)}</span>
                  <ArrowIcon width={16} height={16} />
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}
