import React from "react";
import SearchInput from './SearchInput';
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../resources/images/logo.png";
import { Link } from 'react-router-dom';

function Menu() {
  const apiKey = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGIzM2JmYmZhMjhiN2MwYmVjODMwMzU4YmU2YWZiMyIsInN1YiI6IjY0N2U0ZTAwY2Y0YjhiMDBhODc4YzAwNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jcw-EQTEaHzMLTHRtaLU1yvE2AV8o7xPH4_aDLhNR1c",
    },
  };

  return (
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
                <Link to="/"><button className="nav-link">HOME</button></Link>
              </li>
              <li className="nav-item">
                <Link to="/favorite"><button className="nav-link">FAVORITE</button></Link>
              </li>
            </ul>
          </div>
          <SearchInput apiKey={apiKey} />
        </div>
      </nav>
  );
}

export default Menu;
