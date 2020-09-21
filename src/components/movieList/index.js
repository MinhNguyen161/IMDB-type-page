import React from "react";
import MovieCard from "./movieCard";
const MovieList = (props) => {
  console.log("lists", props.list);
  return (
    <div className="movieList">
      {props.list.map((item) => (
        <div>
          <MovieCard movie={item} genreList={props.genreList} />
        </div>
      ))}
    </div>
  );
};

export default MovieList;
