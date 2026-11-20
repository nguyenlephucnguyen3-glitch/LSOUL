import { useEffect } from 'react';
import { useRoute } from './router.jsx';
import { track } from './analytics.js';
import DemoTour, { DEMO } from './components/DemoTour.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import CartDrawer from './components/CartDrawer.jsx';
import SearchOverlay from './components/SearchOverlay.jsx';
import Toast from './components/Toast.jsx';
import Home from './pages/Home.jsx';
import Shop from './pages/Shop.jsx';
import Product from './pages/Product.jsx';
import Lookbook from './pages/Lookbook.jsx';
import Store from './pages/Store.jsx';
import Wishlist from './pages/Wishlist.jsx';
import NotFound from './pages/NotFound.jsx';
import Checkout from './pages/Checkout.jsx';
import Order from './pages/Order.jsx';
import Orders from './pages/Orders.jsx';
import Story from './pages/Story.jsx';
import Community from './pages/Community.jsx';

function Page({ route }) {
  const [first, second] = route.parts;
  if (!first) return <Home />;
  if (first === 'shop') return <Shop params={route.params} />;
  if (first === 'product') return <Product id={second} />;
  if (first === 'lookbook') return <Lookbook />;
  if (first === 'store') return <Store />;
  if (first === 'wishlist') return <Wishlist />;
  if (first === 'checkout') return <Checkout />;
  if (first === 'order') return <Order id={second} />;
  if (first === 'orders') return <Orders />;
  if (first === 'story') return <Story />;
  if (first === 'community') return <Community params={route.params} />;
  return <NotFound />;
}

export default function App() {
  const route = useRoute();
  const routeKey = route.path + JSON.stringify(route.params);

  // SPA: gửi page_view cho GA4 mỗi lần đổi trang (sau khi trang con đã đặt <title>).
  useEffect(() => {
    track('page_view', { page_title: document.title, page_location: window.location.href, page_path: route.path });
  }, [routeKey]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <>
      <Header path={route.path} />
      <div className="route" key={route.path + JSON.stringify(route.params)}>
        <Page route={route} />
      </div>
      <Footer />
      <CartDrawer />
      <SearchOverlay />
      <Toast />
      {DEMO && <DemoTour />}
    </>
  );
}
