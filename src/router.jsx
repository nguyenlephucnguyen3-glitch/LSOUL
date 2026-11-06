// Router nhỏ dựa trên hash (#/shop, #/product/noir-bustier) — không cần thư viện ngoài.
import { useEffect, useState } from 'react';

function parse() {
  const raw = window.location.hash.replace(/^#/, '') || '/';
  const [path, query = ''] = raw.split('?');
  const parts = path.split('/').filter(Boolean);
  return { path, parts, params: Object.fromEntries(new URLSearchParams(query)) };
}

export function useRoute() {
  const [route, setRoute] = useState(parse);
  useEffect(() => {
    const onChange = () => {
      setRoute(parse());
      window.scrollTo({ top: 0, behavior: 'instant' });
    };
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  return route;
}

export function navigate(to) {
  const go = () => {
    window.location.hash = to;
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
      href={`#${to}`}
      className={className}
      onClick={(e) => {
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
