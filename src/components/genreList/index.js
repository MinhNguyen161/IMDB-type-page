import React from "react";
import { Button } from "react-bootstrap";
const GenreList = (props) => {
  console.log("GenreList", props.list);
  return (
    <div className="container-fluid genreList row">
      {props.list.map((item) => (
        <div className="col-xs ">
          <Button
            className="genreCard"
            onClick={(event) => {
              event.preventDefault();
              props.searchByGenre(item.id);
            }}
            type="button"
          >
            {item.name}
          </Button>
        </div>
      ))}
    </div>
  );
};

export default GenreList;
