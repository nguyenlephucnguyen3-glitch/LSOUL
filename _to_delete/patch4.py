import re
def rd(p): return open(p, encoding='utf-8').read()
def wr(p, s): open(p, 'w', encoding='utf-8').write(s)
def edit(p, pairs):
    s = rd(p)
    for a, b in pairs:
        assert s.count(a) == 1, (p, s.count(a), a[:80]); s = s.replace(a, b)
    wr(p, s)
def seo(p, call, imports=''):
    s = rd(p)
    s = "import { useSeo } from '../seo.js';\n" + imports + s
    m = re.search(r"export default function \w+\([^)]*\) \{\n", s); assert m, p
    s = s[:m.end()] + f"  useSeo({call});\n" + s[m.end():]
    wr(p, s)

IMG = "import { imgUrl } from '../data/images.js';\n"
seo('src/pages/Lookbook.jsx', "{ title: 'Lookbook AW26', description: 'Lookbook AW26 của LSOUL — Victorian, viết lại: corset, bèo tầng, nơ và ren.', image: imgUrl('runway', 1200) }", IMG)
seo('src/pages/Store.jsx', "{ title: 'Flagship Shanghai', description: 'LSOUL Flagship Shanghai — không gian trưng bày như phòng triển lãm, đo corset và styling 1:1.', image: imgUrl('storeA', 800) }", IMG)
seo('src/pages/Wishlist.jsx', "{ title: 'Wishlist', noindex: true }")
seo('src/pages/Checkout.jsx', "{ title: 'Thanh toán', noindex: true }")
seo('src/pages/Order.jsx', "{ title: 'Đơn hàng', noindex: true }")
seo('src/pages/Orders.jsx', "{ title: 'Đơn hàng của tôi', noindex: true }")
seo('src/pages/NotFound.jsx', "{ title: 'Không tìm thấy trang', noindex: true }")
seo('src/pages/Home.jsx', "{ path: '/' }")

# ---------- Home ----------
edit('src/pages/Home.jsx', [
("import { ArrowIcon, FeatherIcon, GlobeIcon, HangerIcon, Sparkle } from '../components/Icons.jsx';",
 "import { ArrowIcon, FeatherIcon, GlobeIcon, HangerIcon, Sparkle } from '../components/Icons.jsx';\nimport { UgcTile } from '../components/Community.jsx';\nimport { useUgc } from '../data/ugc.js';\nimport { SITE } from '../data/site.js';"),
("  const [tab, setTab] = useState('all');\n", "  const [tab, setTab] = useState('all');\n  const { all: ugc } = useUgc();\n"),
('<p className="hero__lede reveal">Romance in structure.<br />Made to be yours.</p>',
 '<p className="hero__lede reveal">Mặc theo cách của bạn.<br />Romance in structure.</p>'),
("      {/* FLAGSHIP */}",
 """      {/* COMMUNITY (UGC) */}
      <section className="section home-community">
        <div className="section__head">
          <div>
            <p className="eyebrow">Community · {SITE.hashtag}</p>
            <h2 className="display">Mặc theo cách của bạn</h2>
          </div>
          <Link to="/community" className="btn btn--outline btn--sm">Xem cộng đồng <ArrowIcon width={14} height={14} /></Link>
        </div>
        <div className="ugc-grid ugc-grid--row">
          {ugc.slice(0, 4).map((p) => <UgcTile key={p.id} post={p} onOpen={() => navigate('/community')} />)}
        </div>
      </section>

      {/* FLAGSHIP */}"""),
])

# ---------- Shop ----------
edit('src/pages/Shop.jsx', [
("import { CATEGORIES, PRODUCTS } from '../data/products.js';",
 "import { useEffect } from 'react';\nimport { CATEGORIES, PRODUCTS } from '../data/products.js';\nimport { useSeo } from '../seo.js';\nimport { track, toItem } from '../analytics.js';"),
("  const title = CATEGORIES.find((c) => c.key === cat)?.label || 'Tất cả';\n",
 """  const title = CATEGORIES.find((c) => c.key === cat)?.label || 'Tất cả';
  const listName = params.sale ? 'Private Sale' : title === 'Tất cả' ? 'Bộ sưu tập' : title;
  useSeo({ title: listName, description: `${listName} — thời trang nữ LSOUL: corset, đầm xếp nếp, nơ và ren. Mặc theo cách của bạn.` });
  useEffect(() => {
    track('view_item_list', { item_list_name: listName, items: list.map((p, i) => toItem(p, { index: i })) });
  }, [cat, sort]); // eslint-disable-line react-hooks/exhaustive-deps
"""),
])

