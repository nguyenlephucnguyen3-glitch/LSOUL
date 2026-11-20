import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { StoreProvider } from './context/StoreContext.jsx';
import App from './App.jsx';
import './styles.css';
import { initAnalytics } from './analytics.js';

initAnalytics();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
  </StrictMode>,
);
