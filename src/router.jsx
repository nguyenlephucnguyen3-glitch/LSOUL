// Router nhỏ dùng đường dẫn thật (/shop, /product/noir-bustier) qua History API — không cần thư viện ngoài.
import { useEffect, useState } from 'react';

const ROUTE_EVENT = 'lsoul:navigate';

function parse() {
  const path = window.location.pathname || '/';
  const parts = path.split('/').filter(Boolean);
  return { path, parts, params: Object.fromEntries(new URLSearchParams(window.location.search)) };
}

// Link cũ dạng /#/shop vẫn mở được: tự chuyển sang /shop
if (window.location.hash.startsWith('#/')) {
  window.history.replaceState(null, '', window.location.hash.slice(1));
}

export function useRoute() {
  const [route, setRoute] = useState(parse);
  useEffect(() => {
    const onChange = () => setRoute(parse());
    window.addEventListener('popstate', onChange); // nút Back / Forward của trình duyệt
    window.addEventListener(ROUTE_EVENT, onChange); // chuyển trang bằng navigate()
    return () => {
      window.removeEventListener('popstate', onChange);
      window.removeEventListener(ROUTE_EVENT, onChange);
    };
  }, []);
  return route;
}

export function navigate(to) {
  if (to === window.location.pathname + window.location.search) return;
  const go = () => {
    window.history.pushState(null, '', to);
    window.dispatchEvent(new Event(ROUTE_EVENT));
    window.scrollTo({ top: 0, behavior: 'instant' });
  };
  // Chuyển trang mượt bằng View Transitions API (nếu trình duyệt hỗ trợ)
  if (document.startViewTransition && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.startViewTransition(go);
  } else {
    go();
  }
}

export function Link({ to, children, className, onClick, ...rest }) {
  return (
    <a
      href={to}
      className={className}
      onClick={(e) => {
        // Giữ hành vi mặc định khi Ctrl/Cmd-click hoặc chuột giữa (mở tab mới)
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        onClick?.(e);
        navigate(to);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
