import React, { useEffect, useState } from "react";
import nullPoster from "../resources/images/null.jpg";

function ObjectDetails(props) {
  let objectId = props.objectDetails;
  const apiKey = props.apiKey;
  const onClose = props.onClose;
  const [isActive, setIsActive] = useState(false);
  const [requestData, setRequestData] = useState();

  const [movieId, setMovieId] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [releaseDate, setReleaseDate] = useState();
  const [language, setLanguage] = useState();
  const [poster, setPoster] = useState();
  const [rating, setRating] = useState();
  const [runtime, setRuntime] = useState();
  const [budget, setBudget] = useState();

  useEffect(() => {
    if (objectId !== undefined) {
      sendApiRequest();
    } else {
      setIsActive(false);
    }
  }, [objectId]);

  const sendApiRequest = () => {
    let apiCustomLink =
      "https://api.themoviedb.org/3/movie/" + objectId + "?language=en-US";

    fetch(apiCustomLink, apiKey)
      .then((response) => response.json())
      .then((response) => setRequestData(response))
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    if (requestData !== undefined) {
      setIsActive(true);
      setMovieId(requestData.id);
      setTitle(requestData.title);
      setDescription(requestData.overview);
      setReleaseDate(requestData.release_date);
      setLanguage(requestData.original_language);
      if (requestData.poster_path != null) {
        setPoster(
          "https://image.tmdb.org/t/p/w300_and_h450_bestv2" +
            requestData.poster_path
        );
      } else {
        setPoster(nullPoster);
      }
      setRating(requestData.vote_average.toFixed(1));
      if (requestData.runtime === 0) {
        setRuntime("Unknown");
      } else {
        setRuntime(requestData.runtime + " minutes");
      }
      setBudget(requestData.budget.toLocaleString());
    }
  }, [requestData]);

  const chooseColorByRating = () => {
    if (rating < 3) {
      return "text-danger";
    } else if (rating > 7) {
      return "text-success";
    } else {
      return "text-warning";
    }
  };

  const checkBudget = () => {
    return budget == 0 ? "Unknown" : budget;
  };

  const renderCloseButton = () => {
    return (
      <div className="row">
        <div className="col"></div>
        <div className="col-auto ml-auto">
          <div onClick={onClose} className="pointer">
            <span className="material-symbols-outlined text-white">cancel</span>
          </div>
        </div>
      </div>
    );
  };

  const removeMovieFromFavorite = (array, id) => {
    const index = array.indexOf(id);
    if (index > -1) {
      array.splice(index, 1);
    }
    return array;
  }

  const removeThisMovieFromFavoriteList = () => {
    const storage = JSON.parse(localStorage.getItem("favorite"));
    const updateStorage = removeMovieFromFavorite(storage, objectId);

    localStorage.removeItem("favorite");
    localStorage.setItem(
      "favorite",
      JSON.stringify(updateStorage)
    );
    alert(title + "has been removed from favorite list.");
  }

  const addMovieToFavoriteList = () => {
    const storedFavorites = JSON.parse(
      localStorage.getItem("favorite")
    );
    let newFavoriteArray = [];
    let generateStorage = [];

    if (storedFavorites === null) {
      generateStorage.push(objectId);
      localStorage.setItem(
        "favorite",
        JSON.stringify(generateStorage)
      );
      alert(title + " has been added to your favorite list.");
    } else {
      if (storedFavorites.includes(objectId)) {
        alert(title + " is allready in your favorite list.");
      } else {
        newFavoriteArray = storedFavorites;
        newFavoriteArray.push(objectId);
        localStorage.setItem(
          "favorite",
          JSON.stringify(newFavoriteArray)
        );
        alert(title + " has been added to your favorite list.");
      }
    }
  }

  const renderComponent = () => {
    return (
      <div className="container pt-3 pb-5 object-details-container">
        {renderCloseButton()}
        <div className="row pt-3">
          <div className="col-5">
            <img className="objectDetailsImg rounded" src={poster} />
            <button
              onClick={() => {
                addMovieToFavoriteList();
              }}
              type="button"
              className="btn btn-success w-100 mt-5"
            >
              ADD TO FAVORITE
            </button>
            <button
              onClick={() => {
                removeThisMovieFromFavoriteList();
              }}
              type="button"
              className="btn btn-danger w-100 mt-5"
            >
              Remove favorite
            </button>
          </div>
          <div className="col-5">
            <p className="text-white roboto pt-3">{title}</p>
            <p className="text-white roboto description pt-2">{description}</p>
            <p className="text-white roboto description">
              Release date: {releaseDate}
            </p>
            <p className="text-white roboto description">
              Language: {language}
            </p>
            <p className="text-white roboto description">Runtime: {runtime}</p>
            <p className="text-white roboto description">
              <span className="text-warning">Budget: {checkBudget()} $</span>
            </p>
          </div>
          <div className="col-2 text-center">
            <p className="text-white">
              <span className={chooseColorByRating()}>{rating}</span> / 10{" "}
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={isActive ? "overlay" : "none"}>{renderComponent()}</div>
  );
}

export default ObjectDetails;
