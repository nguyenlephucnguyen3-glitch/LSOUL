import { useEffect, useState } from 'react';
import { useStore } from '../context/StoreContext.jsx';
import { formatPrice } from '../data/products.js';
import { ORDER_STEPS, PAYMENTS, SHIPPING, orderStep } from '../data/checkout.js';
import { Link } from '../router.jsx';
import Img from '../components/Img.jsx';
import { ArrowIcon } from '../components/Icons.jsx';
import NotFound from './NotFound.jsx';

// Mã QR minh họa (không quét được) — sinh ổn định theo mã đơn.
function FakeQR({ seed }) {
  const n = 21;
  let h = [...seed].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
  const rnd = () => ((h = (h * 1103515245 + 12345) >>> 0) / 2 ** 32);
  const finder = (x, y) => [[0, 0], [n - 7, 0], [0, n - 7]].some(([fx, fy]) => x >= fx && x < fx + 7 && y >= fy && y < fy + 7);
  const cells = [];
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) if (!finder(x, y) && rnd() > 0.5) cells.push(<rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" />);
  const eye = (x, y) => (
    <g key={`${x}${y}`}>
      <rect x={x} y={y} width="7" height="7" />
      <rect x={x + 1} y={y + 1} width="5" height="5" fill="#fff" />
      <rect x={x + 2} y={y + 2} width="3" height="3" />
    </g>
  );
  return (
    <svg viewBox={`-2 -2 ${n + 4} ${n + 4}`} className="od-qr" shapeRendering="crispEdges" aria-label="Mã QR minh họa">
      <rect x="-2" y="-2" width={n + 4} height={n + 4} fill="#fff" />
      <g fill="#0b0b0b">{cells}{eye(0, 0)}{eye(n - 7, 0)}{eye(0, n - 7)}</g>
    </svg>
  );
}

const fmtDate = (ts) => new Date(ts).toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' });
const fmtDay = (d) => d.toLocaleDateString('vi-VN', { weekday: 'long', day: '2-digit', month: '2-digit' });

function eta(order) {
  const d = new Date(order.createdAt);
  if (order.shipping === 'express') return 'Trong 2 giờ tới';
  d.setDate(d.getDate() + 3);
  return fmtDay(d);
}

