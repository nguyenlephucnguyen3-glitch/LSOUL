import { useState } from 'react';
import { imgUrl } from '../data/images.js';

// Ảnh có hiệu ứng fade-in khi tải xong, lazy-load mặc định.
export default function Img({ name, w = 1000, alt = '', className = '', priority = false, style }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <img
      src={imgUrl(name, w)}
      alt={alt}
      className={`img ${loaded ? 'is-loaded' : ''} ${className}`}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      referrerPolicy="no-referrer"
      onLoad={() => setLoaded(true)}
      style={style}
    />
  );
}
