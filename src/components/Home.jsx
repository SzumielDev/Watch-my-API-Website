import React, { useState, useEffect } from "react";
import HomePattern from "./HomePattern";

function Home(props) {
  const [popularMovies, setPopularMovies] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const apiKey = props.apiKey;

  let apiPopularMovies =
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";

  useEffect(() => {
    fetch(apiPopularMovies, apiKey)
      .then((response) => response.json())
      .then((response) => setPopularMovies(response))
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const loadingScreen = () => {
    return (
      <div className="container-xl min-vh-100">
        <p className="text-white text-center pt-5 pb-5 text-center">
          Trwa ładowanie strony...
        </p>
      </div>
    );
  };

  useEffect(() => {
    if (popularMovies != null) {
      setIsLoaded(true);
    }
  }, [popularMovies]);

  const renderHomeComponent = () => {
    const movieList = popularMovies.results.map((movie, index) => (
      <HomePattern
        key={index}
        overview={movie.overview}
        title={movie.title}
        img={movie.backdrop_path}
        release={movie.release_date}
      />
    ));
    return <div className="row">{movieList}</div>;
  };

  return (
    <div className="container-xl">
      <div className="row">
        <div className="col">
          <p className="text-center text-white bagel h5 pt-4">
            THE MOST POPULAR MOVIES TODAY
          </p>
          <p className="text-center text-white description pb-4">
            Below you will find a list of the top 20 most popular movies today.
          </p>
        </div>
      </div>
      {isLoaded ? renderHomeComponent() : loadingScreen()}
    </div>
  );
}

export default Home;
