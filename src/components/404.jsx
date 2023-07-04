import React from "react";
import { Link } from 'react-router-dom';

function Empty() {
  return (
    <div className="bg-custom">
        <div className="container">
          <div className="row">
            <div className="col text-center text-decoration-none pt-5">
              <Link to="/">GO TO THE MAIN PAGE</Link>
            </div>
          </div>
        </div>
        <div className="container min-vh-100">
          <div className="row">
            <div className="col">
              <h1 className="text-center text-white oswald pt-5">
                404
              </h1>
              <h3 className="text-center text-white oswald">
                PAGE NOT DOUND
              </h3>
            </div>
          </div>
        </div>
    </div>
  );
}

export default Empty;
