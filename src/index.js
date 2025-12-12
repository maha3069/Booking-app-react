import React from 'react';
import { createRoot } from 'react-dom/client';  // New import
import App from './components/App.js';

const container = document.getElementById('root');
const root = createRoot(container);  // Create root
root.render(<App />);  // Use root.render()