# ---------- Product ----------
edit('src/pages/Product.jsx', [
("import NotFound from './NotFound.jsx';",
 "import NotFound from './NotFound.jsx';\nimport StyleItYourWay from '../components/StyleItYourWay.jsx';\nimport { ShareButtons, UgcTile } from '../components/Community.jsx';\nimport { useUgc } from '../data/ugc.js';\nimport { SITE } from '../data/site.js';\nimport { imgUrl } from '../data/images.js';\nimport { useSeo, absUrl } from '../seo.js';\nimport { CURRENCY, track, toItem } from '../analytics.js';"),
("  const [shake, setShake] = useState(false);\n",
 """  const [shake, setShake] = useState(false);
  const { all: ugcAll } = useUgc();
  const cover = product ? absUrl(imgUrl(product.images[0], 1200)) : undefined;
  useSeo({
    title: product?.name || 'Không tìm thấy sản phẩm',
    description: product ? `${product.name} — ${product.desc}` : undefined,
    image: cover,
    noindex: !product,
    jsonLd: product && {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      description: product.desc,
      image: product.images.map((im) => absUrl(imgUrl(im, 1200))),
      brand: { '@type': 'Brand', name: 'LSOUL' },
      sku: product.id,
      offers: { '@type': 'Offer', priceCurrency: CURRENCY, price: product.price, availability: 'https://schema.org/InStock', url: `${SITE.url}/product/${product.id}` },
    },
  });
"""),
("  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps\n",
 "    if (product) track('view_item', { currency: CURRENCY, value: product.price, items: [toItem(product)] });\n  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps\n"),
("  const liked = wishlist.includes(product.id);\n",
 "  const liked = wishlist.includes(product.id);\n  const ugcHere = ugcAll.filter((p) => p.productId === product.id).slice(0, 4);\n"),
('          <Accordion title="Chi tiết thiết kế" open>',
 '          <ShareButtons path={`/product/${product.id}`} title={product.name} itemId={product.id} />\n\n          <Accordion title="Chi tiết thiết kế" open>'),
("""      </section>

      <section className="section">
        <div className="section__head">
          <div>
            <p className="eyebrow">Complete the look</p>""",
"""      </section>

      <StyleItYourWay product={product} />

      <section className="section pdp-ugc">
        <div className="section__head">
          <div>
            <p className="eyebrow">{SITE.hashtag}</p>
            <h2 className="display">Cộng đồng đang mặc</h2>
          </div>
          <Link to={`/community?share=${product.id}`} className="btn btn--outline btn--sm">Chia sẻ outfit của bạn</Link>
        </div>
        {ugcHere.length ? (
          <div className="ugc-grid ugc-grid--row">{ugcHere.map((p) => <UgcTile key={p.id} post={p} />)}</div>
        ) : (
          <p className="muted">Chưa có ai chia sẻ cách mặc {product.name}. Hãy là người đầu tiên.</p>
        )}
      </section>

      <section className="section">
        <div className="section__head">
          <div>
            <p className="eyebrow">Complete the look</p>"""),
])

# ---------- Checkout ----------
edit('src/pages/Checkout.jsx', [
("import { useState } from 'react';", "import { useEffect, useState } from 'react';\nimport { CURRENCY, track, toItem } from '../analytics.js';"),
("  const [loading, setLoading] = useState(false);\n",
 """  const [loading, setLoading] = useState(false);
  const gaItems = lines.map((l) => toItem(l.product, { item_variant: `${l.color} / ${l.size}`, quantity: l.qty }));

  useEffect(() => {
    if (lines.length) track('begin_checkout', { currency: CURRENCY, value: subtotal, items: gaItems });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
"""),
("      navigate(`/order/${id}`);\n",
 "      track('purchase', { transaction_id: id, value: t.total, currency: CURRENCY, shipping: t.ship, coupon: voucher || undefined, items: gaItems });\n      navigate(`/order/${id}`);\n"),
])

# ---------- Store context ----------
edit('src/context/StoreContext.jsx', [
("import { getProduct } from '../data/products.js';", "import { getProduct } from '../data/products.js';\nimport { CURRENCY, track, toItem } from '../analytics.js';"),
("      notify(`${p.name} — size ${size} đã vào giỏ`);\n",
 "      notify(`${p.name} — size ${size} đã vào giỏ`);\n      track('add_to_cart', { currency: CURRENCY, value: p.price * qty, items: [toItem(p, { item_variant: `${c} / ${size}`, quantity: qty })] });\n"),
("    notify(has ? `Đã bỏ ${p.name} khỏi Wishlist` : `Đã lưu ${p.name} vào Wishlist`);\n",
 "    notify(has ? `Đã bỏ ${p.name} khỏi Wishlist` : `Đã lưu ${p.name} vào Wishlist`);\n    if (!has) track('add_to_wishlist', { currency: CURRENCY, value: p.price, items: [toItem(p)] });\n"),
])

