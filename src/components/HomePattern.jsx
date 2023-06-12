import React, { useState } from "react";

function HomePattern(props) {

  const [isActive, setIsActive] = useState(true);

  let title = props.title;
  let shortTitle = title;
  let overview = props.overview;
  let release = props.release;
  const monthNames = {
    "01": "January",
    "02": "February",
    "03": "March",
    "04": "April",
    "05": "May",
    "06": "June",
    "07": "July",
    "08": "August",
    "09": "September",
    "10": "October",
    "11": "November",
    "12": "December"
  };

  if (title.length > 22) {
    shortTitle = title.slice(0, 20) + "...";
  }

  if (overview.length > 130) {
    overview = overview.slice(0, 130) + "...";
  }

  const convertDate = () => {
    const date = release.split("-");
    const year = date[0];
    let month = date[1];
    let day = date[2];

    if (monthNames.hasOwnProperty(month)) {
      month = monthNames[month];
    }

    if (day < 10) {
      day = day.toString().slice(1);
    }

    return day + " " + month + " " + year;
  };

  return (
    <div
      onMouseEnter={() => {
        setIsActive(false);
      }}
      onMouseLeave={() => {
        setIsActive(true);
      }}
      className="col-md-3 pt-2 movie-pattern position-relative"
    >
      <div className="position-relative">
        <img
          className={
            isActive
              ? "rounded mx-auto d-block max shadow-sm"
              : "rounded mx-auto d-block max shadow-sm opacity"
          }
          src={"https://image.tmdb.org/t/p/w300_and_h450_bestv2" + props.img}
        />
        <p className="text-center text-white castoro title mb-0 pt-3">
          {shortTitle}
        </p>
        <p className="text-center text-white title description">{convertDate()}</p>
        <figcaption>
          <div className={isActive ? "none" : ""}>
            <p className="text-center text-white castoro title">{title}</p>
            <p className="text-center text-white description">{overview}</p>
          </div>
        </figcaption>
      </div>
    </div>
  );
}

export default HomePattern;
