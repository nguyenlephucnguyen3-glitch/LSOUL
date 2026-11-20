import { useCallback, useEffect, useState } from 'react';
import { Link } from '../router.jsx';
import Img from '../components/Img.jsx';
import { ArrowIcon, CloseIcon, Sparkle } from '../components/Icons.jsx';
import { useSeo } from '../seo.js';
import { imgUrl } from '../data/images.js';
import { SITE } from '../data/site.js';
import { track } from '../analytics.js';

// Lookbook theo 3 outfit của buổi chụp. Ảnh nằm trong src/data/images.js (lb01 → lb13).
const CHAPTERS = [
  {
    n: '01',
    title: 'Blush Tulle',
    text: 'Ngọt ngào nhưng không ngây thơ: váy tulle hồng phấn bồng nhẹ, đi cùng sandal ánh bạc.',
    looks: [{ img: 'lb01' }, { img: 'lb02', wide: true }, { img: 'lb03' }],
  },
  {
    n: '02',
    title: 'Ivory Fur',
    text: 'Một chiếc áo lông trắng ngà, ba cách mặc: với chân váy jean, quần jean ống rộng hay chân váy đen dài.',
    looks: [{ img: 'lb04' }, { img: 'lb05' }, { img: 'lb06', wide: true }, { img: 'lb07' }],
  },
  {
    n: '03',
    title: 'Noir',
    text: 'Đầm đen dáng corset và túi xách đen — tối giản, sắc sảo và đầy quyền lực.',
    looks: [{ img: 'lb08' }, { img: 'lb09', wide: true }, { img: 'lb10' }, { img: 'lb11' }, { img: 'lb12' }, { img: 'lb13' }],
  },
];

// Danh sách phẳng để lightbox chuyển ảnh trước / sau
const ALL = CHAPTERS.flatMap((c) => c.looks.map((l, i) => ({ ...l, chapter: c, idx: i })));

export default function Lookbook() {
  useSeo({
    title: 'Lookbook',
    description: `Lookbook LSOUL — ba outfit, ba tinh thần: Blush Tulle, Ivory Fur và Noir. ${SITE.slogan}.`,
    image: imgUrl('lb01', 1200),
  });

  const [open, setOpen] = useState(-1);
  const close = useCallback(() => setOpen(-1), []);
  const step = useCallback((d) => setOpen((i) => (i + d + ALL.length) % ALL.length), []);

  useEffect(() => {
    if (open < 0) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, close, step]);

  const show = (look) => {
    const i = ALL.findIndex((l) => l.img === look.img);
    setOpen(i);
    track('select_content', { content_type: 'lookbook', item_id: look.img });
  };

  const cur = ALL[open];

  return (
    <main className="page">
      <section className="page-hero">
        <p className="eyebrow">Lookbook</p>
        <h1 className="display">Ba outfit, ba tinh thần.</h1>
        <p className="muted">{SITE.slogan} — cùng một tinh thần LSOUL, kể lại theo ba cách rất khác nhau.</p>
        <Sparkle />
      </section>

      {CHAPTERS.map((c) => (
        <section key={c.n} className="lb-chapter">
          <header className="lb-chapter__head">
            <span className="lb-chapter__n">Look {c.n}</span>
            <h2 className="display">{c.title}</h2>
            <p className="muted">{c.text}</p>
          </header>
          <div className="lb-grid">
            {c.looks.map((l, i) => (
              <figure key={l.img} className={`lb-item ${l.wide ? 'lb-item--wide' : ''}`} style={{ animationDelay: `${i * 70}ms` }}>
                <button onClick={() => show(l)} aria-label={`Xem ảnh ${c.title} ${i + 1}`}>
                  <Img name={l.img} w={l.wide ? 1600 : 1000} alt={`${c.title} — ảnh ${i + 1}`} />
                </button>
                <figcaption>{c.n}.{String(i + 1).padStart(2, '0')}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      ))}

      <section className="sp-cta">
        <h2 className="display">Bạn sẽ mặc nó thế nào?</h2>
        <div className="sp-cta__btns">
          <Link to="/shop" className="btn">Khám phá bộ sưu tập <ArrowIcon width={16} height={16} /></Link>
          <Link to="/community" className="btn btn--outline">Chia sẻ outfit của bạn</Link>
        </div>
      </section>

      {cur && (
        <div className="lightbox" onClick={close}>
          <button className="icon-btn lightbox__close" aria-label="Đóng"><CloseIcon /></button>
          <button className="lb-nav lb-nav--prev" aria-label="Ảnh trước" onClick={(e) => { e.stopPropagation(); step(-1); }}>‹</button>
          <Img key={cur.img} name={cur.img} w={2000} alt={cur.chapter.title} className="lightbox__img" />
          <button className="lb-nav lb-nav--next" aria-label="Ảnh sau" onClick={(e) => { e.stopPropagation(); step(1); }}>›</button>
          <div className="lightbox__cap" onClick={(e) => e.stopPropagation()}>
            <p className="display-sm">Look {cur.chapter.n} · {cur.chapter.title}</p>
            <p className="muted small">{open + 1} / {ALL.length}</p>
          </div>
        </div>
      )}
    </main>
  );
}
