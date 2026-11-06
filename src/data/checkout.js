// Cấu hình giả lập cho luồng đặt hàng (mock) — không có thanh toán thật.

export const FREE_SHIP_MIN = 1500000;

export const CITIES = [
  'TP. Hồ Chí Minh', 'Hà Nội', 'Đà Nẵng', 'Cần Thơ', 'Hải Phòng',
  'Bình Dương', 'Đồng Nai', 'Khánh Hòa', 'Lâm Đồng', 'Thừa Thiên Huế', 'Tỉnh/thành khác',
];

export const SHIPPING = [
  { key: 'standard', label: 'Tiêu chuẩn', note: '2–4 ngày làm việc', fee: 30000 },
  { key: 'express', label: 'Hỏa tốc', note: 'Trong 2 giờ · chỉ TP.HCM & Hà Nội', fee: 60000, cities: ['TP. Hồ Chí Minh', 'Hà Nội'] },
];

export const PAYMENTS = [
  { key: 'cod', label: 'Thanh toán khi nhận hàng (COD)', note: 'Trả tiền mặt cho shipper' },
  { key: 'bank', label: 'Chuyển khoản ngân hàng', note: 'Quét mã QR sau khi đặt' },
  { key: 'momo', label: 'Ví MoMo', note: 'Chuyển hướng tới ví (giả lập)' },
];

export const GIFT_WRAP_FEE = 50000;

export const VOUCHERS = {
  LSOUL10: { label: 'Giảm 10% đơn hàng', type: 'percent', value: 10 },
  WELCOME200: { label: 'Giảm 200.000₫ cho đơn từ 2.000.000₫', type: 'amount', value: 200000, min: 2000000 },
  FREESHIP: { label: 'Miễn phí giao hàng', type: 'ship' },
};

export const ORDER_STEPS = ['Đã đặt hàng', 'Đã xác nhận', 'Đang đóng gói', 'Đang giao', 'Đã giao'];

// Giả lập tiến trình: cứ 2 phút đơn hàng chuyển sang bước tiếp theo.
export function orderStep(order, now = Date.now()) {
  if (order.cancelled) return -1;
  return Math.min(ORDER_STEPS.length - 1, Math.floor((now - order.createdAt) / 120000));
}

export function calcTotals({ subtotal, shipping, city, voucher, giftWrap }) {
  const method = SHIPPING.find((s) => s.key === shipping) || SHIPPING[0];
  let ship = method.key === 'standard' && subtotal >= FREE_SHIP_MIN ? 0 : method.fee;
  let discount = 0;
  const v = voucher && VOUCHERS[voucher];
  if (v?.type === 'percent') discount = Math.round((subtotal * v.value) / 100);
  if (v?.type === 'amount' && subtotal >= (v.min || 0)) discount = v.value;
  if (v?.type === 'ship') ship = 0;
  const gift = giftWrap ? GIFT_WRAP_FEE : 0;
  return { ship, discount, gift, total: Math.max(0, subtotal - discount) + ship + gift, method, city };
}
