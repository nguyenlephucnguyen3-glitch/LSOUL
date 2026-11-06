import { useEffect, useState } from 'react';
import { PRODUCTS, SIZES, formatPrice, getProduct } from '../data/products.js';
import { useStore } from '../context/StoreContext.jsx';
import { Link } from '../router.jsx';
import Img from '../components/Img.jsx';
import ProductCard from '../components/ProductCard.jsx';
import { ArrowIcon, CloseIcon, HeartIcon, MinusIcon, PlusIcon } from '../components/Icons.jsx';
import NotFound from './NotFound.jsx';

const SIZE_TABLE = [
  ['XS', '78–81', '60–62', '84–87'],
  ['S', '82–85', '63–66', '88–91'],
  ['M', '86–89', '67–70', '92–95'],
  ['L', '90–94', '71–75', '96–100'],
];

function Accordion({ title, children, open: initial = false }) {
  const [open, setOpen] = useState(initial);
  return (
    <div className={`acc ${open ? 'is-open' : ''}`}>
      <button className="acc__head" onClick={() => setOpen(!open)} aria-expanded={open}>
        {title} {open ? <MinusIcon width={16} height={16} /> : <PlusIcon width={16} height={16} />}
      </button>
      <div className="acc__body"><div>{children}</div></div>
    </div>
  );
}

export default function Product({ id }) {
  const product = getProduct(id);
  const { addToCart, wishlist, toggleWish, notify } = useStore();
  const [active, setActive] = useState(0);
  const [size, setSize] = useState(null);
  const [color, setColor] = useState(product?.colors[0].name);
  const [qty, setQty] = useState(1);
  const [guide, setGuide] = useState(false);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    setActive(0); setSize(null); setQty(1); setColor(product?.colors[0].name);
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!product) return <NotFound />;
  const liked = wishlist.includes(product.id);
  const related = PRODUCTS.filter((p) => p.id !== product.id && p.category === product.category)
    .concat(PRODUCTS.filter((p) => p.id !== product.id && p.category !== product.category))
    .slice(0, 4);

  const add = () => {
    if (!size) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return notify('Vui lòng chọn size');
    }
    addToCart(product.id, size, color, qty);
  };

  return (
    <main className="page">
      <nav className="crumbs small">
        <Link to="/">Home</Link> / <Link to={`/shop?cat=${product.category}`}>{product.category}</Link> / <span>{product.name}</span>
      </nav>

      <section className="pdp">
        <div className="pdp__gallery">
          <div className="pdp__thumbs">
            {product.images.map((im, i) => (
              <button key={im} className={`pdp__thumb ${active === i ? 'is-on' : ''}`} onClick={() => setActive(i)} aria-label={`Ảnh ${i + 1}`}>
                <Img name={im} w={200} alt="" />
              </button>
            ))}
          </div>
          <div className="pdp__main">
            <Img key={product.images[active]} name={product.images[active]} w={1400} alt={product.name} priority className="pdp__img" />
            <div className="pdp__dots">
              {product.images.map((_, i) => <span key={i} className={active === i ? 'is-on' : ''} onClick={() => setActive(i)} />)}
            </div>
          </div>
        </div>

        <div className="pdp__info">
          {product.tag && <p className="eyebrow">{product.tag}</p>}
          <h1 className="display-sm">{product.name}</h1>
          <p className="pdp__price">{formatPrice(product.price)}</p>
          <p className="muted">{product.desc}</p>

          <div className="pdp__field">
            <p className="label">Màu: <b>{color}</b></p>
            <div className="swatches swatches--lg">
              {product.colors.map((c) => (
                <button key={c.name} className={`swatch ${color === c.name ? 'is-on' : ''}`} style={{ '--sw': c.hex }} aria-label={c.name} onClick={() => setColor(c.name)} />
              ))}
            </div>
          </div>

          <div className="pdp__field">
            <div className="row-between">
              <p className="label">Size: <b>{size || '—'}</b></p>
              <button className="link-btn small" onClick={() => setGuide(true)}>Bảng size</button>
            </div>
            <div className={`sizes ${shake ? 'shake' : ''}`}>
              {SIZES.map((s) => (
                <button key={s} className={`size ${size === s ? 'is-on' : ''}`} onClick={() => setSize(s)}>{s}</button>
              ))}
            </div>
          </div>

          <div className="pdp__buy">
            <div className="qty qty--lg">
              <button aria-label="Giảm" onClick={() => setQty(Math.max(1, qty - 1))}><MinusIcon width={14} height={14} /></button>
              <span>{qty}</span>
              <button aria-label="Tăng" onClick={() => setQty(qty + 1)}><PlusIcon width={14} height={14} /></button>
            </div>
            <button className="btn btn--grow" onClick={add}>Add to bag <ArrowIcon width={16} height={16} /></button>
            <button className={`icon-btn icon-btn--box ${liked ? 'is-on' : ''}`} aria-label="Wishlist" onClick={() => toggleWish(product.id)}>
              <HeartIcon filled={liked} />
            </button>
          </div>

          <Accordion title="Chi tiết thiết kế" open>
            <ul className="bullets">{product.details.map((d) => <li key={d}>{d}</li>)}</ul>
          </Accordion>
          <Accordion title="Giao hàng & đổi trả">
            <p className="muted">Giao nội thành 1–2 ngày, toàn quốc 2–4 ngày. Miễn phí cho đơn từ 1.500.000₫. Đổi size trong 14 ngày khi sản phẩm còn nguyên tag.</p>
          </Accordion>
          <Accordion title="Gợi ý chọn size corset">
            <p className="muted">Corset LSOUL ôm sát eo. Nếu số đo eo nằm giữa hai size, hãy chọn size lớn hơn — phần dây đan cho phép siết thêm khoảng 3cm.</p>
          </Accordion>
        </div>
      </section>

      <section className="section">
        <div className="section__head">
          <div>
            <p className="eyebrow">Complete the look</p>
            <h2 className="display">You may also love</h2>
          </div>
        </div>
        <div className="grid-4">
          {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </section>

      {guide && (
        <div className="modal" onClick={() => setGuide(false)}>
          <div className="modal__box" onClick={(e) => e.stopPropagation()} role="dialog" aria-label="Bảng size">
            <div className="row-between">
              <h3 className="display-sm">Size guide</h3>
              <button className="icon-btn" aria-label="Đóng" onClick={() => setGuide(false)}><CloseIcon /></button>
            </div>
            <table className="size-table">
              <thead><tr><th>Size</th><th>Ngực (cm)</th><th>Eo (cm)</th><th>Hông (cm)</th></tr></thead>
              <tbody>
                {SIZE_TABLE.map((r) => (
                  <tr key={r[0]} className={size === r[0] ? 'is-on' : ''} onClick={() => { setSize(r[0]); setGuide(false); }}>
                    {r.map((c, i) => <td key={i}>{c}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="muted small">Bấm vào một hàng để chọn size đó.</p>
          </div>
        </div>
      )}
    </main>
  );
}
