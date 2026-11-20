import { useState } from 'react';
import { useSeo } from '../seo.js';
import { Link, navigate } from '../router.jsx';
import { PRODUCTS } from '../data/products.js';
import Img from '../components/Img.jsx';
import ProductCard from '../components/ProductCard.jsx';
import { TrustBar } from '../components/Footer.jsx';
import { ArrowIcon, FeatherIcon, GlobeIcon, HangerIcon, Sparkle } from '../components/Icons.jsx';
import { UgcTile } from '../components/Community.jsx';
import { useUgc } from '../data/ugc.js';
import { SITE, SOCIAL } from '../data/site.js';
import { track } from '../analytics.js';

// Trang chủ đi theo Big Idea "Mặc theo cách của bạn":
// Brand Storytelling → Real Styling → sản phẩm → UGC & Community → kết nối các nền tảng.
const PILLARS = [
  { n: '01', title: 'Brand Storytelling', text: 'Câu chuyện thương hiệu, nhà thiết kế và quá trình làm nên mỗi chiếc corset.', to: '/story', cta: 'Đọc câu chuyện' },
  { n: '02', title: 'Real Styling', text: 'Phối đồ thực tế: một thiết kế, nhiều cách mặc cho từng dịp trong ngày.', to: '/lookbook', cta: 'Xem cách phối' },
  { n: '03', title: 'UGC', text: 'Outfit thật từ chính khách hàng — cách bạn mặc LSOUL được hiển thị ngay trên website.', to: '/community', cta: 'Xem outfit' },
  { n: '04', title: 'Community', text: `Kết nối TikTok, Instagram, YouTube, Facebook, Threads và website qua ${SITE.hashtag}.`, to: '/community', cta: 'Tham gia' },
];

const TABS = [
  { key: 'all', label: 'All' },
  { key: 'corset', label: 'Corset' },
  { key: 'dresses', label: 'Dresses' },
  { key: 'ruffle', label: 'Ruffle' },
];

