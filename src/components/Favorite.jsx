import React, { useState, useEffect } from "react";
import MovieLoopPattern from "./MovieLoopPattern";

function Favorite(props) {
  let active = props.isActive;
  const apiKey = props.apiKey;
  const [isFavoriteEmpty, setIsFavoriteEmpty] = useState(false);
  //const [objectDetails, setObjectDetails] = useState(undefined);
  const storedFavorites = JSON.parse(localStorage.getItem("favorite"));
  let data;

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

  const tryToRenderComponent = async () => {
    if (active != false) {
      try {
        for (const id of storedFavorites) {
          const data = await downloadDataFromApi(id);
          console.log(data);
        }
      } catch (error) {
        console.error(error);
        renderEmptyComponent();
      }
    }
  };

  useEffect(() => {
    tryToRenderComponent();
  }, [active])

  const renderEmptyComponent = () => {
    return (
      <div className="container-xl min-vh-100">
        <p className="text-white text-center pt-5 pb-5 text-center description">
          - THE FAVORITE LIST IS EMPTY -
        </p>
      </div>
    );
  };

  useEffect(() => {
    if (storedFavorites != null) {
      setIsFavoriteEmpty(false);
    } else {
      setIsFavoriteEmpty(true);
    }
  }, [storedFavorites]);

  return (
    <div className={active ? "container-xl" : "none"}>
      <div className="row">
        <div className="col">
          <p className="text-center text-white bagel h5 pt-4">
            YOUR FAVORITE LIST
          </p>
          <p className="text-center text-white description pb-4">
            Below you will find a list of your favorite movies.
          </p>
          {isFavoriteEmpty ? renderEmptyComponent() : renderEmptyComponent()}
        </div>
      </div>
    </div>
  );
}

export default Favorite;
