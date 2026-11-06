import { useState } from 'react';
import { useStore } from '../context/StoreContext.jsx';
import { formatPrice } from '../data/products.js';
import { CITIES, FREE_SHIP_MIN, GIFT_WRAP_FEE, PAYMENTS, SHIPPING, VOUCHERS, calcTotals } from '../data/checkout.js';
import { Link, navigate } from '../router.jsx';
import Img from '../components/Img.jsx';
import { ArrowIcon, LockIcon } from '../components/Icons.jsx';

const EMPTY = { name: '', phone: '', email: '', address: '', district: '', city: 'TP. Hồ Chí Minh', note: '' };
const SAMPLE = {
  name: 'Nguyễn Minh Anh',
  phone: '0901234567',
  email: 'minhanh@example.com',
  address: '12 Nguyễn Huệ, phường Bến Nghé',
  district: 'Quận 1',
  city: 'TP. Hồ Chí Minh',
  note: 'Gọi trước khi giao giúp mình nhé',
};

function validate(f) {
  const e = {};
  if (f.name.trim().length < 2) e.name = 'Vui lòng nhập họ tên';
  if (!/^(0|\+84)\d{9}$/.test(f.phone.replace(/\s/g, ''))) e.phone = 'Số điện thoại gồm 10 số, bắt đầu bằng 0';
  if (!/^\S+@\S+\.\S+$/.test(f.email)) e.email = 'Email chưa hợp lệ';
  if (f.address.trim().length < 5) e.address = 'Vui lòng nhập số nhà, tên đường';
  if (!f.district.trim()) e.district = 'Vui lòng nhập quận/huyện';
  return e;
}

function Field({ label, name, form, errors, onChange, type = 'text', placeholder, full }) {
  return (
    <label className={`field ${full ? 'field--full' : ''} ${errors[name] ? 'has-error' : ''}`}>
      <span>{label}</span>
      <input type={type} name={name} value={form[name]} onChange={onChange} placeholder={placeholder} />
      {errors[name] && <em>{errors[name]}</em>}
    </label>
  );
}

