import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

try {
  const rootElement = document.getElementById('root');
  
  if (!rootElement) {
    throw new Error('Failed to find root element. Make sure there is a <div id="root"></div> in your HTML file.');
  }

  const root = createRoot(rootElement);
  
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
} catch (error) {
  console.error('Failed to initialize application:', error);
}