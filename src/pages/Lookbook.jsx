import { useState } from 'react';
import { Link } from '../router.jsx';
import Img from '../components/Img.jsx';
import { CloseIcon } from '../components/Icons.jsx';

const LOOKS = [
  { img: 'runway', title: 'The Show', note: 'Sàn diễn AW26', span: 'wide' },
  { img: 'rouge1', title: 'Rouge Corset Mini', to: '/product/rouge-corset' },
  { img: 'aqua1', title: 'Aqua Cascade Ruffle', to: '/product/aqua-cascade', span: 'tall' },
  { img: 'bazaar', title: "Harper's Bazaar", note: 'LSOUL trên Bazaar', span: 'tall' },
  { img: 'gingham1', title: 'Picnic Gingham Halter', to: '/product/gingham-halter' },
  { img: 'cloud3', title: 'Cloud Puff Off-Shoulder', to: '/product/cloud-puff' },
  { img: 'venue', title: 'The Venue', note: 'Hậu trường show', span: 'wide' },
  { img: 'noir1', title: 'Noir Bustier Dress', to: '/product/noir-bustier' },
  { img: 'sand1', title: 'Sand Lace Mini', to: '/product/sand-lace' },
  { img: 'seafoam1', title: 'Seafoam Ruffle Set', to: '/product/seafoam-set' },
  { img: 'ivory3', title: 'Ivory Halter Mini', to: '/product/ivory-mini' },
];

export default function Lookbook() {
  const [open, setOpen] = useState(null);
  return (
    <main className="page">
      <section className="page-hero">
        <p className="eyebrow">AW26 Lookbook</p>
        <h1 className="display">Victorian, rewritten.</h1>
        <p className="muted">Corset, xếp nếp, nơ và ren — được kể lại bằng ngôn ngữ của người phụ nữ độc lập.</p>
      </section>
      <div className="lookbook">
        {LOOKS.map((l, i) => (
          <figure key={l.img} className={`look look--${l.span || 'std'} reveal`} style={{ animationDelay: `${i * 60}ms` }} onClick={() => setOpen(l)}>
            <Img name={l.img} w={1200} alt={l.title} />
            <figcaption>
              <span>{String(i + 1).padStart(2, '0')}</span> {l.title}
            </figcaption>
          </figure>
        ))}
      </div>

      {open && (
        <div className="lightbox" onClick={() => setOpen(null)}>
          <button className="icon-btn lightbox__close" aria-label="Đóng"><CloseIcon /></button>
          <Img name={open.img} w={2000} alt={open.title} className="lightbox__img" />
          <div className="lightbox__cap" onClick={(e) => e.stopPropagation()}>
            <p className="display-sm">{open.title}</p>
            {open.to ? <Link to={open.to} className="btn btn--rose btn--sm">Shop this look</Link> : <p className="muted">{open.note}</p>}
          </div>
        </div>
      )}
    </main>
  );
}
