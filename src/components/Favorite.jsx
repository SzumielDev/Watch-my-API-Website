import React, { useState, useEffect } from "react";
import MovieLoopPattern from "./MovieLoopPattern";
import ObjectDetails from "./ObjectDetails";

function Favorite(props) {
  let active = props.isActive;
  const apiKey = props.apiKey;
  const [objectDetails, setObjectDetails] = useState(undefined);
  const [storedFavorites, setStoredFavorites] = useState();
  const [favoriteDataArray, setFavoriteDataArray] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("favorite"));
    if (data) {
      setStoredFavorites(data);
    }
  }, [active])

  useEffect(() => {
    tryToRenderComponent();
    if (active === false) {
      setFavoriteDataArray([]);
    }
  }, [active]);

  const tryToRenderComponent = async () => {
    if (active != false) {
      if (storedFavorites != undefined) {
        try {
          for (const id of storedFavorites) {
            const data = await downloadDataFromApi(id);
            pushNewDataToArray(data);
          }
        } catch (error) {
          console.error(error);
        }
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

  const pushNewDataToArray = (data) => {
    const idToFind = data.id;
    const findId = favoriteDataArray.findIndex((obj) => obj.id === idToFind);
    if (findId === -1) {
      setFavoriteDataArray((current) => [...current, data]);
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

  return (
    <div
      className={active ? "container-xl min-vh-100" : "none"}
      style={{ minWidth: "100%" }}
    >
      <ObjectDetails
        onClose={() => {
          setObjectDetails(undefined);
        }}
        onRemove={() => {
          
        }}
        apiKey={apiKey}
        objectDetails={objectDetails}
      />
      <div className="row">
        <div className="col">
          <p className="text-center text-white bagel h5 pt-4">
            YOUR FAVORITE LIST
          </p>
          <p className="text-center text-white description pb-4">
            Below you will find a list of your favorite movies.
          </p>
        </div>
      </div>
      {renderComponent()}
    </div>
  );
}

export default Favorite;
