import React, { useState } from "react";
import AlertMessage from "./AlertMessage";

function RemoveFavoriteListButton() {
  const [isActive, setIsActive] = useState(true);
  const [alertMessage, setAlertMessage] = useState(undefined);
  const [alertColor, setAlertColor] = useState("bg-danger");

  const removeLocalStorage = () => {
    const updateStorage = [];
    localStorage.removeItem("favorite");
    localStorage.setItem("favorite", JSON.stringify(updateStorage));
    setAlertMessage("Favorite list has been cleaned.");
    setIsActive(true);
  };

  const handleThisButton = () => {
    setIsActive(false);
  };

  return (
    <div>
      <AlertMessage
        AlertMessage={alertMessage}
        alert={() => setAlertMessage(undefined)}
        alertColor={alertColor}
      />
      <div className="text-center pb-4">
        <button
          className={isActive ? "btn btn-outline-light" : "none"}
          onClick={handleThisButton}
        >
          <span className="bagel">REMOVE FAVORITE</span>
        </button>
        <p className={isActive ? "none" : "bagel text-danger"}>
          Are you sure you want to remove your favorite list?
        </p>
        <p className={isActive ? "none" : "description text-danger"}>
          The changes will be irreversible!
        </p>
        <button
          className={isActive ? "none" : "btn btn-outline-danger"}
          onClick={removeLocalStorage}
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
    </div>
  );
}

export default RemoveFavoriteListButton;
