import React from 'react';
import ReactDOM from 'react-dom/client';
import './resources/styles/index.css';
import Home from './components/Home';
import Favorite from './components/Favorite';
import Empty from './components/404';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const apiKey = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGIzM2JmYmZhMjhiN2MwYmVjODMwMzU4YmU2YWZiMyIsInN1YiI6IjY0N2U0ZTAwY2Y0YjhiMDBhODc4YzAwNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jcw-EQTEaHzMLTHRtaLU1yvE2AV8o7xPH4_aDLhNR1c",
  },
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <React.StrictMode>
      <Routes>
        <Route exact path="/" element={<Home apiKey={apiKey} />} />
        <Route exact path="/favorite" element={<Favorite apiKey={apiKey} />} />
        <Route path="*" element={<Empty />} />
      </Routes>
    </React.StrictMode>
  </Router>
);

reportWebVitals();
