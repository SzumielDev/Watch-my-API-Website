import React, { useEffect, useState } from "react";
import SearchResult from "./SearchResult";
import ObjectDetails from "./ObjectDetails";

function SearchInput(props) {
  const apiKey = props.apiKey;
  const [inputValue, setInputValue] = useState();
  const [requestData, setRequestData] = useState();
  const [isActive, setIsActive] = useState(false);
  const [searchResults, setSearchResults] = useState();
  const [objectDetails, setObjectDetails] = useState(undefined);

  const handleChange = (e) => {
    setInputValue(e.target.value || undefined);
  };

  useEffect(() => {
    handleIsInputEmpty();
  }, [inputValue]);

  const handleIsInputEmpty = () => {
    if (inputValue != undefined) {
      sendApiRequest();
    } else {
      setIsActive(false);
      setRequestData(inputValue || undefined);
    }
  };

  const sendApiRequest = () => {
    let apiCustomLink =
      "https://api.themoviedb.org/3/search/movie?query=" +
      inputValue +
      "&include_adult=false&language=en-US&page=1";

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
      renderSearchList();
    } else {
      setSearchResults(null);
    }
  }, [requestData]);

  const renderSearchList = () => {
    const searchComponentArray = requestData.results
      .slice(0, 3)
      .map((movie, index) => {
        return (
          <div key={index}>
            <SearchResult
              onClick={() => {
                setObjectDetails(movie.id);
              }}
              title={movie.title}
              img={movie.poster_path}
            />
          </div>
        );
      });
    setSearchResults(searchComponentArray);
  };

  return (
    <div className="position-relative">
      <form className="form-inline">
        <input
          className="form-control mr-sm-2"
          type="search"
          placeholder="Search movie"
          aria-label="Search"
          onChange={handleChange}
        />
      </form>
      <div
        className={
          isActive ? "position-absolute w-100 search-list-custom" : "none"
        }
      >
        {searchResults}
      </div>
      <ObjectDetails
        onClose={() => {
          setObjectDetails(undefined);
        }}
        apiKey={apiKey}
        objectDetails={objectDetails}
      />
    </div>
  );
}

export default SearchInput;