export default function Home() {
  useSeo({ path: '/' });
  const [tab, setTab] = useState('all');
  const { all: ugc } = useUgc();
  const edit = PRODUCTS.filter((p) => tab === 'all' || p.category === tab).slice(0, 4);

  return (
    <main className="page">
      {/* HERO — Big Idea */}
      <section className="hero">
        <div className="hero__copy">
          <p className="eyebrow reveal">Big idea · LSOUL online</p>
          <h1 className="hero__title hero__title--vi">
            <span className="line-mask"><span>Mặc</span></span>
            <span className="line-mask"><span>theo cách</span></span>
            <span className="line-mask"><span className="rose">của bạn.</span></span>
          </h1>
          <Sparkle />
          <p className="hero__lede hero__lede--vi reveal">
            LSOUL không chỉ là những thiết kế — đó là không gian để bạn thể hiện cá tính, khám phá phong cách và trở thành một phần của câu chuyện thương hiệu.
          </p>
          <div className="hero__ctas reveal">
            <button className="btn" onClick={() => navigate('/story')}>Khám phá LSOUL <ArrowIcon width={16} height={16} /></button>
            <button className="btn btn--outline" onClick={() => navigate('/shop')}>Shop the edit</button>
          </div>
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

      {/* 4 HƯỚNG TRUYỀN THÔNG */}
      <section className="section pillars">
        <div className="section__head section__head--center">
          <p className="eyebrow">Brand Storytelling + Real Styling + UGC + Community</p>
          <h2 className="display">Không chỉ là sản phẩm, mà là trải nghiệm</h2>
        </div>
        <div className="pillars__grid">
          {PILLARS.map((p) => (
            <Link key={p.n} to={p.to} className="pillar">
              <span className="pillar__n">{p.n}</span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
              <span className="link-arrow">{p.cta} <ArrowIcon width={14} height={14} /></span>
            </Link>
          ))}
        </div>
      </section>

      {/* 01 — BRAND STORYTELLING */}
      <section className="story">
        <div className="story__copy">
          <p className="eyebrow">01 · Brand storytelling</p>
          <h2 className="display display--light">
            Your soul.<br /><span className="rose">Your story.</span>
          </h2>
          <Sparkle />
          <p>Đằng sau mỗi thiết kế là một đội ngũ, một bản phác tay và hàng chục lần thử trên người mẫu thật. Đây là câu chuyện LSOUL — lãng mạn kiểu Victoria, độc lập kiểu hiện đại.</p>
          <button className="btn btn--rose" onClick={() => navigate('/story')}>
            Đọc câu chuyện LSOUL <ArrowIcon width={16} height={16} />
          </button>
        </div>
        <div className="story__media">
          <Img name="runway" w={1800} alt="Show diễn LSOUL" />
        </div>
      </section>

      {/* 02 — REAL STYLING (ảnh lookbook thật) */}
      <section className="section">
        <div className="section__head section__head--center">
          <p className="eyebrow">02 · Real styling</p>
          <h2 className="display">Một chiếc áo, ba cách mặc.</h2>
          <p className="muted section__sub">Phối đồ thực tế để bạn hình dung thiết kế khi bước ra đời thường — không chỉ trên sàn diễn.</p>
        </div>
        <div className="styling-trio">
          {[
            { img: 'lb04', label: 'Với chân váy jean' },
            { img: 'lb05', label: 'Với quần jean ống rộng' },
            { img: 'lb07', label: 'Với chân váy đen dài' },
          ].map((l, i) => (
            <Link key={l.img} to="/lookbook" className="styling-trio__item">
              <Img name={l.img} w={900} alt={`Áo lông trắng ngà — ${l.label}`} />
              <span><b>0{i + 1}</b> {l.label}</span>
            </Link>
          ))}
        </div>
        <div className="center-cta"><Link to="/lookbook" className="btn btn--outline">Xem toàn bộ lookbook <ArrowIcon width={14} height={14} /></Link></div>
      </section>

      {/* THE EDIT — sản phẩm, kèm gợi ý phối trong từng trang */}
      <section className="section">
        <div className="section__head">
          <div>
            <p className="eyebrow">The Edit</p>
            <h2 className="display">Chọn thiết kế. Mặc theo cách của bạn.</h2>
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

      {/* 03 — UGC */}
      <section className="section home-community">
        <div className="section__head">
          <div>
            <p className="eyebrow">03 · UGC · {SITE.hashtag}</p>
            <h2 className="display">Cộng đồng đang mặc LSOUL</h2>
          </div>
          <Link to="/community" className="btn btn--outline btn--sm">Chia sẻ outfit của bạn <ArrowIcon width={14} height={14} /></Link>
        </div>
        <div className="ugc-grid ugc-grid--row">
          {ugc.slice(0, 4).map((p) => <UgcTile key={p.id} post={p} onOpen={() => navigate('/community')} />)}
        </div>
      </section>

      {/* 04 — COMMUNITY: kết nối các nền tảng */}
      <section className="connect">
        <div className="section__head section__head--center">
          <p className="eyebrow">04 · Community</p>
          <h2 className="display display--light">Một câu chuyện, sáu nền tảng.</h2>
          <p className="connect__sub">Mỗi nền tảng một vai trò — tất cả dẫn về website và về {SITE.hashtag}.</p>
        </div>
        <div className="connect__grid">
          {SOCIAL.map((s) => (
            <a key={s.key} href={s.url} target="_blank" rel="noopener noreferrer" className="connect__card" onClick={() => track('social_click', { platform: s.key, placement: 'home_connect' })}>
              <span className="connect__role">{s.role}</span>
              <h3>{s.label}</h3>
              <p>{s.desc}</p>
              <span className="link-arrow">Theo dõi <ArrowIcon width={14} height={14} /></span>
            </a>
          ))}
          <Link to="/community" className="connect__card connect__card--site">
            <span className="connect__role">Trung tâm</span>
            <h3>Website</h3>
            <p>Nơi mọi câu chuyện hội tụ: lookbook, cách phối, outfit cộng đồng và mua sắm.</p>
            <span className="link-arrow">Vào cộng đồng <ArrowIcon width={14} height={14} /></span>
          </Link>
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
