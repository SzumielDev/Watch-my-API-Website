import React from "react";
import Home from "./ReusableComponents/Home";
import Menu from "./ReusableComponents/Menu";
import Footer from "./ReusableComponents/Footer";
import "bootstrap/dist/css/bootstrap.min.css";

function Dom() {
  const apiKey = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGIzM2JmYmZhMjhiN2MwYmVjODMwMzU4YmU2YWZiMyIsInN1YiI6IjY0N2U0ZTAwY2Y0YjhiMDBhODc4YzAwNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jcw-EQTEaHzMLTHRtaLU1yvE2AV8o7xPH4_aDLhNR1c",
    },
  };

  return (
    <div className="bg-custom">
      <Menu />
      <Home apiKey={apiKey} />
      <Footer />
    </div>
  );
}

export default Dom;
