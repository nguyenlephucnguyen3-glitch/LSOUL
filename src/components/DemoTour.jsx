// Chế độ demo tự chạy ~60 giây cho buổi thuyết trình: mở web với ?demo=1
// Luồng: Trang chủ → Lookbook → Chi tiết mẫu & bảng size → 5 kênh mạng xã hội.
// Ở chế độ này GA4 bị tắt để không làm sai số liệu thật.
import { useEffect, useState } from 'react';
import { navigate } from '../router.jsx';

export const DEMO = typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('demo');

const STEPS = ['Trang chủ', 'Lookbook', 'Chi tiết mẫu & bảng size', '5 kênh mạng xã hội'];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const $ = (sel, i = 0) => document.querySelectorAll(sel)[i];
const yOf = (sel, i = 0, offset = 90) => {
  const el = $(sel, i);
  return el ? el.getBoundingClientRect().top + window.scrollY - offset : window.scrollY;
};
function scrollToY(y, dur = 1600) {
  return new Promise((res) => {
    const start = window.scrollY;
    const dist = Math.max(0, y) - start;
    const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / dur);
      const e = p < 0.5 ? 2 * p * p : 1 - (-2 * p + 2) ** 2 / 2;
      window.scrollTo(0, start + dist * e);
      if (p < 1) requestAnimationFrame(tick); else res();
    };
    requestAnimationFrame(tick);
  });
}
const go = async (path, wait = 1600) => { navigate(path); await sleep(wait); };
const click = (sel, i = 0) => $(sel, i)?.click();

export default function DemoTour() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let alive = true;
    document.documentElement.style.scrollBehavior = 'auto';
    (async () => {
      // 01 — Trang chủ (~17s)
      setStep(0);
      await go('/', 3200);
      await scrollToY(yOf('.pillars'), 1800); await sleep(2200);
      await scrollToY(yOf('.story'), 1500); await sleep(1600);
      await scrollToY(yOf('.styling-trio', 0, 220), 1500); await sleep(2000);
      await scrollToY(yOf('.grid-4', 0, 200), 1500); await sleep(1600);
      if (!alive) return;

      // 02 — Lookbook (~11s)
      setStep(1);
      await go('/lookbook', 1800);
      await scrollToY(yOf('.lb-chapter'), 1500); await sleep(1600);
      await scrollToY(yOf('.lb-chapter', 1), 1700); await sleep(1300);
      await scrollToY(yOf('.lb-chapter', 2), 1700); await sleep(2500);
      if (!alive) return;

      // 03 — Chi tiết mẫu & bảng size (~18s)
      setStep(2);
      await go('/product/noir-bustier', 2200);
      click('.pdp__thumb', 1); await sleep(1400);
      click('.pdp__thumb', 2); await sleep(1300);
      click('.pdp__field .link-btn'); await sleep(3200); // mở bảng size
      click('.size-table tbody tr', 1); await sleep(1300); // chọn size S
      await scrollToY(yOf('.siyw', 0, 60), 1800); await sleep(1300);
      click('.siyw .tab', 1); await sleep(3000);
      if (!alive) return;

      // 04 — 5 kênh mạng xã hội (~12s)
      setStep(3);
      await go('/', 900);
      await scrollToY(yOf('.connect', 0, 40), 2200); await sleep(500);
      const cards = document.querySelectorAll('.connect__card');
      for (let i = 0; i < Math.min(5, cards.length); i += 1) {
        cards.forEach((c) => c.classList.remove('is-hl'));
        cards[i]?.classList.add('is-hl');
        await sleep(1200);
      }
      await sleep(900);
      cards.forEach((c) => c.classList.remove('is-hl'));
      if (alive) setDone(true);
    })();
    return () => { alive = false; };
  }, []);

  return (
    <>
      <div className="demo-bar" aria-hidden="true">
        <span className="demo-bar__n">0{step + 1}</span>
        <span className="demo-bar__label">{STEPS[step]}</span>
        <span className="demo-bar__track">{STEPS.map((s, i) => <i key={s} className={i <= step ? 'is-on' : ''} />)}</span>
      </div>
      {done && (
        <div className="demo-end">
          <p className="eyebrow">LSOUL · lsoulss.vercel.app</p>
          <h2 className="display display--light">Mặc theo cách của bạn.</h2>
        </div>
      )}
    </>
  );
}
