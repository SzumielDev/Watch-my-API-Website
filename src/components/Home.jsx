import React from "react";
import MostPopular from "./ReusableComponents/MostPopular";
import Menu from "./ReusableComponents/Menu";
import Footer from "./ReusableComponents/Footer";

function Home(props) {
  const apiKey = props.apiKey;

  return (
    <div className="bg-custom">
      <Menu apiKey={apiKey} />
      <MostPopular apiKey={apiKey} />
      <Footer />
    </div>
  );
}

export default Home;
