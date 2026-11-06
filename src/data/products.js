export const CATEGORIES = [
  { key: 'all', label: 'Tất cả' },
  { key: 'corset', label: 'Corset' },
  { key: 'dresses', label: 'Dresses' },
  { key: 'sets', label: 'Sets' },
  { key: 'ruffle', label: 'Ruffle & Bow' },
];

export const SIZES = ['XS', 'S', 'M', 'L'];

export const PRODUCTS = [
  {
    id: 'noir-bustier',
    name: 'Noir Bustier Dress',
    price: 2490000,
    category: 'corset',
    tag: 'Bestseller',
    colors: [{ name: 'Jet Black', hex: '#0B0B0B' }],
    images: ['noir3', 'noir1', 'noir2'],
    desc: 'Đầm bustier đen với phần corset dựng 3D, khoét giọt nước ở ngực và chân váy xòe ngắn. Một thiết kế dành cho những buổi tối cần sự quyền lực tuyệt đối.',
    details: ['Corset 12 xương mềm, ôm sát eo', 'Khóa kéo ẩn sau lưng', 'Vải tafta pha, có lót', 'Giặt khô'],
  },
  {
    id: 'rouge-corset',
    name: 'Rouge Corset Mini',
    price: 2290000,
    category: 'corset',
    tag: 'New',
    colors: [{ name: 'Rouge', hex: '#B0182A' }],
    images: ['rouge4', 'rouge1', 'rouge2', 'rouge3'],
    desc: 'Mini dress đỏ rượu với ngực corset đường cong mềm và lưng dây đan chéo. Lãng mạn kiểu Victoria, sắc sảo kiểu hiện đại.',
    details: ['Ngực corset định hình', 'Lưng đan dây điều chỉnh', 'Satin lụa có độ đứng', 'Giặt tay nước lạnh'],
  },
  {
    id: 'ivory-mini',
    name: 'Ivory Halter Mini',
    price: 1990000,
    category: 'dresses',
    tag: 'New',
    colors: [{ name: 'Ivory', hex: '#F2EDE2' }],
    images: ['ivory1', 'ivory2', 'ivory3'],
    desc: 'Đầm cổ yếm trắng ngà, thân trên xếp nếp, chân váy xòe phồng nhẹ như cánh hoa.',
    details: ['Cổ yếm buộc nơ sau gáy', 'Thân xếp nếp thủ công', 'Chân váy 2 lớp', 'Giặt khô'],
  },
  {
    id: 'cloud-puff',
    name: 'Cloud Puff Off-Shoulder',
    price: 2690000,
    category: 'ruffle',
    colors: [{ name: 'Ivory', hex: '#F6F2EA' }],
    images: ['cloud2', 'cloud1', 'cloud3'],
    desc: 'Tay phồng trễ vai và chân váy bong bóng, như một đám mây được may đo. Phom dáng cấu trúc cao dành cho những ngày muốn được nhìn thấy.',
    details: ['Tay bồng có gọng mềm', 'Chân váy bubble 3 lớp', 'Corset lưng thắt dây', 'Giặt khô'],
  },
  {
    id: 'aqua-cascade',
    name: 'Aqua Cascade Ruffle',
    price: 2890000,
    category: 'ruffle',
    tag: 'Runway',
    colors: [{ name: 'Seafoam', hex: '#B9DDD4' }],
    images: ['aqua3', 'aqua1', 'aqua2'],
    desc: 'Bèo nhún tầng tầng đổ xuống như sóng, phần corset thắt dây phía sau. Thiết kế xuất hiện trên sàn diễn mùa này.',
    details: ['Bèo organza cắt laser', 'Corset thắt dây lưng', 'Tà xéo bất đối xứng', 'Giặt khô'],
  },
  {
    id: 'gingham-halter',
    name: 'Picnic Gingham Halter',
    price: 1790000,
    category: 'dresses',
    colors: [
      { name: 'Cherry', hex: '#C8323C' },
      { name: 'Ivory', hex: '#F6F2EA' },
    ],
    images: ['gingham2', 'gingham1', 'gingham3'],
    desc: 'Caro đỏ cổ điển trên phom cổ yếm xẻ sâu, chân váy xếp ly ngắn. Ngọt ngào nhưng không hề ngây thơ.',
    details: ['Cotton caro dệt', 'Cổ yếm buộc sau gáy', 'Chân váy xếp ly', 'Giặt máy chế độ nhẹ'],
  },
  {
    id: 'powder-blue',
    name: 'Powder Blue Babydoll',
    price: 1690000,
    category: 'dresses',
    colors: [{ name: 'Powder Blue', hex: '#AFC8E6' }],
    images: ['blue1', 'blue2'],
    desc: 'Babydoll xanh phấn hai dây mảnh, chân váy xòe nhẹ. Tối giản và mềm mại.',
    details: ['Dây vai điều chỉnh', 'Lụa satin', 'Có lót', 'Giặt tay'],
  },
  {
    id: 'seafoam-set',
    name: 'Seafoam Ruffle Set',
    price: 2190000,
    category: 'sets',
    colors: [
      { name: 'Seafoam', hex: '#B9DDD4' },
      { name: 'Ivory', hex: '#F6F2EA' },
    ],
    images: ['seafoam1', 'seafoam2'],
    desc: 'Áo sơ mi bèo trắng tay loe phối chân váy ngắn xanh mint xếp tầng. Bộ đôi cho những ngày nắng.',
    details: ['Set 2 món', 'Áo voan bèo tay loe', 'Chân váy tầng bèo', 'Giặt tay'],
  },
  {
    id: 'sand-lace',
    name: 'Sand Lace Mini',
    price: 2090000,
    category: 'sets',
    colors: [{ name: 'Sand', hex: '#D9C2A6' }],
    images: ['sand3', 'sand1', 'sand2'],
    desc: 'Mini dress màu cát với ren viền và thân corset, vẻ đẹp cổ điển cho ban ngày.',
    details: ['Ren viền thủ công', 'Thân corset nhẹ', 'Chân váy tầng ngắn', 'Giặt khô'],
  },
];

export const formatPrice = (vnd) =>
  vnd.toLocaleString('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 });

export const getProduct = (id) => PRODUCTS.find((p) => p.id === id);
