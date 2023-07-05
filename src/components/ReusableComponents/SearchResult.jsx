import React from "react";
import nullPoster from "../../resources/images/null.jpg";

function SearchResult(props) {
  let img = props.img;
  let title = props.title;

  let onClick = props.onClick;

  if (props.img === null) {
    img = nullPoster;
  } else {
    img = "https://image.tmdb.org/t/p/w300_and_h450_bestv2" + props.img;
  }

  if (title.length > 28) {
    title = title.slice(0, 28) + "...";
  }

  return (
    <div onClick={onClick} className="row my-row">
      <div className="col-sm-3 pc-serach">
        <img className="w-100" src={img} />
      </div>
      <div className="col-sm-9 pc-serach">
        <p className="text-white oswald description pt-4">{title}</p>
      </div>
      <div className="col-sm-3 mobile-serach text-center">
        <span>
          <img className="w-100 mobile-img-result" src={img} />
          <p className="text-white oswald description pb-1 pt-1">{title}</p>
        </span>
      </div>
    </div>
  );
}

export default SearchResult;
