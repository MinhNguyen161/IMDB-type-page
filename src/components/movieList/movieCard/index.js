import { Card, Button, Badge } from "react-bootstrap";
import Moment from "react-moment";

import React from "react";

const MovieCard = (props) => {
  //Extremely important because sometimes getting the Genre takes longer to load so
  // if the genre list is not ready yet, it will say loading
  if (props.genreList == null || props.genreList.length < 1) {
    return <div>Loading</div>;
  }
  return (
    <div>
      <Card className="movieCard">
        <div className="img-div">
          <div className="hidden-text">{props.movie.overview}</div>
          <Card.Img
            variant="top"
            src={`https://image.tmdb.org/t/p/w1280${props.movie.poster_path}`}
          />
        </div>
        <Card.Body className="card-body">
          <Card.Title> {props.movie.title} </Card.Title>
          <Card.Text>
            {" "}
            {props.movie.genre_ids.map((id) => {
              return (
                <Badge className="genreBadge" variant="danger">
                  {" "}
                  {props.genreList.find((item) => item.id == id).name}
                </Badge>
              );
            })}{" "}
          </Card.Text>
          <Card.Text>
            <p>
              Release Time:{props.movie.release_date}
              <div>
                <Moment className="time" fromNow>
                  {props.movie.release_date}
                </Moment>{" "}
              </div>
            </p>

            <p>Rating: {props.movie.vote_average}*</p>
          </Card.Text>
          <Button className="btn-trailer" variant="primary">
            Watch Trailer
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default MovieCard;
