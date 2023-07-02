import React, { useState } from "react";

function RemoveFavoriteListButton() {
  const [isActive, setIsActive] = useState(true);

  const handleThisButton = () => {
    setIsActive(false);
  }

  const remove = () => {
    const favorite = JSON.parse(localStorage.getItem("favorite"));
    if (favorite != undefined) {
      localStorage.removeItem('favorite');
      setIsActive(true);
      alert("Favorite list has been cleaned.")
    }else {
      alert("Your favorite list is allready empty!")
    }
  }

  return (
    <div className="text-center pb-4">

      <button
        className={isActive ? "btn btn-outline-light" : "none"}
        onClick={handleThisButton}
      >
        <span className="bagel">REMOVE FAVORITE</span>
      </button>
      <p className={isActive ? "none" :  "bagel text-danger"}>Are you sure you want to remove your favorite list?</p>
      <p className={isActive ? "none" : "description text-danger"}>The changes will be irreversible!</p>
      <button
        className={isActive ? "none" : "btn btn-outline-danger"}
        onClick={remove}
      >
        <span className="bagel">YES</span>
      </button>

      <button
        className={isActive ? "none" : "btn btn-outline-success"}
        onClick={() => setIsActive(true)}
      >
        <span className="bagel">NO</span>
      </button>

    </div>
  );
}

export default RemoveFavoriteListButton;
