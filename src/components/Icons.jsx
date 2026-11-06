const base = { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.4, strokeLinecap: 'round', strokeLinejoin: 'round' };
const I = (paths) => (props) => <svg {...base} {...props} aria-hidden="true">{paths}</svg>;

export const SearchIcon = I(<><circle cx="11" cy="11" r="6.5" /><path d="m20 20-4.2-4.2" /></>);
export const UserIcon = I(<><circle cx="12" cy="8" r="4" /><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" /></>);
export const BagIcon = I(<><path d="M5 8h14l-1.2 12.5H6.2L5 8Z" /><path d="M9 8V6.5a3 3 0 0 1 6 0V8" /></>);
export const HeartIcon = ({ filled, ...p }) => (
  <svg {...base} {...p} fill={filled ? 'currentColor' : 'none'} aria-hidden="true">
    <path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.3a4.3 4.3 0 0 1 7.5 2.5C19.5 15.4 12 20 12 20Z" />
  </svg>
);
export const ArrowIcon = I(<><path d="M4 12h15" /><path d="m14 7 5 5-5 5" /></>);
export const CloseIcon = I(<><path d="M6 6l12 12" /><path d="M18 6 6 18" /></>);
export const MenuIcon = I(<><path d="M4 8h16" /><path d="M4 16h16" /></>);
export const HangerIcon = I(<><path d="M12 7.5a2 2 0 1 1 2-2" /><path d="M12 7.5V9L3 16.5h18L12 9" /></>);
export const FeatherIcon = I(<><path d="M20 4C11 4 6 9 6 18" /><path d="M20 4c0 8-5 12-11 12" /><path d="M4 20l2-2" /></>);
export const GlobeIcon = I(<><circle cx="12" cy="12" r="8.5" /><path d="M3.5 12h17" /><path d="M12 3.5c2.5 2.6 3.5 5.5 3.5 8.5s-1 5.9-3.5 8.5c-2.5-2.6-3.5-5.5-3.5-8.5s1-5.9 3.5-8.5Z" /></>);
export const LockIcon = I(<><rect x="5" y="10.5" width="14" height="10" rx="1" /><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" /></>);
export const BoxIcon = I(<><path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" /><path d="m4 7.5 8 4.5 8-4.5" /><path d="M12 12v9" /></>);
export const TruckIcon = I(<><path d="M3 6h11v10H3z" /><path d="M14 9.5h4l3 3.5v3h-7" /><circle cx="7" cy="17.5" r="1.8" /><circle cx="17.5" cy="17.5" r="1.8" /></>);
export const HeadsetIcon = I(<><path d="M4.5 14v-2a7.5 7.5 0 0 1 15 0v2" /><rect x="3.5" y="13" width="4" height="6" rx="1" /><rect x="16.5" y="13" width="4" height="6" rx="1" /><path d="M18.5 19c0 1.5-2 2-5 2" /></>);
export const PlusIcon = I(<><path d="M12 5v14" /><path d="M5 12h14" /></>);
export const MinusIcon = I(<path d="M5 12h14" />);

export function Sparkle() {
  return (
    <span className="sparkle-rule" aria-hidden="true">
      <span /> <svg width="12" height="12" viewBox="0 0 12 12"><path d="M6 0c.4 3.3 2.7 5.6 6 6-3.3.4-5.6 2.7-6 6-.4-3.3-2.7-5.6-6-6 3.3-.4 5.6-2.7 6-6Z" fill="currentColor" /></svg> <span />
    </span>
  );
}
