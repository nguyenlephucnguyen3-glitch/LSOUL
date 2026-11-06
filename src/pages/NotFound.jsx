import { Link } from '../router.jsx';

export default function NotFound() {
  return (
    <main className="page empty empty--full">
      <p className="eyebrow">404</p>
      <h1 className="display">Lost in the atelier.</h1>
      <Link to="/" className="btn">Về trang chủ</Link>
    </main>
  );
}
