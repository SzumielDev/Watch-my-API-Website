import React from "react";
import nullPoster from "../resources/images/null.jpg";

function SearchList(props) {
  let img = props.img;
  let title = props.title;
  if (props.img === null) {
    img = nullPoster;
  } else {
    img = "https://image.tmdb.org/t/p/w300_and_h450_bestv2" + props.img;
  }

  if (title.length > 28) {
    title = title.slice(0, 28) + "...";
  }

  return (
    <div className="row my-row">
      <div className="col-sm-3">
        <img
          className="w-100"
          src={img}
        />
      </div>
      <div className="col-sm-9">
        <p className="text-white oswald description pt-4">
          {title}
        </p>
      </div>
    </div>
  );
}

export default SearchList;
