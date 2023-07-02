import React from 'react';
import ReactDOM from 'react-dom/client';
import './resources/styles/index.css';
import Dom from './components/Dom';
import Favorite from './components/Favorite';
import Empty from './components/Empty';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <React.StrictMode>
      <Routes>
        <Route exact path="/" element={<Dom />} />
        <Route exact path="/favorite" element={<Favorite />} />
        <Route element={<Empty />} />
      </Routes>
    </React.StrictMode>
  </Router>
);

reportWebVitals();