export default function Order({ id }) {
  const { orders, cancelOrder, notify } = useStore();
  const order = orders.find((o) => o.id === id);
  const [, tick] = useState(0);
  const [paid, setPaid] = useState(false);

  // Cập nhật trạng thái giả lập mỗi 15 giây
  useEffect(() => {
    const t = setInterval(() => tick((n) => n + 1), 15000);
    return () => clearInterval(t);
  }, []);

  if (!order) return <NotFound />;
  const step = orderStep(order);
  const pay = PAYMENTS.find((p) => p.key === order.payment);
  const ship = SHIPPING.find((s) => s.key === order.shipping);
  const c = order.customer;
  const count = order.items.reduce((s, i) => s + i.qty, 0);
  const progress = step < 0 ? 0 : (step / (ORDER_STEPS.length - 1)) * 100;
  const needsTransfer = order.payment === 'bank' && !order.cancelled && step < 1 && !paid;

  const copy = (text) => {
    navigator.clipboard?.writeText(text).then(() => notify(`Đã sao chép ${text}`), () => {});
  };

  return (
    <main className="page od">
      {/* ---------- HERO ---------- */}
      <section className="od-hero">
        <div className="od-hero__copy">
          <p className="od-eyebrow">{order.cancelled ? 'Đã hủy' : `Đơn hàng · ${fmtDate(order.createdAt)}`}</p>
          <h1 className="od-title">
            {order.cancelled ? <>Order<br /><em>cancelled.</em></> : <>Merci<br /><em>beaucoup.</em></>}
          </h1>
          <p className="od-lede">
            {order.cancelled
              ? 'Đơn hàng này đã được hủy. Hy vọng sớm gặp lại bạn ở bộ sưu tập tiếp theo.'
              : 'Cảm ơn bạn đã chọn LSOUL. Đơn hàng của bạn đang được chuẩn bị tại atelier.'}
          </p>
          <button className="od-code" onClick={() => copy(order.id)} title="Sao chép mã đơn">
            <span>Mã đơn</span>
            <b>{order.id}</b>
          </button>
        </div>
        <div className="od-hero__media">
          {order.items.slice(0, 2).map((it, i) => (
            <Img key={it.key} name={it.image} w={1100} alt={it.name} priority className={`od-hero__img od-hero__img--${i}`} />
          ))}
          {!order.cancelled && <span className="od-stamp">{ORDER_STEPS[Math.max(step, 0)]}</span>}
        </div>
      </section>

      {/* ---------- BODY ---------- */}
      <div className="od-body">
        <div className="od-main">
          {!order.cancelled && (
            <section className="od-section">
              <div className="od-section__head">
                <h2>Hành trình đơn hàng</h2>
                <p><span>Dự kiến giao</span> {eta(order)}</p>
              </div>
              <div className="od-track" style={{ '--p': `${progress}%` }}>
                <div className="od-track__line"><span /></div>
                <ol>
                  {ORDER_STEPS.map((s, i) => (
                    <li key={s} className={i < step ? 'is-done' : i === step ? 'is-on' : ''}>
                      <i>{String(i + 1).padStart(2, '0')}</i>
                      <span>{s}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <p className="od-hint">Bản demo · trạng thái tự chuyển bước sau mỗi 2 phút</p>
            </section>
          )}

          {needsTransfer && (
            <section className="od-pay">
              <FakeQR seed={order.id} />
              <div className="od-pay__info">
                <p className="od-eyebrow">Bước cuối</p>
                <h2>Chuyển khoản để hoàn tất</h2>
                <dl>
                  <div><dt>Ngân hàng</dt><dd>LSOUL Demo Bank</dd></div>
                  <div><dt>Chủ tài khoản</dt><dd>LSOUL ATELIER</dd></div>
                  <div><dt>Số tiền</dt><dd className="od-amount">{formatPrice(order.total)}</dd></div>
                  <div><dt>Nội dung</dt><dd><button className="od-copy" onClick={() => copy(order.id)}>{order.id} <small>Sao chép</small></button></dd></div>
                </dl>
                <button className="btn btn--sm" onClick={() => { setPaid(true); notify('Đã ghi nhận thanh toán (giả lập)'); }}>Tôi đã chuyển khoản</button>
                <p className="od-hint">QR và tài khoản chỉ để minh họa — không chuyển tiền thật.</p>
              </div>
            </section>
          )}

          {order.payment === 'momo' && !order.cancelled && step < 1 && (
            <p className="od-note"><span className="pay-badge pay-badge--momo">MoMo</span> Thanh toán qua ví MoMo đã được giả lập thành công.</p>
          )}

          <section className="od-section">
            <div className="od-section__head"><h2>Chi tiết giao nhận</h2></div>
            <div className="od-details">
              <div>
                <p className="od-label">Người nhận</p>
                <p>{c.name}</p>
                <p className="od-muted">{c.phone}</p>
              </div>
              <div>
                <p className="od-label">Địa chỉ</p>
                <p>{c.address}</p>
                <p className="od-muted">{c.district}, {c.city}</p>
              </div>
              <div>
                <p className="od-label">Giao hàng</p>
                <p>{ship?.label}</p>
                <p className="od-muted">{ship?.note}</p>
              </div>
              <div>
                <p className="od-label">Thanh toán</p>
                <p>{pay?.label}</p>
                <p className="od-muted">{order.payment === 'bank' ? (paid || step >= 1 ? 'Đã nhận thanh toán' : 'Chờ chuyển khoản') : order.payment === 'momo' ? 'Đã thanh toán' : 'Thanh toán khi nhận'}</p>
              </div>
            </div>
            {(c.note || order.giftWrap) && (
              <div className="od-extras">
                {order.giftWrap && <p><span className="od-label">Gói quà</span> Hộp LSOUL kèm thiệp viết tay</p>}
                {c.note && <p><span className="od-label">Ghi chú</span> {c.note}</p>}
              </div>
            )}
          </section>

          <div className="od-actions">
            <Link to="/shop" className="btn">Tiếp tục mua sắm <ArrowIcon width={16} height={16} /></Link>
            <Link to="/orders" className="btn btn--outline">Đơn hàng của tôi</Link>
            {!order.cancelled && step < 2 && (
              <button className="link-btn" onClick={() => cancelOrder(order.id)}>Hủy đơn hàng</button>
            )}
          </div>
        </div>

        {/* ---------- RECEIPT ---------- */}
        <aside className="od-receipt">
          <div className="od-receipt__head">
            <img src="/logo.png" alt="LSOUL" className="od-receipt__logo" width="207" height="77" />
            <span>{count} sản phẩm</span>
          </div>
          <ul>
            {order.items.map((l) => (
              <li key={l.key}>
                <Link to={`/product/${l.id}`} className="od-receipt__img"><Img name={l.image} w={240} alt={l.name} /></Link>
                <div>
                  <p className="od-receipt__name">{l.name}</p>
                  <p className="od-muted">{l.color} · Size {l.size} · SL {l.qty}</p>
                </div>
                <p className="od-receipt__price">{formatPrice(l.price * l.qty)}</p>
              </li>
            ))}
          </ul>
          <dl className="od-totals">
            <div><dt>Tạm tính</dt><dd>{formatPrice(order.subtotal)}</dd></div>
            {order.discount > 0 && <div className="is-rose"><dt>Ưu đãi {order.voucher}</dt><dd>−{formatPrice(order.discount)}</dd></div>}
            <div><dt>Giao hàng</dt><dd>{order.ship === 0 ? 'Miễn phí' : formatPrice(order.ship)}</dd></div>
            {order.gift > 0 && <div><dt>Gói quà</dt><dd>{formatPrice(order.gift)}</dd></div>}
          </dl>
          <div className="od-grand">
            <span>Tổng cộng</span>
            <b>{formatPrice(order.total)}</b>
          </div>
          <p className="od-receipt__foot">Cảm ơn bạn đã chọn LSOUL.</p>
        </aside>
      </div>
    </main>
  );
}
