import { useStore } from '../context/StoreContext.jsx';

export default function Toast() {
  const { toast } = useStore();
  return (
    <div className={`toast ${toast ? 'is-on' : ''}`} role="status" aria-live="polite" key={toast?.key}>
      {toast?.msg}
    </div>
  );
}
