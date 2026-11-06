import { useState } from 'react';
import { useStore } from '../context/StoreContext.jsx';
import { Link } from '../router.jsx';
import { BoxIcon, HeadsetIcon, LockIcon, TruckIcon } from './Icons.jsx';

const TRUST = [
  { Icon: LockIcon, title: 'Secure payment', sub: 'Thanh toán bảo mật' },
  { Icon: BoxIcon, title: 'Easy returns', sub: 'Đổi trả trong 14 ngày' },
  { Icon: TruckIcon, title: 'Free shipping', sub: 'Đơn từ 1.500.000₫' },
  { Icon: HeadsetIcon, title: 'Stylist support', sub: 'Tư vấn size 24/7' },
];

export function TrustBar() {
  return (
    <section className="trust">
      {TRUST.map(({ Icon, title, sub }) => (
        <div key={title} className="trust__item">
          <Icon width={26} height={26} />
          <div>
            <p className="trust__title">{title}</p>
            <p className="muted small">{sub}</p>
          </div>
        </div>
      ))}
    </section>
  );
}

export default function Footer() {
  const { notify } = useStore();
  const [email, setEmail] = useState('');

  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__brand">
          <img src="/logo.png" alt="LSOUL" className="footer__logo" width="207" height="77" />
          <p className="muted">Victorian romance, modern independence. Corset, xếp nếp, nơ và ren — cho người phụ nữ tự viết câu chuyện của mình.</p>
        </div>
        <div>
          <p className="eyebrow">Shop</p>
          <Link to="/shop?cat=corset">Corset</Link>
          <Link to="/shop?cat=dresses">Dresses</Link>
          <Link to="/shop?cat=sets">Sets</Link>
          <Link to="/shop?cat=ruffle">Ruffle & Bow</Link>
        </div>
        <div>
          <p className="eyebrow">Maison</p>
          <Link to="/lookbook">Lookbook</Link>
          <Link to="/store">Flagship Shanghai</Link>
          <Link to="/wishlist">Wishlist</Link>
        </div>
        <form
          className="newsletter"
          onSubmit={(e) => {
            e.preventDefault();
            if (!/^\S+@\S+\.\S+$/.test(email)) return notify('Email chưa hợp lệ');
            notify('Cảm ơn bạn — hẹn gặp trong hộp thư.');
            setEmail('');
          }}
        >
          <p className="eyebrow">The Soul Letter</p>
          <p className="muted small">Nhận thông tin bộ sưu tập mới và lookbook trước tiên.</p>
          <div className="newsletter__row">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email của bạn" aria-label="Email" />
            <button className="btn btn--rose" type="submit">Join</button>
          </div>
        </form>
      </div>
      <div className="footer__bottom">
        <span>© 2026 LSOUL Atelier</span>
        <span>Instagram · TikTok · Pinterest</span>
      </div>
    </footer>
  );
}
