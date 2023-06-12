import React, { useEffect, useState } from "react";
import SearchList from "./SearchList";

function SearchInput(props) {
  const [inputValue, setInputValue] = useState();
  const [requestData, setRequestData] = useState();
  const [isActive, setIsActive] = useState(false);
  const [searchResults, setSearchResults] = useState();
  const apiKey = props.apiKey;

  const handleChange = (e) => {
    setInputValue(e.target.value || undefined);
  };

  const handleInputBlur = () => {
    setInputValue(null);
  }

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
  }, [requestData])

  const renderSearchList = () => {
      const searchComponentArray = requestData.results.slice(0, 3).map((movie, index) => (
        <SearchList key={index} title={movie.title} img={movie.poster_path} />
      ));
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
          onBlur={handleInputBlur}
        />
      </form>
      <div className={isActive ? "position-absolute w-100 search-list-custom" : "none"}>
        {searchResults} 
      </div>
    </div>
  );
}

export default SearchInput;