# ---------- Search ----------
edit('src/components/SearchOverlay.jsx', [
("import { CloseIcon, SearchIcon } from './Icons.jsx';", "import { CloseIcon, SearchIcon } from './Icons.jsx';\nimport { track } from '../analytics.js';"),
('className="search__item" onClick={close}>', 'className="search__item" onClick={() => { track(\'search\', { search_term: q.trim() }); close(); }}>'),
])

# ---------- Header ----------
edit('src/components/Header.jsx', [
("  { to: '/store', label: 'Flagship' },\n", "  { to: '/story', label: 'Our Story' },\n  { to: '/community', label: 'Community' },\n"),
("${path === n.to.split('?')[0] && n.to === '/lookbook' ? 'is-active' : ''}", "${!n.to.includes('?') && path === n.to ? 'is-active' : ''}"),
])

# ---------- Footer ----------
edit('src/components/Footer.jsx', [
("import { BoxIcon, HeadsetIcon, LockIcon, TruckIcon } from './Icons.jsx';",
 "import { BoxIcon, HeadsetIcon, LockIcon, TruckIcon } from './Icons.jsx';\nimport { SocialLinks } from './Community.jsx';\nimport { track } from '../analytics.js';"),
('          <Link to="/lookbook">Lookbook</Link>\n', '          <Link to="/story">Our Story</Link>\n          <Link to="/lookbook">Lookbook</Link>\n          <Link to="/community">Community</Link>\n'),
("            notify('Cảm ơn bạn — hẹn gặp trong hộp thư.');\n", "            track('generate_lead', { method: 'newsletter' });\n            notify('Cảm ơn bạn — hẹn gặp trong hộp thư.');\n"),
("        <span>Instagram · TikTok · Pinterest</span>", "        <SocialLinks />"),
])

# ---------- App & main ----------
edit('src/App.jsx', [
("import { useRoute } from './router.jsx';", "import { useEffect } from 'react';\nimport { useRoute } from './router.jsx';\nimport { track } from './analytics.js';"),
("import Orders from './pages/Orders.jsx';", "import Orders from './pages/Orders.jsx';\nimport Story from './pages/Story.jsx';\nimport Community from './pages/Community.jsx';"),
("  if (first === 'orders') return <Orders />;", "  if (first === 'orders') return <Orders />;\n  if (first === 'story') return <Story />;\n  if (first === 'community') return <Community params={route.params} />;"),
("  const route = useRoute();\n",
 """  const route = useRoute();
  const routeKey = route.path + JSON.stringify(route.params);

  // SPA: gửi page_view cho GA4 mỗi lần đổi trang (sau khi trang con đã đặt <title>).
  useEffect(() => {
    track('page_view', { page_title: document.title, page_location: window.location.href, page_path: route.path });
  }, [routeKey]); // eslint-disable-line react-hooks/exhaustive-deps
"""),
])
edit('src/main.jsx', [
("import './styles.css';\n", "import './styles.css';\nimport { initAnalytics } from './analytics.js';\n\ninitAnalytics();\n"),
])

# ---------- index.html & package.json ----------
edit('index.html', [
('<meta name="description" content="LSOUL — Victorian romance, modern independence." />',
 '<meta name="description" content="LSOUL — thời trang nữ lãng mạn kiểu Victoria với tinh thần độc lập: corset, xếp nếp, nơ và ren. Mặc theo cách của bạn." />\n    <!-- Google Search Console: điền mã xác minh vào VITE_GSC_VERIFICATION trong file .env -->\n    <meta name="google-site-verification" content="%VITE_GSC_VERIFICATION%" />\n    <meta property="og:site_name" content="LSOUL" />\n    <meta property="og:type" content="website" />\n    <meta property="og:image" content="/logo.png" />'),
('<title>LSOUL — Dress Your Soul</title>', '<title>LSOUL — Mặc theo cách của bạn</title>'),
])
edit('package.json', [
('    "build": "vite build",', '    "prebuild": "node scripts/seo-files.mjs",\n    "build": "vite build",\n    "seo": "node scripts/seo-files.mjs",'),
])
print('patched')
