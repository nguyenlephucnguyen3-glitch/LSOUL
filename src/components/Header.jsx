import { useEffect, useState } from 'react';
import { Link } from '../router.jsx';
import { useStore } from '../context/StoreContext.jsx';
import { BagIcon, CloseIcon, HeartIcon, MenuIcon, SearchIcon, UserIcon } from './Icons.jsx';

const NAV = [
  { to: '/shop?sort=new', label: 'New In' },
  { to: '/shop?cat=corset', label: 'Corset' },
  { to: '/shop?cat=dresses', label: 'Dresses' },
  { to: '/shop?cat=sets', label: 'Sets' },
  { to: '/lookbook', label: 'Lookbook' },
  { to: '/store', label: 'Flagship' },
  { to: '/shop?sale=1', label: 'Sale', accent: true },
];

export default function Header({ path }) {
  const { count, wishlist, setCartOpen, setSearchOpen } = useStore();
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <div className="announce">Miễn phí giao hàng cho đơn từ 1.500.000₫ · Đổi trả trong 14 ngày</div>
      <header className={`header ${scrolled ? 'is-scrolled' : ''}`}>
        <button className="icon-btn header__menu" aria-label="Mở menu" onClick={() => setMenu(true)}>
          <MenuIcon />
        </button>
        <Link to="/" className="logo" aria-label="LSOUL trang chủ">
          <img src="/logo.png" alt="LSOUL" className="logo__img" width="207" height="77" />
        </Link>
        <nav className="nav" aria-label="Danh mục">
          {NAV.map((n) => (
            <Link key={n.label} to={n.to} className={`nav__link ${n.accent ? 'nav__link--accent' : ''} ${path === n.to.split('?')[0] && n.to === '/lookbook' ? 'is-active' : ''}`}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="header__actions">
          <button className="icon-btn" aria-label="Tìm kiếm" onClick={() => setSearchOpen(true)}><SearchIcon /></button>
          <Link to="/orders" className="icon-btn hide-sm" aria-label="Đơn hàng của tôi"><UserIcon /></Link>
          <Link to="/wishlist" className="icon-btn hide-sm" aria-label="Wishlist">
            <HeartIcon />
            {wishlist.length > 0 && <span className="badge">{wishlist.length}</span>}
          </Link>
          <button className="icon-btn" aria-label="Giỏ hàng" onClick={() => setCartOpen(true)}>
            <BagIcon />
            {count > 0 && <span className="badge">{count}</span>}
          </button>
        </div>
      </header>

      <div className={`mobile-menu ${menu ? 'is-open' : ''}`} aria-hidden={!menu}>
        <button className="icon-btn mobile-menu__close" aria-label="Đóng menu" onClick={() => setMenu(false)}><CloseIcon /></button>
        <nav>
          {NAV.map((n, i) => (
            <Link key={n.label} to={n.to} onClick={() => setMenu(false)} style={{ transitionDelay: `${80 + i * 50}ms` }}>
              {n.label}
            </Link>
          ))}
          <Link to="/wishlist" onClick={() => setMenu(false)}>Wishlist</Link>
          <Link to="/orders" onClick={() => setMenu(false)}>Đơn hàng</Link>
        </nav>
      </div>
    </>
  );
}