export default function Checkout() {
  const { lines, subtotal, placeOrder, notify } = useStore();
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [shipping, setShipping] = useState('standard');
  const [payment, setPayment] = useState('cod');
  const [giftWrap, setGiftWrap] = useState(false);
  const [code, setCode] = useState('');
  const [voucher, setVoucher] = useState(null);
  const [voucherMsg, setVoucherMsg] = useState('');
  const [loading, setLoading] = useState(false);

  if (lines.length === 0) {
    return (
      <main className="page empty empty--full">
        <p className="eyebrow">Checkout</p>
        <h1 className="display">Giỏ hàng đang trống.</h1>
        <Link to="/shop" className="btn">Discover the collection <ArrowIcon width={16} height={16} /></Link>
      </main>
    );
  }

  const express = SHIPPING.find((s) => s.key === 'express');
  const expressOk = express.cities.includes(form.city);
  const ship = shipping === 'express' && !expressOk ? 'standard' : shipping;
  const t = calcTotals({ subtotal, shipping: ship, city: form.city, voucher, giftWrap });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const applyVoucher = () => {
    const key = code.trim().toUpperCase();
    const v = VOUCHERS[key];
    if (!v) {
      setVoucher(null);
      return setVoucherMsg('Mã không tồn tại. Thử LSOUL10, WELCOME200 hoặc FREESHIP.');
    }
    if (v.min && subtotal < v.min) {
      setVoucher(null);
      return setVoucherMsg(`Mã ${key} áp dụng cho đơn từ ${formatPrice(v.min)}.`);
    }
    setVoucher(key);
    setVoucherMsg(`Đã áp dụng: ${v.label}`);
  };

  const submit = (e) => {
    e.preventDefault();
    const er = validate(form);
    setErrors(er);
    if (Object.keys(er).length) {
      notify('Vui lòng kiểm tra lại thông tin giao hàng');
      document.querySelector('.field.has-error, .field input')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    setLoading(true);
    // Giả lập thời gian xử lý thanh toán
    setTimeout(() => {
      const id = placeOrder({
        customer: { ...form, phone: form.phone.replace(/\s/g, '') },
        shipping: ship,
        payment,
        giftWrap,
        voucher,
        subtotal,
        ...{ ship: t.ship, discount: t.discount, gift: t.gift, total: t.total },
      });
      navigate(`/order/${id}`);
    }, payment === 'cod' ? 900 : 1600);
  };

  return (
    <main className="page">
      <section className="page-hero page-hero--tight">
        <p className="eyebrow">Checkout</p>
        <h1 className="display">Hoàn tất đơn hàng</h1>
        <ol className="steps">
          <li className="is-done">Giỏ hàng</li>
          <li className="is-on">Thông tin & thanh toán</li>
          <li>Xác nhận</li>
        </ol>
      </section>

      <form className="checkout" onSubmit={submit} noValidate>
        <div className="checkout__main">
          <section className="co-block">
            <div className="row-between">
              <h2 className="co-title">1. Thông tin giao hàng</h2>
              <button type="button" className="link-btn small" onClick={() => { setForm(SAMPLE); setErrors({}); }}>
                Điền thông tin mẫu
              </button>
            </div>
            <div className="fields">
              <Field label="Họ và tên" name="name" form={form} errors={errors} onChange={onChange} placeholder="Nguyễn Văn A" full />
              <Field label="Số điện thoại" name="phone" type="tel" form={form} errors={errors} onChange={onChange} placeholder="09xx xxx xxx" />
              <Field label="Email" name="email" type="email" form={form} errors={errors} onChange={onChange} placeholder="ban@email.com" />
              <Field label="Địa chỉ" name="address" form={form} errors={errors} onChange={onChange} placeholder="Số nhà, tên đường, phường/xã" full />
              <Field label="Quận / Huyện" name="district" form={form} errors={errors} onChange={onChange} placeholder="Quận 1" />
              <label className="field">
                <span>Tỉnh / Thành phố</span>
                <select name="city" value={form.city} onChange={onChange}>
                  {CITIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </label>
              <label className="field field--full">
                <span>Ghi chú (không bắt buộc)</span>
                <textarea name="note" rows={2} value={form.note} onChange={onChange} placeholder="Ví dụ: giao giờ hành chính" />
              </label>
            </div>
          </section>

          <section className="co-block">
            <h2 className="co-title">2. Phương thức giao hàng</h2>
            <div className="options">
              {SHIPPING.map((s) => {
                const disabled = s.cities && !s.cities.includes(form.city);
                const fee = s.key === 'standard' && subtotal >= FREE_SHIP_MIN ? 0 : s.fee;
                return (
                  <label key={s.key} className={`option ${ship === s.key ? 'is-on' : ''} ${disabled ? 'is-disabled' : ''}`}>
                    <input type="radio" name="shipping" checked={ship === s.key} disabled={disabled} onChange={() => setShipping(s.key)} />
                    <span className="option__text"><b>{s.label}</b><small>{disabled ? 'Không hỗ trợ khu vực này' : s.note}</small></span>
                    <span className="option__price">{fee === 0 ? 'Miễn phí' : formatPrice(fee)}</span>
                  </label>
                );
              })}
            </div>
            <label className="check">
              <input type="checkbox" checked={giftWrap} onChange={(e) => setGiftWrap(e.target.checked)} />
              <span>Gói quà trong hộp LSOUL kèm thiệp viết tay (+{formatPrice(GIFT_WRAP_FEE)})</span>
            </label>
          </section>

          <section className="co-block">
            <h2 className="co-title">3. Thanh toán</h2>
            <div className="options">
              {PAYMENTS.map((p) => (
                <label key={p.key} className={`option ${payment === p.key ? 'is-on' : ''}`}>
                  <input type="radio" name="payment" checked={payment === p.key} onChange={() => setPayment(p.key)} />
                  <span className="option__text"><b>{p.label}</b><small>{p.note}</small></span>
                  <span className={`pay-badge pay-badge--${p.key}`}>{p.key === 'cod' ? 'COD' : p.key === 'bank' ? 'QR' : 'MoMo'}</span>
                </label>
              ))}
            </div>
            <p className="muted small secure"><LockIcon width={14} height={14} /> Đây là bản demo — không có giao dịch thật nào được thực hiện.</p>
          </section>
        </div>

        <aside className="checkout__side">
          <div className="summary">
            <h2 className="co-title">Đơn hàng ({lines.reduce((s, l) => s + l.qty, 0)})</h2>
            <ul className="summary__list">
              {lines.map((l) => (
                <li key={l.key}>
                  <span className="summary__img">
                    <Img name={l.product.images[0]} w={200} alt={l.product.name} />
                    <i>{l.qty}</i>
                  </span>
                  <span className="summary__name">{l.product.name}<small>{l.color} · Size {l.size}</small></span>
                  <span>{formatPrice(l.product.price * l.qty)}</span>
                </li>
              ))}
            </ul>

            <div className="voucher">
              <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Mã giảm giá" aria-label="Mã giảm giá"
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); applyVoucher(); } }} />
              <button type="button" className="btn btn--outline btn--sm" onClick={applyVoucher}>Áp dụng</button>
            </div>
            {voucherMsg && <p className={`small voucher__msg ${voucher ? 'is-ok' : ''}`}>{voucherMsg}</p>}

            <dl className="totals">
              <div><dt>Tạm tính</dt><dd>{formatPrice(subtotal)}</dd></div>
              {t.discount > 0 && <div className="is-rose"><dt>Giảm giá ({voucher})</dt><dd>−{formatPrice(t.discount)}</dd></div>}
              <div><dt>Giao hàng · {t.method.label}</dt><dd>{t.ship === 0 ? 'Miễn phí' : formatPrice(t.ship)}</dd></div>
              {t.gift > 0 && <div><dt>Gói quà</dt><dd>{formatPrice(t.gift)}</dd></div>}
              <div className="totals__grand"><dt>Tổng cộng</dt><dd>{formatPrice(t.total)}</dd></div>
            </dl>

            <button className="btn btn--block" type="submit" disabled={loading}>
              {loading ? <><span className="spinner" /> Đang xử lý…</> : <>Đặt hàng · {formatPrice(t.total)}</>}
            </button>
            <p className="muted small center">Bằng việc đặt hàng, bạn đồng ý với điều khoản mua hàng của LSOUL.</p>
          </div>
        </aside>
      </form>
    </main>
  );
}
