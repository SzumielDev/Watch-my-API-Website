import React, { useEffect, useState } from "react";
import Home from "./Home";
import Footer from "./Footer";
import SearchInput from './SearchInput';
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../resources/images/logo.png";

function Dom() {
  const apiKey = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGIzM2JmYmZhMjhiN2MwYmVjODMwMzU4YmU2YWZiMyIsInN1YiI6IjY0N2U0ZTAwY2Y0YjhiMDBhODc4YzAwNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jcw-EQTEaHzMLTHRtaLU1yvE2AV8o7xPH4_aDLhNR1c",
    },
  };

  const [activeComponent, setActiveComponent] = useState();

  const handleButtonClick = (component) => {
    setActiveComponent(component);
  }

  useEffect(() => {
    const storedComponent = localStorage.getItem('activeComponent');
    if (storedComponent) {
      setActiveComponent(storedComponent);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('activeComponent', activeComponent);
  }, [activeComponent]);

  return (
    <div className="bg-custom">
      <nav className="navbar navbar-expand-lg sticky-top navbar-dark bg-dark bagel">
        <div className="container">
          <img src={logo} className="logo" />
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
                <button onClick={() => handleButtonClick('Home')} className="nav-link">HOME</button>
              </li>
              <li className="nav-item">
                <button onClick={() => handleButtonClick('Search')} className="nav-link">FAVORITE</button>
              </li>
            </ul>
          </div>
          <SearchInput apiKey={apiKey} />
        </div>
      </nav>
      {activeComponent === 'Home' && <Home apiKey={apiKey} />}
      <Footer />
    </div>
  );
}

export default Dom;
