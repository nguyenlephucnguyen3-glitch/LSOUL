// Real Styling: mỗi thiết kế có 3 cách phối theo dịp, kèm sản phẩm LSOUL gợi ý mặc cùng / thay thế.
export const OCCASIONS = [
  { key: 'work', label: 'Đi làm' },
  { key: 'date', label: 'Hẹn hò' },
  { key: 'street', label: 'Dạo phố' },
];

export const STYLING = {
  'noir-bustier': {
    work: { tip: 'Khoác blazer dáng dài để phần corset chỉ lộ ra một nửa — quyền lực mà vẫn kín đáo.', pieces: ['Blazer đen oversize', 'Giày mũi nhọn gót thấp', 'Túi hộp cầm tay'], with: 'sand-lace' },
    date: { tip: 'Để corset là điểm nhấn duy nhất: tóc búi thấp, môi đỏ trầm, khuyên tai bạc.', pieces: ['Khuyên tai bạc dáng giọt', 'Sandal quai mảnh', 'Clutch satin'], with: 'rouge-corset' },
    street: { tip: 'Phá chất tiệc bằng boots cao cổ và kính mắt dáng thể thao.', pieces: ['Boots da cổ cao', 'Kính mắt shield', 'Áo khoác da lửng'], with: 'powder-blue' },
  },
  'rouge-corset': {
    work: { tip: 'Phủ một lớp cardigan len mỏng màu kem, cài hai khuy giữa để giữ dáng eo.', pieces: ['Cardigan len kem', 'Giày Mary Jane', 'Túi tote da'], with: 'ivory-mini' },
    date: { tip: 'Sắc đỏ đã đủ nói lên tất cả — chỉ cần thêm một sợi dây chuyền mảnh.', pieces: ['Dây chuyền bạc mảnh', 'Giày slingback', 'Túi mini'], with: 'noir-bustier' },
    street: { tip: 'Mix với boots nâu và áo khoác jean để màu đỏ trở nên đời thường hơn.', pieces: ['Áo khoác jean', 'Boots nâu', 'Túi đeo chéo'], with: 'gingham-halter' },
  },
  'ivory-mini': {
    work: { tip: 'Thêm áo sơ mi trắng mặc bên trong và blazer màu be cho văn phòng.', pieces: ['Sơ mi trắng cổ đứng', 'Blazer be', 'Loafer da'], with: 'sand-lace' },
    date: { tip: 'Giữ trọn tông trắng ngà, chỉ điểm thêm nơ lụa trên tóc.', pieces: ['Nơ lụa cài tóc', 'Giày búp bê', 'Túi ngọc trai'], with: 'cloud-puff' },
    street: { tip: 'Boots nâu cao cổ khiến chiếc đầm xòe bớt tiểu thư, thêm phần cá tính.', pieces: ['Boots nâu cao cổ', 'Áo khoác da', 'Túi bucket'], with: 'seafoam-set' },
  },
  'cloud-puff': {
    work: { tip: 'Khoác vest không tay bên ngoài để làm phẳng phần tay bồng.', pieces: ['Vest dáng dài', 'Giày mũi vuông', 'Túi structured'], with: 'ivory-mini' },
    date: { tip: 'Phom bồng là nhân vật chính — tóc vén gọn, phụ kiện tối thiểu.', pieces: ['Hoa tai ngọc trai', 'Giày ballet satin', 'Clutch nhỏ'], with: 'aqua-cascade' },
    street: { tip: 'Tất lưới mảnh và giày đế dày tạo độ tương phản thú vị với chất liệu bồng bềnh.', pieces: ['Tất lưới mảnh', 'Giày đế dày', 'Túi đeo vai'], with: 'gingham-halter' },
  },
  'aqua-cascade': {
    work: { tip: 'Mặc cùng áo khoác dáng hộp cùng tông xanh nhạt, để lộ phần bèo phía dưới.', pieces: ['Áo khoác dáng hộp', 'Giày mule', 'Túi tote'], with: 'seafoam-set' },
    date: { tip: 'Bèo tầng đã đủ chuyển động — chọn giày quai mảnh để đôi chân thật thanh.', pieces: ['Sandal quai mảnh', 'Lắc tay bạc', 'Clutch trong'], with: 'cloud-puff' },
    street: { tip: 'Boots cổ cao và áo thun ôm biến chiếc đầm sàn diễn thành outfit cuối tuần.', pieces: ['Boots đen cổ cao', 'Áo thun ôm', 'Túi đeo hông'], with: 'powder-blue' },
  },
  'gingham-halter': {
    work: { tip: 'Áo cardigan ngắn màu đỏ cherry khoác ngoài giúp phần cổ yếm kín đáo hơn.', pieces: ['Cardigan ngắn', 'Giày Mary Jane', 'Túi mây'], with: 'ivory-mini' },
    date: { tip: 'Tóc buộc nơ, giày búp bê — đúng tinh thần picnic.', pieces: ['Nơ buộc tóc', 'Giày búp bê đỏ', 'Giỏ mây'], with: 'rouge-corset' },
    street: { tip: 'Sneakers trắng và kính mát tròn cho một ngày dạo phố.', pieces: ['Sneakers trắng', 'Kính mát tròn', 'Túi canvas'], with: 'sand-lace' },
  },
  'powder-blue': {
    work: { tip: 'Áo len cổ tròn mặc bên trong biến babydoll thành chiếc chân váy dễ mặc.', pieces: ['Áo len mỏng', 'Loafer', 'Túi da nhỏ'], with: 'seafoam-set' },
    date: { tip: 'Giữ trọn sự mềm mại với giày satin và khuyên tai ngọc trai.', pieces: ['Giày satin', 'Khuyên tai ngọc trai', 'Túi mini'], with: 'ivory-mini' },
    street: { tip: 'Khoác áo bomber và đi boots để màu xanh phấn bớt ngọt.', pieces: ['Áo bomber', 'Boots da', 'Túi đeo chéo'], with: 'noir-bustier' },
  },
  'seafoam-set': {
    work: { tip: 'Thay chân váy bằng quần âu trắng, giữ lại áo bèo làm điểm nhấn.', pieces: ['Quần âu trắng', 'Giày mule', 'Túi tote'], with: 'sand-lace' },
    date: { tip: 'Mặc trọn set, thêm kính mát gọng mảnh và sandal.', pieces: ['Kính mát gọng mảnh', 'Sandal đế bệt', 'Túi mây'], with: 'aqua-cascade' },
    street: { tip: 'Tách áo bèo mặc với jean ống rộng — nhẹ nhàng và rất đời thường.', pieces: ['Jean ống rộng', 'Sneakers', 'Túi canvas'], with: 'powder-blue' },
  },
  'sand-lace': {
    work: { tip: 'Áo blazer màu nâu nhạt cùng tông cát cho vẻ thanh lịch.', pieces: ['Blazer nâu nhạt', 'Loafer da', 'Túi structured'], with: 'ivory-mini' },
    date: { tip: 'Phần ren viền là điểm nhấn — tóc xõa gợn sóng, son hồng đất.', pieces: ['Kẹp tóc ngọc trai', 'Sandal quai mảnh', 'Clutch nhỏ'], with: 'cloud-puff' },
    street: { tip: 'Sandal bệt và túi mây cho những buổi chiều đi dạo.', pieces: ['Sandal bệt', 'Túi mây', 'Mũ bucket'], with: 'gingham-halter' },
  },
};
