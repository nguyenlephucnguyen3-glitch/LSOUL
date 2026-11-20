import { Link } from '../router.jsx';
import Img from '../components/Img.jsx';
import { ArrowIcon, Sparkle } from '../components/Icons.jsx';
import { SITE } from '../data/site.js';
import { useSeo } from '../seo.js';
import { imgUrl } from '../data/images.js';

// Brand Storytelling — nội dung mang tính tuyên ngôn; thay bằng câu chuyện thật của thương hiệu khi có.
const PILLARS = [
  { n: '01', title: 'Corset', text: 'Không phải để gò bó, mà để đứng thẳng hơn. Phần corset được dựng như một cấu trúc kiến trúc, ôm lấy cơ thể thay vì ép nó vào khuôn.' },
  { n: '02', title: 'Xếp nếp & nơ', text: 'Những chi tiết lãng mạn của thời Victoria được giữ lại, nhưng cắt gọn và đặt đúng chỗ, để sự nữ tính không bao giờ trở thành sến.' },
  { n: '03', title: 'Ren & chuyển động', text: 'Bèo tầng, organza và ren được chọn vì cách chúng chuyển động theo từng bước chân — thời trang để sống, không chỉ để chụp.' },
];

const PROCESS = [
  { img: 'noir2', title: 'Phác thảo', text: 'Mỗi thiết kế bắt đầu từ một dáng người và một tâm trạng, không phải từ xu hướng.' },
  { img: 'rouge2', title: 'Dựng rập', text: 'Rập corset được chỉnh nhiều lần trên người mẫu thật để phần eo vừa ôm vừa thoải mái.' },
  { img: 'cloud1', title: 'Định hình', text: 'Xương mềm và lớp lót tạo nên phom 3D — thứ khiến chiếc đầm tự đứng được trên cơ thể.' },
  { img: 'aqua2', title: 'Hoàn thiện', text: 'Bèo, nơ và ren được đính tay ở công đoạn cuối, từng chi tiết một.' },
];

export default function Story() {
  useSeo({
    title: 'Our Story',
    description: 'Câu chuyện LSOUL: lãng mạn kiểu Victoria, tinh thần độc lập hiện đại. Đằng sau mỗi chiếc corset là quá trình phác thảo, dựng rập và hoàn thiện thủ công.',
    image: imgUrl('runway', 1200),
  });

  return (
    <main className="page story-page">
      <section className="sp-hero">
        <Img name="runway" w={2000} alt="Sàn diễn LSOUL" priority className="sp-hero__img" />
        <div className="sp-hero__copy">
          <p className="eyebrow">Our story</p>
          <h1 className="sp-hero__title">{SITE.slogan}.</h1>
        </div>
      </section>

      <section className="sp-manifesto">
        <p className="eyebrow">Tuyên ngôn</p>
        <p className="sp-manifesto__text">
          LSOUL không bán một hình mẫu để bạn trở thành. Chúng tôi tạo ra những thiết kế có cấu trúc — corset, xếp nếp, nơ và ren —
          rồi trao lại cho bạn quyền quyết định <em>mặc chúng theo cách nào</em>.
        </p>
        <Sparkle />
      </section>

      <section className="section">
        <div className="section__head section__head--center">
          <p className="eyebrow">Victorian, rewritten</p>
          <h2 className="display">Ba điều làm nên LSOUL</h2>
        </div>
        <div className="sp-pillars">
          {PILLARS.map((p) => (
            <article key={p.n}>
              <span>{p.n}</span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="sp-process">
        <div className="section__head">
          <div>
            <p className="eyebrow">Behind the scenes</p>
            <h2 className="display display--light">Đằng sau một chiếc corset</h2>
          </div>
        </div>
        <ol className="sp-process__list">
          {PROCESS.map((s, i) => (
            <li key={s.title}>
              <figure><Img name={s.img} w={700} alt={s.title} /></figure>
              <span>Bước {i + 1}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="sp-designer">
        <figure><Img name="venue" w={1400} alt="Hậu trường show LSOUL" /></figure>
        <div>
          <p className="eyebrow">The designers</p>
          <h2 className="display-sm">Những người đứng sau mỗi bộ sưu tập</h2>
          <p className="muted">
            Đội ngũ thiết kế của LSOUL làm việc như một atelier: mỗi mùa bắt đầu bằng những bản phác tay, đi qua hàng chục lần thử trên người mẫu,
            và chỉ kết thúc khi chiếc váy vừa đẹp trên sàn diễn vừa dễ mặc ngoài đời.
          </p>
          <Link to="/lookbook" className="link-arrow">Xem lookbook AW26 <ArrowIcon width={14} height={14} /></Link>
        </div>
      </section>

      <section className="sp-cta">
        <h2 className="display">Bây giờ, đến lượt bạn.</h2>
        <p className="muted">Chia sẻ cách bạn mặc LSOUL với {SITE.hashtag}.</p>
        <div className="sp-cta__btns">
          <Link to="/community" className="btn">Tham gia cộng đồng <ArrowIcon width={16} height={16} /></Link>
          <Link to="/shop" className="btn btn--outline">Khám phá bộ sưu tập</Link>
        </div>
      </section>
    </main>
  );
}
