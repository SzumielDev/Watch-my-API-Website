import React from 'react';
import ReactDOM from 'react-dom/client';
import './resources/styles/index.css';
import Dom from './components/Dom';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Dom />
  </React.StrictMode>
);
reportWebVitals();
