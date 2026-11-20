import { useRef, useState } from 'react';
import { PRODUCTS, getProduct } from '../data/products.js';
import { compressImage, useUgc } from '../data/ugc.js';
import { SITE } from '../data/site.js';
import { track } from '../analytics.js';
import { useSeo } from '../seo.js';
import { useStore } from '../context/StoreContext.jsx';
import { Link, navigate } from '../router.jsx';
import Img from '../components/Img.jsx';
import { SocialLinks, UgcTile } from '../components/Community.jsx';
import { CloseIcon, PlusIcon } from '../components/Icons.jsx';

const EMPTY = { handle: '', caption: '', productId: '', consent: false };

function UploadForm({ defaultProduct, onDone }) {
  const { addPost } = useUgc();
  const { notify } = useStore();
  const [form, setForm] = useState({ ...EMPTY, productId: defaultProduct || '' });
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const fileRef = useRef();

  const pick = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) return setError('Vui lòng chọn một tệp ảnh.');
    setError('');
    try { setImage(await compressImage(file)); } catch (err) { setError(err.message); }
  };

  const submit = (e) => {
    e.preventDefault();
    if (!image) return setError('Bạn chưa chọn ảnh.');
    if (!form.consent) return setError('Vui lòng đồng ý để LSOUL hiển thị ảnh của bạn.');
    setBusy(true);
    const handle = form.handle.trim() ? `@${form.handle.trim().replace(/^@/, '')}` : '@ban_cua_lsoul';
    const ok = addPost({ image, handle, caption: form.caption.trim(), productId: form.productId });
    setBusy(false);
    if (!ok) return setError('Bộ nhớ trình duyệt đã đầy. Hãy thử ảnh nhỏ hơn.');
    track('ugc_submit', { item_id: form.productId || 'none' });
    notify('Cảm ơn bạn! Ảnh đã được đăng lên cộng đồng.');
    onDone?.();
  };

  return (
    <form className="ugc-form" onSubmit={submit} noValidate>
      <button type="button" className={`ugc-drop ${image ? 'has-img' : ''}`} onClick={() => fileRef.current.click()}>
        {image ? <img src={image} alt="Ảnh bạn chọn" /> : <span><PlusIcon width={28} height={28} /> Chọn ảnh outfit của bạn</span>}
      </button>
      <input ref={fileRef} type="file" accept="image/*" hidden onChange={pick} />
      <div className="fields">
        <label className="field">
          <span>Tên Instagram / TikTok</span>
          <input value={form.handle} onChange={(e) => setForm({ ...form, handle: e.target.value })} placeholder="@tencuaban" />
        </label>
        <label className="field">
          <span>Bạn đang mặc</span>
          <select value={form.productId} onChange={(e) => setForm({ ...form, productId: e.target.value })}>
            <option value="">— Chọn thiết kế LSOUL —</option>
            {PRODUCTS.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        </label>
        <label className="field field--full">
          <span>Bạn mặc nó theo cách nào?</span>
          <textarea rows={2} maxLength={140} value={form.caption} onChange={(e) => setForm({ ...form, caption: e.target.value })} placeholder="Ví dụ: phối với boots và áo khoác da cho buổi cafe cuối tuần" />
        </label>
      </div>
      <label className="check">
        <input type="checkbox" checked={form.consent} onChange={(e) => setForm({ ...form, consent: e.target.checked })} />
        <span>Tôi là người trong ảnh (hoặc được cho phép) và đồng ý để LSOUL hiển thị ảnh này.</span>
      </label>
      {error && <p className="ugc-form__error">{error}</p>}
      <button className="btn btn--block" type="submit" disabled={busy}>Đăng ảnh</button>
      <p className="muted small">Bản demo: ảnh chỉ lưu trong trình duyệt của bạn.</p>
    </form>
  );
}

export default function Community({ params }) {
  const { all } = useUgc();
  const [formOpen, setFormOpen] = useState(!!params.share);
  const [open, setOpen] = useState(null);
  const filter = params.product || 'all';
  const list = filter === 'all' ? all : all.filter((p) => p.productId === filter);
  const usedIds = [...new Set(all.map((p) => p.productId).filter(Boolean))];

  useSeo({
    title: 'Community',
    description: `Cộng đồng LSOUL: xem các cô gái mặc LSOUL theo cách của riêng họ và chia sẻ outfit của bạn với ${SITE.hashtag}.`,
  });

  const setFilter = (id) => navigate(id === 'all' ? '/community' : `/community?product=${id}`);
  const closeForm = () => { setFormOpen(false); if (params.share) navigate('/community'); };

  return (
    <main className="page">
      <section className="page-hero">
        <p className="eyebrow">Community</p>
        <h1 className="display">{SITE.slogan}</h1>
        <p className="muted">Không có một cách mặc đúng. Đây là cách cộng đồng LSOUL đang mặc — và nơi bạn chia sẻ cách của mình.</p>
        <p className="community-tag">{SITE.hashtag}</p>
        <div className="community-actions">
          <button className="btn" onClick={() => setFormOpen(true)}><PlusIcon width={16} height={16} /> Chia sẻ outfit của bạn</button>
        </div>
        <SocialLinks className="social--center" />
      </section>

      <div className="toolbar">
        <div className="tabs">
          <button className={`tab ${filter === 'all' ? 'is-on' : ''}`} onClick={() => setFilter('all')}>Tất cả</button>
          {usedIds.map((id) => (
            <button key={id} className={`tab ${filter === id ? 'is-on' : ''}`} onClick={() => setFilter(id)}>{getProduct(id)?.name}</button>
          ))}
        </div>
        <span className="muted small">{list.length} outfit</span>
      </div>

      <div className="ugc-grid">
        {list.map((p) => <UgcTile key={p.id} post={p} onOpen={setOpen} />)}
      </div>

      {formOpen && (
        <div className="modal" onClick={closeForm}>
          <div className="modal__box modal__box--wide" onClick={(e) => e.stopPropagation()} role="dialog" aria-label="Chia sẻ outfit">
            <div className="row-between">
              <h3 className="display-sm">Chia sẻ outfit</h3>
              <button className="icon-btn" aria-label="Đóng" onClick={closeForm}><CloseIcon /></button>
            </div>
            <UploadForm defaultProduct={params.share || params.product} onDone={closeForm} />
          </div>
        </div>
      )}

      {open && (
        <div className="lightbox" onClick={() => setOpen(null)}>
          <button className="icon-btn lightbox__close" aria-label="Đóng"><CloseIcon /></button>
          {open.brand ? <Img name={open.img} w={1600} alt={open.caption} className="lightbox__img" /> : <img src={open.image} alt={open.caption} className="img is-loaded lightbox__img" />}
          <div className="lightbox__cap" onClick={(e) => e.stopPropagation()}>
            <p className="display-sm">{open.handle}</p>
            {open.caption && <p className="muted">{open.caption}</p>}
            {getProduct(open.productId) && <Link to={`/product/${open.productId}`} className="btn btn--rose btn--sm">Shop this look</Link>}
          </div>
        </div>
      )}
    </main>
  );
}
