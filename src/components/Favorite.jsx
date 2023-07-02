import React, { useState, useEffect } from "react";
import MovieLoopPattern from "./ReusableComponents/MovieLoopPattern";
import ObjectDetails from "./ReusableComponents/ObjectDetails";
import Menu from "./ReusableComponents/Menu";
import Footer from "./ReusableComponents/Footer";
import RemoveFavoriteListButton from "./ReusableComponents/RemoveFavoriteListButton";

function Favorite() {
  const apiKey = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGIzM2JmYmZhMjhiN2MwYmVjODMwMzU4YmU2YWZiMyIsInN1YiI6IjY0N2U0ZTAwY2Y0YjhiMDBhODc4YzAwNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jcw-EQTEaHzMLTHRtaLU1yvE2AV8o7xPH4_aDLhNR1c",
    },
  };
  const [objectDetails, setObjectDetails] = useState(undefined);
  const [storedFavorites, setStoredFavorites] = useState(JSON.parse(localStorage.getItem("favorite")));
  const [favoriteDataArray, setFavoriteDataArray] = useState([]);

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    tryToRenderComponent();
  }, [storedFavorites])

  const tryToRenderComponent = async () => {
    if (storedFavorites != undefined) {
      let basicArray = [];
      try {
        for (const id of storedFavorites) {
          const data = await downloadDataFromApi(id);
          pushNewDataToArray(data, basicArray);
        }

        setIsReady(true);
        setFavoriteDataArray(basicArray);

      } catch (error) {
        console.error(error);
      }
    }
  };

  const downloadDataFromApi = async (idMovie) => {
    let apiCustomLink =
      "https://api.themoviedb.org/3/movie/" + idMovie + "?language=en-US";
    try {
      const response = await fetch(apiCustomLink, apiKey);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const pushNewDataToArray = (data, array) => {
    const idToFind = data.id;
    const findId = array.findIndex((obj) => obj.id === idToFind);
    if (findId === -1) {
      array.push(data);
    }
  };

  const renderComponent = () => {
    if (favoriteDataArray != "") {
      const favoriteList = favoriteDataArray.map((movie, index) => {
        return (
          <div
            key={index}
            className="col-md-3 pt-2 movie-pattern position-relative"
          >
            <MovieLoopPattern
              onClick={() => {
                setObjectDetails(movie.id);
              }}
              overview={movie.overview}
              title={movie.title}
              img={movie.backdrop_path}
              release={movie.release_date}
            />
          </div>
        );
      });
      return <div className="row">{favoriteList}</div>;
    } else {
      return (
        <div className="container-xl">
          <p className="text-white text-center pt-5 pb-5 text-center description">
            - THE FAVORITE LIST IS EMPTY -
          </p>
        </div>
      );
    }
  };

  const loadingScreen = () => {
    return (
      <div className="container-xl min-vh-100">
        <p className="text-white text-center pt-5 pb-5 text-center description">
          Trwa ładowanie strony...
        </p>
      </div>
    );
  };

  return (
    <div className="bg-custom">
      <Menu />
      <div className="container-xl min-vh-100" style={{ minWidth: "100%" }}>
        <ObjectDetails
          onClose={() => {
            setObjectDetails(undefined);
          }}
          onRemove={() => {}}
          apiKey={apiKey}
          objectDetails={objectDetails}
        />
        <div className="row">
          <div className="col">
            <p className="text-center text-white bagel h5 pt-4">
              YOUR FAVORITE LIST
            </p>
            <p className="text-center text-white description">
              Below you will find a list of your favorite movies.
            </p>
            <RemoveFavoriteListButton />
          </div>
        </div>
        {isReady ? renderComponent() : loadingScreen()}
      </div>
      <Footer />
    </div>
  );
}

export default Favorite;
