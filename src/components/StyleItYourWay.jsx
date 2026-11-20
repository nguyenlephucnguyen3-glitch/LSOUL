import { useState } from 'react';
import { OCCASIONS, STYLING } from '../data/styling.js';
import { formatPrice, getProduct } from '../data/products.js';
import { track } from '../analytics.js';
import { Link } from '../router.jsx';
import Img from './Img.jsx';
import { ArrowIcon } from './Icons.jsx';

// Real Styling: gợi ý phối đồ theo dịp cho một thiết kế.
export default function StyleItYourWay({ product }) {
  const looks = STYLING[product.id];
  const [occ, setOcc] = useState(OCCASIONS[0].key);
  if (!looks) return null;
  const look = looks[occ];
  const pair = getProduct(look.with);
  const idx = OCCASIONS.findIndex((o) => o.key === occ);
  const img = product.images[idx % product.images.length];

  return (
    <section className="siyw">
      <div className="siyw__head">
        <p className="eyebrow">Real styling</p>
        <h2 className="display">Mặc theo cách của bạn</h2>
        <div className="tabs" role="tablist">
          {OCCASIONS.map((o) => (
            <button
              key={o.key}
              role="tab"
              aria-selected={occ === o.key}
              className={`tab ${occ === o.key ? 'is-on' : ''}`}
              onClick={() => { setOcc(o.key); track('select_content', { content_type: 'styling', item_id: product.id, occasion: o.key }); }}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>

      <div className="siyw__body" key={occ}>
        <figure className="siyw__img"><Img name={img} w={900} alt={`${product.name} — ${OCCASIONS[idx].label}`} /></figure>
        <div className="siyw__text">
          <p className="siyw__num">0{idx + 1} — {OCCASIONS[idx].label}</p>
          <p className="siyw__tip">“{look.tip}”</p>
          <p className="label">Phối cùng</p>
          <ul className="siyw__pieces">
            <li><b>{product.name}</b><span>LSOUL</span></li>
            {look.pieces.map((p) => <li key={p}><b>{p}</b><span>Từ tủ đồ của bạn</span></li>)}
          </ul>
          {pair && (
            <Link to={`/product/${pair.id}`} className="siyw__pair">
              <Img name={pair.images[0]} w={200} alt={pair.name} />
              <span>
                <small>Hoặc thử cùng tinh thần</small>
                <b>{pair.name}</b>
                <small>{formatPrice(pair.price)}</small>
              </span>
              <ArrowIcon width={16} height={16} />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
