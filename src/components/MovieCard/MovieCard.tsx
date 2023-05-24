import { Card } from "react-bootstrap";
import { IMovie } from "../../interfaces/movie.interface";
import "./MovieCard.scss";
import image from "./../../assets/movie-avatar.jpg";
import { useState } from "react";

type MovieCardProps = {
    movie: IMovie,
    className: string
}
const MovieCard = ({ movie, className = "" }: MovieCardProps) => {

    // calculate minutes in hours and minutes
    function hoursAndMinutes(totalMinutes: number) {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;

        return { hours, minutes };
    }

    const [duration] = useState(hoursAndMinutes(movie.runtimeInMinutes))

    return (
        <Card className={`movie-card ${className}`}>
            <Card.Img variant="top" src={image} />
            <Card.Body>
                <Card.Title className="movie-name">{movie.name}</Card.Title>
                <Card.Text className="movie-minutes">{duration.hours}hrs {duration.minutes}mins</Card.Text>
            </Card.Body>
        </Card>
    );
}

export default MovieCard;