import { useStore } from '../context/StoreContext.jsx';
import Img from '../components/Img.jsx';
import { Sparkle } from '../components/Icons.jsx';

export default function Store() {
  const { notify } = useStore();
  return (
    <main className="page">
      <section className="store-hero">
        <div className="store-hero__copy">
          <p className="eyebrow">Flagship</p>
          <h1 className="display display--light">LSOUL<br />Shanghai</h1>
          <p className="store-hero__lede">Một không gian trưng bày như phòng triển lãm, nơi mỗi thiết kế được nhìn như một tác phẩm.</p>
        </div>
        <figure className="store-hero__media">
          <Img name="storeA" w={800} alt="LSOUL flagship store Thượng Hải" priority />
        </figure>
      </section>
      <section className="store-body">
        <div>
          <p className="eyebrow">The space</p>
          <h2 className="display-sm">Một phòng triển lãm cho thời trang.</h2>
          <Sparkle />
          <p className="muted">Trần kính lấy sáng tự nhiên, sàn đá xám và những khối trưng bày tối giản: flagship store của LSOUL được thiết kế để mỗi bộ trang phục được nhìn như một tác phẩm. Khách có thể đặt lịch thử đồ riêng với stylist và được đo corset trực tiếp.</p>
          <ul className="store-info">
            <li><b>Giờ mở cửa</b><span>10:00 – 22:00 hằng ngày</span></li>
            <li><b>Dịch vụ</b><span>Đo corset · Styling 1:1 · Gói quà</span></li>
          </ul>
          <button className="btn" onClick={() => notify('Đã ghi nhận yêu cầu đặt lịch (demo)')}>Đặt lịch thử đồ</button>
        </div>
        <figure className="store-body__media"><Img name="storeB" w={600} alt="Không gian bên trong store" className="store-body__img" /></figure>
      </section>
    </main>
  );
}
