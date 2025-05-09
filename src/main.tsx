import * as React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

// Add iOS edge blocker to prevent swipe back
if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
  const edgeBlocker = document.createElement('div');
  edgeBlocker.className = 'ios-edge-blocker';
  document.body.appendChild(edgeBlocker);
  
  // Add meta tag to prevent zooming
  const viewportMeta = document.querySelector('meta[name="viewport"]');
  if (viewportMeta) {
    viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover');
  }
  
  // Prevent iOS bounce effect
  document.body.style.overscrollBehavior = 'none';
  
  // Handle iOS swipe back gesture
  document.addEventListener('touchstart', function(e) {
    const touchX = e.touches[0].clientX;
    // If touch starts near the left edge (less than 30px), prevent default
    if (touchX < 30) {
      e.preventDefault();
    }
  }, { passive: false });
}

// Add debugging for production white screen issue
console.log('🔍 Debug: main.tsx is executing');
console.log('🔍 React version:', React?.version);
console.log('🔍 Environment:', import.meta.env.MODE);
console.log('🔍 React available:', Boolean(React));
console.log('🔍 createContext available:', Boolean(React?.createContext));
console.log('🔍 forwardRef available:', Boolean(React?.forwardRef));

try {
  console.log('🔍 Debug: Attempting to render app');
  const rootElement = document.getElementById('root');
  
  if (!rootElement) {
    console.error('🔍 Debug: Root element not found');
    throw new Error('Root element not found');
  }

  console.log('🔍 Debug: Root element found, creating root');
  const root = createRoot(rootElement);
  
  console.log('🔍 Debug: Rendering app with React version:', React.version);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log('🔍 Debug: App rendered successfully');
} catch (error) {
  console.error('🔍 Debug: Error rendering app:', error);
  
  // Add error details to the DOM for visibility in case console isn't accessible
  const errorElement = document.createElement('div');
  errorElement.style.padding = '20px';
  errorElement.style.margin = '20px';
  errorElement.style.backgroundColor = '#f8d7da';
  errorElement.style.color = '#721c24';
  errorElement.style.borderRadius = '5px';
  errorElement.style.fontFamily = 'monospace';
  errorElement.innerHTML = `
    <h2>Error Rendering App</h2>
    <p>${error instanceof Error ? error.message : String(error)}</p>
    <p>Stack: ${error instanceof Error ? error.stack?.replace(/\n/g, '<br>') : 'No stack trace available'}</p>
  `;
  document.body.appendChild(errorElement);
}