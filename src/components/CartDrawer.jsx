import { useEffect } from 'react';
import { useStore } from '../context/StoreContext.jsx';
import { formatPrice } from '../data/products.js';
import { Link, navigate } from '../router.jsx';
import Img from './Img.jsx';
import { ArrowIcon, CloseIcon, MinusIcon, PlusIcon } from './Icons.jsx';

const FREE_SHIP = 1500000;

export default function CartDrawer() {
  const { lines, subtotal, cartOpen, setCartOpen, updateQty } = useStore();

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setCartOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [setCartOpen]);

  const left = Math.max(FREE_SHIP - subtotal, 0);
  const progress = Math.min(subtotal / FREE_SHIP, 1) * 100;

  return (
    <>
      <div className={`scrim ${cartOpen ? 'is-open' : ''}`} onClick={() => setCartOpen(false)} />
      <aside className={`drawer ${cartOpen ? 'is-open' : ''}`} aria-label="Giỏ hàng" aria-hidden={!cartOpen}>
        <div className="drawer__head">
          <h2>Your bag</h2>
          <button className="icon-btn" aria-label="Đóng giỏ hàng" onClick={() => setCartOpen(false)}><CloseIcon /></button>
        </div>

        {lines.length === 0 ? (
          <div className="drawer__empty">
            <p className="eyebrow">Empty</p>
            <h3 className="display-sm">Giỏ hàng đang trống.</h3>
            <Link to="/shop" className="btn" onClick={() => setCartOpen(false)}>Discover the edit <ArrowIcon width={16} height={16} /></Link>
          </div>
        ) : (
          <>
            <div className="ship-bar">
              <p>{left > 0 ? <>Thêm <b>{formatPrice(left)}</b> để được miễn phí giao hàng</> : 'Bạn được miễn phí giao hàng'}</p>
              <div className="ship-bar__track"><span style={{ width: `${progress}%` }} /></div>
            </div>
            <ul className="drawer__list">
              {lines.map((l) => (
                <li key={l.key} className="line">
                  <Link to={`/product/${l.id}`} onClick={() => setCartOpen(false)} className="line__img">
                    <Img name={l.product.images[0]} w={240} alt={l.product.name} />
                  </Link>
                  <div className="line__info">
                    <p className="line__name">{l.product.name}</p>
                    <p className="muted small">{l.color} · Size {l.size}</p>
                    <div className="qty">
                      <button aria-label="Giảm" onClick={() => updateQty(l.key, l.qty - 1)}><MinusIcon width={14} height={14} /></button>
                      <span>{l.qty}</span>
                      <button aria-label="Tăng" onClick={() => updateQty(l.key, l.qty + 1)}><PlusIcon width={14} height={14} /></button>
                    </div>
                  </div>
                  <div className="line__right">
                    <p>{formatPrice(l.product.price * l.qty)}</p>
                    <button className="link-btn small" onClick={() => updateQty(l.key, 0)}>Xóa</button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="drawer__foot">
              <div className="row-between"><span>Tạm tính</span><b>{formatPrice(subtotal)}</b></div>
              <p className="muted small">Phí giao hàng tính ở bước thanh toán.</p>
              <button className="btn btn--block" onClick={() => { setCartOpen(false); navigate('/checkout'); }}>
                Checkout <ArrowIcon width={16} height={16} />
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
