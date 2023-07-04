import React from "react";
import SearchInput from './SearchInput';
import "bootstrap/dist/js/bootstrap.min.js";
import logo from "../../resources/images/logo.png";
import { Link } from 'react-router-dom';

function Menu(props) {
  const apiKey = props.apiKey;

  return (
      <nav className="navbar navbar-expand-lg sticky-top navbar-dark bg-dark bagel">
        <div className="container">
          
          <img src={logo} className="logo" alt="Logo" />

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>          

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
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
