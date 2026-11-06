import { useState } from 'react';
import { Link, navigate } from '../router.jsx';
import { PRODUCTS } from '../data/products.js';
import Img from '../components/Img.jsx';
import ProductCard from '../components/ProductCard.jsx';
import { TrustBar } from '../components/Footer.jsx';
import { ArrowIcon, FeatherIcon, GlobeIcon, HangerIcon, Sparkle } from '../components/Icons.jsx';

const TABS = [
  { key: 'all', label: 'All' },
  { key: 'corset', label: 'Corset' },
  { key: 'dresses', label: 'Dresses' },
  { key: 'ruffle', label: 'Ruffle' },
];

export default function Home() {
  const [tab, setTab] = useState('all');
  const edit = PRODUCTS.filter((p) => tab === 'all' || p.category === tab).slice(0, 4);

  return (
    <main className="page">
      {/* HERO */}
      <section className="hero">
        <div className="hero__copy">
          <p className="eyebrow reveal">New collection · AW26</p>
          <h1 className="hero__title">
            <span className="line-mask"><span>Dress</span></span>
            <span className="line-mask"><span>your</span></span>
            <span className="line-mask"><span className="rose">soul.</span></span>
          </h1>
          <Sparkle />
          <p className="hero__lede reveal">Romance in structure.<br />Made to be yours.</p>
          <button className="btn reveal" onClick={() => navigate('/shop')}>
            Shop the edit <ArrowIcon width={16} height={16} />
          </button>
          <ul className="hero__features reveal">
            <li><HangerIcon width={24} height={24} /><b>Corset 3D</b><span>Dựng phom thủ công</span></li>
            <li><FeatherIcon width={24} height={24} /><b>Premium fabric</b><span>Satin, organza, ren</span></li>
            <li><GlobeIcon width={24} height={24} /><b>Worldwide</b><span>Giao hàng toàn cầu</span></li>
          </ul>
        </div>
        <div className="hero__media">
          <Img name="noir3" w={1400} alt="Người mẫu mặc Noir Bustier Dress" priority className="hero__img" />
          <Link to="/product/noir-bustier" className="hero__hotspot">
            <span className="dot" /> Noir Bustier Dress
          </Link>
        </div>
      </section>

      {/* THE EDIT */}
      <section className="section">
        <div className="section__head">
          <div>
            <p className="eyebrow">The Edit</p>
            <h2 className="display">Curated. Romantic. You.</h2>
          </div>
          <div className="tabs" role="tablist">
            {TABS.map((t) => (
              <button key={t.key} role="tab" aria-selected={tab === t.key} className={`tab ${tab === t.key ? 'is-on' : ''}`} onClick={() => setTab(t.key)}>
                {t.label}
              </button>
            ))}
          </div>
          <Link to="/shop" className="btn btn--outline btn--sm">View all <ArrowIcon width={14} height={14} /></Link>
        </div>
        <div className="grid-4" key={tab}>
          {edit.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </section>

      {/* DARK STORY BANNER */}
      <section className="story">
        <div className="story__copy">
          <h2 className="display display--light">
            Your soul.<br /><span className="rose">Your story.</span>
          </h2>
          <Sparkle />
          <p>Clothes that move with you.<br />Confidence that stays with you.</p>
          <button className="btn btn--rose" onClick={() => navigate('/lookbook')}>
            Explore the lookbook <ArrowIcon width={16} height={16} />
          </button>
        </div>
        <div className="story__media">
          <Img name="runway" w={1800} alt="Show diễn LSOUL" />
        </div>
      </section>

      {/* ASYMMETRIC LOOKBOOK PREVIEW */}
      <section className="section">
        <div className="section__head section__head--center">
          <p className="eyebrow">Lookbook</p>
          <h2 className="display">Victorian, rewritten.</h2>
        </div>
        <div className="asym">
          <Link to="/lookbook" className="asym__a"><Img name="bazaar" w={1200} alt="LSOUL trên Harper's Bazaar" /></Link>
          <div className="asym__b">
            <Link to="/product/aqua-cascade"><Img name="aqua3" w={900} alt="Aqua Cascade Ruffle" /></Link>
            <p className="caption">01 — Aqua Cascade Ruffle</p>
          </div>
          <div className="asym__c">
            <Link to="/product/cloud-puff"><Img name="cloud2" w={900} alt="Cloud Puff Off-Shoulder" /></Link>
            <p className="caption">02 — Cloud Puff Off-Shoulder</p>
          </div>
          <blockquote className="asym__quote">
            “Corset không phải để gò bó — mà để đứng thẳng hơn.”
            <cite>— LSOUL Atelier</cite>
          </blockquote>
        </div>
      </section>

      {/* FLAGSHIP */}
      <section className="flagship">
        <figure className="flagship__media">
          <Img name="storeB" w={600} alt="LSOUL flagship Thượng Hải" className="flagship__img" />
        </figure>
        <div className="flagship__card">
          <p className="eyebrow">Flagship store</p>
          <h3 className="display-sm">Shanghai</h3>
          <p className="muted">Không gian tối giản với ánh sáng như phòng triển lãm — nơi mỗi thiết kế được đặt như một tác phẩm.</p>
          <Link to="/store" className="link-arrow">Visit the store <ArrowIcon width={14} height={14} /></Link>
        </div>
      </section>

      <TrustBar />
    </main>
  );
}
