import { useState } from 'react';
import { Link, navigate } from '../router.jsx';
import { useStore } from '../context/StoreContext.jsx';
import { formatPrice } from '../data/products.js';
import Img from './Img.jsx';
import { ArrowIcon, HeartIcon } from './Icons.jsx';

export default function ProductCard({ product, index = 0 }) {
  const { wishlist, toggleWish, addToCart } = useStore();
  const [color, setColor] = useState(product.colors[0].name);
  const liked = wishlist.includes(product.id);

  return (
    <article className="card reveal" style={{ animationDelay: `${index * 70}ms` }}>
      <div className="card__media">
        <Link to={`/product/${product.id}`} aria-label={product.name}>
          <Img name={product.images[0]} w={700} alt={product.name} className="card__img" />
          {product.images[1] && <Img name={product.images[1]} w={700} alt="" className="card__img card__img--alt" />}
        </Link>
        {product.tag && <span className="card__tag">{product.tag}</span>}
        <button className={`card__heart ${liked ? 'is-on' : ''}`} aria-label="Lưu vào wishlist" onClick={() => toggleWish(product.id)}>
          <HeartIcon filled={liked} width={18} height={18} />
        </button>
        <button className="card__quick" onClick={() => addToCart(product.id, 'S', color)}>
          Quick add · S
        </button>
      </div>
      <div className="card__body">
        <h3 className="card__name"><Link to={`/product/${product.id}`}>{product.name}</Link></h3>
        <p className="card__price">{formatPrice(product.price)}</p>
        <div className="swatches">
          {product.colors.map((c) => (
            <button
              key={c.name}
              className={`swatch ${color === c.name ? 'is-on' : ''}`}
              style={{ '--sw': c.hex }}
              aria-label={c.name}
              title={c.name}
              onClick={() => setColor(c.name)}
            />
          ))}
        </div>
        <button className="btn btn--outline btn--block" onClick={() => navigate(`/product/${product.id}`)}>
          Shop now <ArrowIcon width={16} height={16} />
        </button>
      </div>
    </article>
  );
}
