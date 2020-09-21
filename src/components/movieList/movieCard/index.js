import React, { useState } from "react";
import { Card, Button, Badge, Modal } from "react-bootstrap";
import Moment from "react-moment";
import YouTube from "@u-wave/react-youtube";

const MovieCard = (props) => {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	// let url = `https://api.themoviedb.org/3/movie/{movie_id}/videos?api_key=<<api_key>>&language=en-US`
	// const movieIdLink =

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
					<>
						<Button
							variant="primary"
							className="btn-trailer"
							onClick={() => {
								props.getTrailer(props.movie.id);
								handleShow();
							}}
						>
							Watch Trailer
						</Button>

						<Modal show={show} onHide={handleClose} animation={false}>
							<Modal.Header closeButton>
								<Modal.Title>Modal heading</Modal.Title>
							</Modal.Header>
							<Modal.Body>
								<YouTube video={props.trailerKey} autoplay />
								Woohoo, you're reading this text in a modal!
							</Modal.Body>
							<Modal.Footer>
								<Button variant="secondary" onClick={handleClose}>
									Close
								</Button>
								<Button variant="primary" onClick={handleClose}>
									Save Changes
								</Button>
							</Modal.Footer>
						</Modal>
					</>
				</Card.Body>
			</Card>
		</div>
	);
};

export default MovieCard;
